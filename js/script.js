import tabs from './modules/tabs';
import modal from './modules/modal';
import timer from './modules/timer';
import cards from './modules/cards';
import calc from './modules/calc';
import forms from './modules/forms';
import slider from './modules/slider';
import {showModal} from './modules/modal';
window.addEventListener('DOMContentLoaded', () => {
     const modalTimeout = setTimeout( ()=> showModal('.modal', modalTimeout), 50000);
      tabs('.tabheader__item','.tabcontent','.tabheader__items','tabheader__item_active','tabcontent-active');
      modal('[data-modal]','.modal', modalTimeout);
      timer('.timer', '2022-01-01');
      cards();
      calc();
      forms('form',modalTimeout);
      slider({
            container: '.offer__slider',
            nextArrow: '.offer__slider-next',
            prevArrow: '.offer__slider-prev',
            slide: '.offer__slide',
            totlalCounr: '#total',
            field: '.offer__slide-inner',
            wraper: '.offer__slider-wrapper',
            curentCounter: '#current'

      });
});

