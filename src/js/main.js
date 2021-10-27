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
      const allSec = difference / 1000;

      const allDays = allSec / 86400;
      const days = Math.floor(allDays);

      const allHours = (allDays - days) * 24;
      const hours = Math.floor(allHours);

      const allMinuts = (allHours - hours) * 60;
      const minutes = Math.floor(allMinuts);

      const allSeconds = (allMinuts - minutes) * 60;
      const seconds = Math.floor(allSeconds);

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
         return `${num}0`;
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

});