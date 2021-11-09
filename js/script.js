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

   function showModal() {
      modal.classList.remove('hide');
      modal.classList.add('show');
      document.body.classList.add("scroll");//bocumnet overflow - hidden  or scroll
      clearTimeout(modalTimeout);
      document.removeEventListener('scroll', showModalByscroll);
   }
   function hideModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      document.body.classList.remove("scroll");//bocumnet overflow - hidden  or scroll
   }

   function showModalByscroll() {
      if (document.body.offsetHeight < window.scrollY + document.documentElement.clientHeight + 100) {
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
         if (this.classes.length === 0) {
            this.classes = 'menu__item';
            element.classList.add(this.classes);
         } else {
            this.classes.forEach(className => element.classList.add('menu__item', className,));
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

   const getResourses = async(url) =>{
      const res = await fetch(url);
      if(!res.ok){
         throw new Error(`could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
   };

   getResourses('http://localhost:3000/menu')
   .then(data =>{
      data.forEach(({img,altimg,title,descr,price}) =>{
         new MenuCart(img,altimg,title,descr,price,'.menu .container').render();
      });
   });
   //MENU END


   //FORMS

   const forms = document.querySelectorAll('form');

   const message = {
      loading: 'btn-status',
      success: 'Спасибо, мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
   };

   forms.forEach(item => {
      bindPostData(item);
   });

   const postData = async(url, data) =>{
      const res = await fetch(url,{
         method: "POST",
         headers: {
            'Content-Type':"application/json"
         },
         body: JSON.stringify(data)
      });
      return await res.json();
   };

   function bindPostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();
         const btn = form.querySelector('button');
         btn.classList.add(message.loading);


         const formData =  new FormData(form);
         const json = Object.fromEntries(formData.entries());

         
         postData('http://localhost:3000/requests', json)

         .then((data) =>{
               console.log(data);
               showThanksMOdal(message.success);
               btn.classList.remove(message.loading);
         }).catch((data)=>{
            console.log(data);
            showThanksMOdal(message.failure);
         }).finally(()=>{
            form.reset();
         });
      });
   }
   //FORMS

   //MODAL_NOTIFYCATION
   function showThanksMOdal(message) {
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
      setTimeout(() => {
         thanksModal.remove();
         previousModalDialog.classList.add('show');
         previousModalDialog.classList.remove('hide');
         hideModal();
      }, 2000);
   }
   //MODAL_NOTIFYCATION


   //SLIDER
   const prevBtn = document.querySelector('.offer__slider-prev'),
         slider = document.querySelector('.offer__slider'),
         nextBtn = document.querySelector('.offer__slider-next'),
         slides = document.querySelectorAll('.offer__slide'),
         current = document.querySelector('#current'),
         total = document.querySelector('#total'),
         slidesWreaper = document.querySelector('.offer__slider-wrapper'),
         slidesField = document.querySelector('.offer__slide-inner'),
         width = window.getComputedStyle(slidesWreaper).width;

   let slideIndex = 1;
   let offset = 0;

   current.textContent = getZiro(slideIndex);
   total.innerHTML = getZiro(slides.length);


         slidesField.style.width = 100 * slides.length + "%";
         slidesField.style.display  = "flex";
         slidesField.style.transition = "0.5s all";
         slidesWreaper.style.overflow = "hidden";

         slides.forEach(slide =>{
            slide.style.width = width.replace(/px/g,"");
         });

         slider.style.position = "relative";

         const indicators = document.createElement('ol');
         const dots = [];
         indicators.classList.add("carousel-indicators");
         slider.append(indicators);

         for (let i = 0; i < slides.length; i++){
            const dot = document.createElement('li');
            dot.setAttribute('data-slide-to',i+1);
            dot.classList.add('dot');
            indicators.append(dot);
            if (i == 0){
               dot.style.opacity = 1;
            }
            dots.push(dot);
         }

         nextBtn.addEventListener('click',()=>{
            if(offset === width.replace(/px/g,"") * (slides.length - 1)){
               offset = 0;
            }else{
               offset += +width.replace(/px/g,"");
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex === slides.length){
               slideIndex = 1;
            }else{
               slideIndex++;
            }
            current.textContent = getZiro(slideIndex);
            addOpacity(dots);
         });

         prevBtn.addEventListener('click',()=>{
            if(offset === 0){
               offset = (width.replace(/px/g,"") * (slides.length - 1));
            }else{
               offset -= width.replace(/px/g,"");
            }
            slidesField.style.transform = `translateX(-${offset}px)`;

            if(slideIndex === 1){
               slideIndex = slides.length;
            }else{
               slideIndex--;
            }
            current.textContent = getZiro(slideIndex);
            addOpacity(dots);
         });

         dots.forEach(dot =>{
            dot.addEventListener('click', (e)=>{
                  const slideTo = e.target.getAttribute('data-slide-to');
                  slideIndex = slideTo;
                  offset = (width.replace(/px/g,"") * (slideTo - 1));
                  slidesField.style.transform = `translateX(-${offset}px)`;
                  dots.forEach(dot => dot.style.opacity = '.5');
                  addOpacity(dots);
            });
         });
   
         function addOpacity(arr){
            arr.forEach(item =>{
               item.style.opacity = '.5';
            });
            arr[slideIndex -1].style.opacity = 1;
         }
});

