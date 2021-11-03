window.addEventListener('DOMContentLoaded', () => {
   //TABS
   const parent = document.querySelector('.tabheader__items'),
      tabs = document.querySelectorAll('.tabheader__item'),
      items = document.querySelectorAll('.tabcontent');

   function hide() {
      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
      items.forEach(item => {
         item.classList.remove('tabcontent-active');
      });
   }
   function show(i = 0) {
      tabs[i].classList.add('tabheader__item_active');
      items[i].classList.add('tabcontent-active');
   }

   parent.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList.contains("tabheader__item")) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hide();
               show(i);
            }
         });
      }
   });
   //TABS END



   //TIMER
   const deadLine = "2021-11-12, 00:00:00";
   setClock('.timer', deadLine);

   function getTimeremaning(toEnd) {
      let difference = Date.parse(toEnd) - Date.parse(new Date());
      const days = Math.floor((difference / (1000 * 60 * 60 * 24))),
         hours = Math.floor((difference / (1000 * 60 * 60) % 24)),
         minutes = Math.floor((difference / 1000 / 60) % 60),
         seconds = Math.floor((difference / 1000) % 60);

      return {
         'total': difference,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   function getZiro(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector),
         days = timer.querySelector('#days'),
         hours = timer.querySelector('#hours'),
         minutes = timer.querySelector('#minutes'),
         seconds = timer.querySelector('#seconds'),
         deadLineInterval = setInterval(updateClock, 1000);
      updateClock();
      function updateClock() {
         const t = getTimeremaning(endtime);
         days.innerHTML = getZiro(t.days);
         hours.innerHTML = getZiro(t.hours);
         minutes.innerHTML = getZiro(t.minutes);
         seconds.innerHTML = getZiro(t.seconds);
         if (t.total <= 0) {
            clearInterval(deadLineInterval);
            days.innerHTML = '00';
            hours.innerHTML = "00";
            minutes.innerHTML = '00';
            seconds.innerHTML = "00";
         }
      }

   }
   //TIMER END




   //MODAL
   const modalTriggers = document.querySelectorAll('[data-modal]'),
      modal = document.querySelector('.modal'),
      modalTimeout = setTimeout(showModal, 50000);

   modalTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
         showModal();
      });

   });
   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal__close')) {
         hideModal();
      }
   });
   document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) {
         showModal();
      }
   });
   document.addEventListener('scroll', showModalByscroll);

   function showModal(){
      modal.classList.remove('hide');
      modal.classList.add('show');
      document.body.classList.add("scroll");//bocumnet overflow - hidden  or scroll
      clearTimeout(modalTimeout);
      document.removeEventListener('scroll', showModalByscroll);
   }
   function hideModal(){
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.classList.remove("scroll");//bocumnet overflow - hidden  or scroll
   }

   function showModalByscroll() {
      if (document.body.offsetHeight < window.scrollY + document.documentElement.clientHeight + 100) {
         console.log('tets');
         showModal();
      }
   }
   //MODAL END


   //MENU
   class MenuCart {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.transfer = 27;
         this.parent = document.querySelector(parentSelector);
         this.changeToUAH();
      }

      changeToUAH() {
         this.price = this.price * this.transfer;
      }
      render() {
         const element = document.createElement('div');
         if(this.classes.length === 0){
            this.classes = 'menu__item';
            element.classList.add(this.classes);
         }else{
            this.classes.forEach(className => element.classList.add('menu__item',className,));
         }
         element.innerHTML = `
             <img src=${this.src} alt=${this.alt}>
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
               </div>
            `;
         this.parent.append(element);
      }
   }


   new MenuCart(
      "img/tabs/elite.jpg",
      "elite",
      'Меню “Премиум”',
      'В меню “Премиум” мы используем не только красивый дизайн упаковки,\
      но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!',
      12,
      ".menu .container",
      'white'
   
   ).render();
   new MenuCart(
      "img/tabs/vegy.jpg",
      "vegy",
      'Меню "Фитнес"',
      'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих\
      овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной\
      ценой и высоким качеством!',
      5,
      ".menu .container",
      'red'
   
   ).render();
   new MenuCart(
      "img/tabs/post.jpg",
      "post",
      'Меню "Постное"',
      'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие\
      продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное\
      количество белков за счет тофу и импортных вегетарианских стейков. ',
      9,
      ".menu .container",
      "big"
   
   ).render();
   //MENU END

   //FORMS

   const forms = document.querySelectorAll('form');

   const message = {
      loading: 'btn-status',
      success: 'Спасибо, мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
   };

   forms.forEach(item =>{
      postData(item);
   });
   
   function postData(form){
      form.addEventListener('submit',(e)=>{
         e.preventDefault();
         const btn = form.querySelector('button');
         btn.classList.add(message.loading);

         const request = new XMLHttpRequest();
         request.open('POST',"server.php");
         request.setRequestHeader('Content-type','aplication/json');
         

         const formData = new FormData(form);
         const obj = {};
         formData.forEach(function(value,key){
            obj[key] = value;
         });
         const json= JSON.stringify(obj);

         request.send(json);


         request.addEventListener('load', () =>{
            if(request.status === 200) {
               showThanksMOdal(message.success);
               form.reset();
               btn.classList.remove(message.loading);
            }else{
               showThanksMOdal(message.failure);
               form.reset();
            }
         });
         
      });
   }
   //FORMS

   //MODAL_NOTIFYCATION
   function showThanksMOdal(message){
      const previousModalDialog = document.querySelector('.modal__dialog');

      previousModalDialog.classList.add('hide');
      showModal();

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
      <div class="modal__content">
             <div class="modal__close" data-clothe>×</div>
             <div class="modal__title">${message}</div>
       </div>
      `;
      document.querySelector('.modal').append(thanksModal);
      setTimeout(()=>{
         thanksModal.remove();
         previousModalDialog.classList.add('show');
         previousModalDialog.classList.remove('hide');
         hideModal();
      },2000);
   }

   //MODAL_NOTIFYCATION
});