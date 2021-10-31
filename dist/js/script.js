/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, { enumerable: true, get: getter });
/******/ 		}
/******/ 	};
/******/
/******/ 	// define __esModule on exports
/******/ 	__webpack_require__.r = function(exports) {
/******/ 		if(typeof Symbol !== 'undefined' && Symbol.toStringTag) {
/******/ 			Object.defineProperty(exports, Symbol.toStringTag, { value: 'Module' });
/******/ 		}
/******/ 		Object.defineProperty(exports, '__esModule', { value: true });
/******/ 	};
/******/
/******/ 	// create a fake namespace object
/******/ 	// mode & 1: value is a module id, require it
/******/ 	// mode & 2: merge all properties of value into the ns
/******/ 	// mode & 4: return value when already ns object
/******/ 	// mode & 8|1: behave like require
/******/ 	__webpack_require__.t = function(value, mode) {
/******/ 		if(mode & 1) value = __webpack_require__(value);
/******/ 		if(mode & 8) return value;
/******/ 		if((mode & 4) && typeof value === 'object' && value && value.__esModule) return value;
/******/ 		var ns = Object.create(null);
/******/ 		__webpack_require__.r(ns);
/******/ 		Object.defineProperty(ns, 'default', { enumerable: true, value: value });
/******/ 		if(mode & 2 && typeof value != 'string') for(var key in value) __webpack_require__.d(ns, key, function(key) { return value[key]; }.bind(null, key));
/******/ 		return ns;
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = "./src/js/main.js");
/******/ })
/************************************************************************/
/******/ ({

/***/ "./src/js/main.js":
/*!************************!*\
  !*** ./src/js/main.js ***!
  \************************/
/*! no static exports found */
/***/ (function(module, exports) {

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

  parent.addEventListener('click', e => {
    const target = e.target;

    if (target && target.classList.contains("tabheader__item")) {
      tabs.forEach((item, i) => {
        if (target == item) {
          hide();
          show(i);
        }
      });
    }
  }); //TABS END
  //TIMER

  const deadLine = "2021-11-12, 00:00:00";
  setClock('.timer', deadLine);

  function getTimeremaning(toEnd) {
    let difference = Date.parse(toEnd) - Date.parse(new Date());
    const days = Math.floor(difference / (1000 * 60 * 60 * 24)),
          hours = Math.floor(difference / (1000 * 60 * 60) % 24),
          minutes = Math.floor(difference / 1000 / 60 % 60),
          seconds = Math.floor(difference / 1000 % 60);
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
  } //TIMER END
  //MODAL


  const modalTriggers = document.querySelectorAll('[data-modal]'),
        modal = document.querySelector('.modal'),
        modalClotheBtn = document.querySelector('.modal__close'),
        modalTimeout = setTimeout(toggleModal, 30000);
  modalTriggers.forEach(btn => {
    btn.addEventListener('click', () => {
      toggleModal();
    });
  });
  modalClotheBtn.addEventListener('click', toggleModal);
  modal.addEventListener('click', e => {
    if (e.target === modal) {
      toggleModal();
    }
  });
  document.addEventListener('keydown', e => {
    if (e.code === "Escape" && modal.classList.contains('show')) {
      toggleModal();
    }
  });
  document.addEventListener('scroll', showModalByscroll);

  function toggleModal() {
    modal.classList.toggle('show');
    document.body.classList.toggle("scroll"); //bocumnet overflow - hidden  or scroll

    clearTimeout(modalTimeout);
    document.removeEventListener('scroll', showModalByscroll);
  }

  function showModalByscroll() {
    if (document.body.offsetHeight == window.scrollY + document.documentElement.clientHeight) {
      toggleModal();
    }
  } //MODAL END
  //MENU


  class MenuCart {
    constructor(src, alt, title, descr, price, parentSelector, ...classes) {
      this.src = src;
      this.alt = alt;
      this.title = title;
      this.descr = descr;
      this.price = price;
      this.classes = classes;
      this.transfer = 27;
      this.parent = document.querySelector(parentSelector);
      this.changeToUAH();
    }

    changeToUAH() {
      this.price = this.price * this.transfer;
    }

    render() {
      const element = document.createElement('div');

      if (this.classes.length === 0) {
        this.classes = 'menu__item';
        element.classList.add(this.classes);
      } else {
        this.classes.forEach(className => element.classList.add('menu__item', className));
      }

      element.innerHTML = `
             <img src=${this.src} alt=${this.alt}>
               <h3 class="menu__item-subtitle">${this.title}</h3>
               <div class="menu__item-descr">${this.descr}</div>
               <div class="menu__item-divider"></div>
               <div class="menu__item-price">
                  <div class="menu__item-cost">Цена:</div>
                  <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
               </div>
            `;
      this.parent.append(element);
    }

  }

  new MenuCart("img/tabs/elite.jpg", "elite", 'Меню “Премиум”', 'В меню “Премиум” мы используем не только красивый дизайн упаковки,\
      но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!', 12, ".menu .container", 'white').render();
  new MenuCart("img/tabs/vegy.jpg", "vegy", 'Меню "Фитнес"', 'Меню "Фитнес" - это новый подход к приготовлению блюд: больше свежих\
      овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной\
      ценой и высоким качеством!', 5, ".menu .container", 'red').render();
  new MenuCart("img/tabs/post.jpg", "post", 'Меню "Постное"', 'Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие\
      продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное\
      количество белков за счет тофу и импортных вегетарианских стейков. ', 9, ".menu .container", "big").render(); //MENU END
});

/***/ })

/******/ });
//# sourceMappingURL=script.js.map