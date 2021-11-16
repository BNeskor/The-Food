function timer(id, deadLine){
   setClock(id, deadLine);

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
}

export default timer;