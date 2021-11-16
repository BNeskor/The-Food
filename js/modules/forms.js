import{showModal, hideModal} from './modal';
import{postData} from '../services/services';
function forms(formSelector,modalTimeout){
   const forms = document.querySelectorAll(formSelector);

   const message = {
      loading: 'btn-status',
      success: 'Спасибо, мы с вами свяжемся',
      failure: 'Что-то пошло не так...'
   };

   forms.forEach(item => {
      bindPostData(item);
   });



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
   function showThanksMOdal(message) {
      const previousModalDialog = document.querySelector('.modal__dialog');

      previousModalDialog.classList.add('hide');
      showModal('.modal',modalTimeout);

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
         hideModal('.modal');
      }, 2000);
   }
}
export default forms;