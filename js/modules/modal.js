function modal() {
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
}
module.exports = modal;