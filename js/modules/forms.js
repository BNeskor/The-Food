function forms(){
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
}
module.exports = forms;