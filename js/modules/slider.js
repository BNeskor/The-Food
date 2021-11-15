function slider(){
   const prevBtn = document.querySelector('.offer__slider-prev'),
   slider = document.querySelector('.offer__slider'),
   nextBtn = document.querySelector('.offer__slider-next'),
   slides = document.querySelectorAll('.offer__slide'),
   current = document.querySelector('#current'),
   total = document.querySelector('#total'),
   slidesWreaper = document.querySelector('.offer__slider-wrapper'),
   slidesField = document.querySelector('.offer__slide-inner'),
   width = window.getComputedStyle(slidesWreaper).width,
   deletePX = number => +number.replace(/px/g,"");
let slideIndex = 1;
let offset = 0;

current.textContent = getZiro(slideIndex);
total.innerHTML = getZiro(slides.length);


   slidesField.style.width = 100 * slides.length + "%";
   slidesField.style.display  = "flex";
   slidesField.style.transition = "0.5s all";
   slidesWreaper.style.overflow = "hidden";

   slides.forEach(slide =>{
      slide.style.width = deletePX(width);
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
      if(offset === deletePX(width) * (slides.length - 1)){
         offset = 0;
      }else{
         offset += deletePX(width);
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
         offset = (deletePX(width) * (slides.length - 1));
      }else{
         offset -= deletePX(width);
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
            offset = (deletePX(width) * (slideTo - 1));
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
   function getZiro(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }
}
module.exports = slider;