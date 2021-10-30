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
      modalClotheBtn = document.querySelector('.modal__close'),
      modalTimeout = setTimeout(toggleModal, 30000);

   modalTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
         toggleModal();
      });

   });
   modalClotheBtn.addEventListener('click', toggleModal);
   modal.addEventListener('click', (e) => {
      if (e.target === modal) {
         toggleModal();
      }
   });
   document.addEventListener('keydown',(e)=>{
      if (e.code === "Escape" && modal.classList.contains('show')) {
         toggleModal();
      }
   });
   document.addEventListener('scroll', showModalByscroll);
   
   function toggleModal() {
      modal.classList.toggle('show');
      document.body.classList.toggle("scroll");//bocumnet overflow - hidden  or scroll
      clearTimeout(modalTimeout);
      document.removeEventListener('scroll',showModalByscroll);
   }

   function showModalByscroll(){
      if(document.body.offsetHeight == window.scrollY + document.documentElement.clientHeight ){
         toggleModal();
      }
   }
   //MODAL END

});