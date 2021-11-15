function tabs() {
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
}

module.exports = tabs;