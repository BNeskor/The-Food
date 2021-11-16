function tabs(tabsSelector, tabsContentSelector, tabsParentSelector,tabsActiveClass, itemsActiveClass) {
   const parent = document.querySelector(tabsParentSelector),
      tabs = document.querySelectorAll(tabsSelector),
      items = document.querySelectorAll(tabsContentSelector);

   function hide() {
      tabs.forEach(item => {
         item.classList.remove(tabsActiveClass);
      });
      items.forEach(item => {
         item.classList.remove(itemsActiveClass);
      });
   }
   function show(i = 0) {
      tabs[i].classList.add(tabsActiveClass);
      items[i].classList.add(itemsActiveClass);
   }

   parent.addEventListener('click', (e) => {
      const target = e.target;
      if (target && target.classList.contains(tabsSelector.slice(1))) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hide();
               show(i);
            }
         });
      }
   });
}

export default tabs;