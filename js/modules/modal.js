
function showModal(modalSelector, modalTimeout) {
   const modal = document.querySelector(modalSelector);
   modal.classList.remove('hide');
   modal.classList.add('show');
   document.body.classList.add("scroll");//documnet overflow - hidden  or scroll
   console.log(modalTimeout);
   if(modalTimeout){
      clearTimeout(modalTimeout);
   }
}
function hideModal(modalSelector) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('hide');
   modal.classList.remove('show');
   document.body.classList.remove("scroll");//documnet overflow - hidden  or scroll
}


function modal(trigerSelector, modalSelector, modalTimeout) {
   const modalTriggers = document.querySelectorAll(trigerSelector),
      modal = document.querySelector(modalSelector);

   modalTriggers.forEach(btn => {
      btn.addEventListener('click', () => {
         showModal(modalSelector,modalTimeout);
      });

   });
   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.classList.contains('modal__close')) {
         hideModal(modalSelector);
      }
   });
   document.addEventListener('keydown', (e) => {
      if (e.code === "Escape" && modal.classList.contains('show')) {
         showModal(modalSelector, modalTimeout);
      }
   });

   document.addEventListener('scroll',showModalByscroll);
   function showModalByscroll(){
      if (document.body.offsetHeight < window.scrollY + document.documentElement.clientHeight + 100) {
          showModal(modalSelector, modalTimeout);
          document.removeEventListener('scroll',showModalByscroll);
      }
     
   }
}
export default modal;
export{showModal};
export{hideModal};