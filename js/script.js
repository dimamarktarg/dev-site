"use strict";

// Код помогает определить на каком устройстве открыта страница
const isMobile = {
  Android: function () {
    return navigator.userAgent.match(/Android/i);
  },
  BlackBerry: function () {
    return navigator.userAgent.match(/BlackBerry/i);
  },
  iOS: function () {
    return navigator.userAgent.match(/iPhone|iPad|iPod/i);
  },
  Opera: function () {
    return navigator.userAgent.match(/Opera Mini/i);
  },
  Windows: function () {
    return navigator.userAgent.match(/IEMobile/i);
  },
  any: function () {
    return (
      isMobile.Android() ||
      isMobile.BlackBerry() ||
      isMobile.iOS() ||
      isMobile.Opera() ||
      isMobile.Windows()
    );
  },
};

// Проверяем ПК или моб.
if (isMobile.any()) {
  // Добавляем класс для моб.
  document.body.classList.add("_touch");
  // Выбираем все меню с подменю
  let menuArrows = document.querySelectorAll(".menu__arrow");
  // Проверка наличия пунктов с подменю
  if (menuArrows.length > 0) {
    // Перебераем нодлист с подменю
    menuArrows.forEach((menuArrow) => {
      // Реагируем на клик
      menuArrow.addEventListener("click", function (e) {
        // Добавляем класс активному подменю
        menuArrow.parentElement.classList.toggle("_active");
      });
    });
  }
} else {
  // Добавляем класс для ПК
  document.body.classList.add("_pc");
}

// Меню бургер
const iconMenu = document.querySelector(".menu__icon");
const menuBody = document.querySelector(".menu__body");
if (iconMenu) {
  iconMenu.addEventListener("click", function (e) {
    document.body.classList.toggle("_lock"); // Блокируем прокрутку страницы при открытом меню
    iconMenu.classList.toggle("_active");
    menuBody.classList.toggle("_active");
  });
}

// Прокрутка при клике
// Выбираем все пункты меню с атрибутом data-goto
const menuLinks = document.querySelectorAll(".menu__link[data-goto]");
// Проверяем есть ли такие пункты меню
if (menuLinks.length > 0) {
  // Реагируем на клик
  menuLinks.forEach((menuLink) => {
    menuLink.addEventListener("click", onMenuLinkClick);
  });

  // Функция для перехода к нужной секции
  function onMenuLinkClick(e) {
    const menuLink = e.target; // ел. на который кликнули
    // Проверяем заполнин ли дата атрибут && существует ли объект на который ссылается дата атрибут
    if (
      menuLink.dataset.goto &&
      document.querySelector(menuLink.dataset.goto)
    ) {
      const gotoBlock = document.querySelector(menuLink.dataset.goto); // Выбираем кликнутый объект к которому нужно перейти

      gotoBlock.scrollIntoView({ behavior: "smooth" });
      // Убираем меню при переходе
      if (iconMenu.classList.contains("_active")) {
        document.body.classList.remove("_lock");
        iconMenu.classList.remove("_active");
        menuBody.classList.remove("_active");
      }
      e.preventDefault();
    }
  }
}

/* Когда пользователь прокручивает вниз, скрыть навигационную панель. Когда пользователь прокручивает вверх, показать навигационную панель */
let prevScrollpos = window.pageYOffset;
window.onscroll = function () {
  const currentScrollPos = window.pageYOffset;
  if (prevScrollpos > currentScrollPos) {
    document.getElementById("navbar").style.top = "0";
  } else {
    document.getElementById("navbar").style.top = "-50px";
  }
  prevScrollpos = currentScrollPos;
};

/* --------------------------------------------------------- */

///////////////////////////////////////
// Выбор элементов для формы
const modalWindow = document.querySelector(".modal-window");
const overlay = document.querySelector(".overlay");
const btnCloseModalWindow = document.querySelector(".btn--close-modal-window");
const btnsOpenModalWindow = document.querySelectorAll(
  ".btn--show-modal-window"
);
/////////////////////////////////////
// Modal window

const openModalWindow = function (e) {
  e.preventDefault();
  modalWindow.classList.remove("scale");
  overlay.classList.remove("hidden");
};

const closeModalWindow = function () {
  modalWindow.classList.add("scale");
  overlay.classList.add("hidden");
};

btnsOpenModalWindow.forEach((button) =>
  button.addEventListener("click", openModalWindow)
);

btnCloseModalWindow.addEventListener("click", closeModalWindow);
overlay.addEventListener("click", closeModalWindow);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modalWindow.classList.contains("hidden")) {
    closeModalWindow();
  }
});

//================================================================================================================

const form = document.getElementById("my-form");

async function handleSubmit(event) {
  event.preventDefault();
  var status = document.getElementById("my-form-status");
  var data = new FormData(event.target);
  fetch(event.target.action, {
    method: form.method,
    body: data,
    headers: {
      Accept: "application/json",
    },
  })
    .then((response) => {
      if (response.ok) {
        status.innerHTML = "Спасибо за заявку!";
        form.reset();
      } else {
        response.json().then((data) => {
          if (Object.hasOwn(data, "errors")) {
            status.innerHTML = data["errors"]
              .map((error) => error["message"])
              .join(", ");
          } else {
            status.innerHTML = "Упс! Проблема с отправкой вашей формы";
          }
        });
      }
    })
    .catch((error) => {
      status.innerHTML = "Упс! Проблема с отправкой вашей формы";
    });
}
form.addEventListener("submit", handleSubmit);

// ===================================================================
// "Створюємо ефективні сайти для Вашого бізнесу",
//   "1. Проведемо аналіз конкурентів у Вашій ніші",
//   "2. Зробимо сайт краще ніж у конкурентів",
//   "3. Адаптуємо під телефони, планшети та ПК",
//   "4. Оптимізуємо для пошукових систем",
//   "5. Допоможемо з вибором сервера i домену",

// Посимвольная печать текста
const sentences = [
  "Хотите привлечь новых клиентов и развивать свой бизнес в интернете?",
  "Поможем сделать эффективный сайт для вашего бизнеса",
  "Адаптируем под телефоны, планшеты и ПК",
  "Оптимизируем для поисковых систем",
];

const text = document.getElementById("text");
let sentenceIndex = 0;
let charIndex = 0;
let isDeleting = false;
const printDelay = 80; // delay in milliseconds per character
const eraseDelay = 40; // delay in milliseconds per character

function type() {
  const currentSentence = sentences[sentenceIndex];
  const char = currentSentence.charAt(charIndex);
  if (!isDeleting) {
    text.innerHTML += char;
    charIndex++;
    if (charIndex === currentSentence.length) {
      isDeleting = true;
      setTimeout(type, 3000);
    } else {
      setTimeout(type, printDelay);
    }
  } else {
    text.innerHTML = currentSentence.substring(0, charIndex - 1);
    charIndex--;
    if (charIndex === 0) {
      isDeleting = false;
      sentenceIndex++;
      if (sentenceIndex === sentences.length) {
        sentenceIndex = 0;
      }
      setTimeout(type, printDelay);
    } else {
      setTimeout(type, eraseDelay);
    }
  }
}
type();

// Анимация при скроле
const animItems = document.querySelectorAll("._anim-items");

if (animItems.length > 0) {
  window.addEventListener("scroll", animOnScroll);
  function animOnScroll(params) {
    for (let i = 0; i < animItems.length; i++) {
      const animItem = animItems[i];
      const animItemHeight = animItem.offsetHeight;
      const animItemOffset = offset(animItem).top;
      const animStart = 4;

      let animItemPoint = window.innerHeight - animItemHeight / animStart;
      if (animItemHeight > window.innerHeight) {
        animItemPoint = window.innerHeight - window.innerHeight / animStart;
      }

      if (
        scrollY > animItemOffset - animItemPoint &&
        scrollY < animItemOffset + animItemHeight
      ) {
        animItem.classList.add("_anim");
      } else {
        if (!animItem.classList.contains("_anim-no-hide")) {
          animItem.classList.remove("_anim");
        }
      }
    }
  }
  function offset(el) {
    const rect = el.getBoundingClientRect(),
      scrollLeft = window.pageXOffset || document.documentElement.scrollLeft,
      scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    return { top: rect.top + scrollTop, left: rect.left + scrollLeft };
  }
  animOnScroll();
}

// Создание слайдера
const slides = document.querySelectorAll(".slide");
const btnLeft = document.querySelector(".slider__btn--left");
const btnRight = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let currentSlide = 0;
const slidesNumber = slides.length;

const createDots = function () {
  slides.forEach(function (_, index) {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class="dots__dot" data-slide="${index}"></button>`
    );
  });
};
createDots();

const activateCurrentDot = function (slide) {
  document
    .querySelectorAll(".dots__dot")
    .forEach((dot) => dot.classList.remove("dots__dot--active"));
  document
    .querySelector(`.dots__dot[data-slide="${slide}"]`)
    .classList.add("dots__dot--active");
};

activateCurrentDot(0);

const moveToSlide = function (slide) {
  slides.forEach(
    (s, index) => (s.style.transform = `translateX(${(index - slide) * 100}%)`)
  );
};

moveToSlide(0);
// 1 - 0%, 2 - 100%, 3 - 200%, 4 - 300%

const nextSlide = function () {
  if (currentSlide === slidesNumber - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  moveToSlide(currentSlide);
  // 1 - -100%, 2 - 0%, 3 - 100%, 4 - 200%
  activateCurrentDot(currentSlide);
};

const previousSlide = function () {
  if (currentSlide === 0) {
    currentSlide = slidesNumber - 1;
  } else {
    currentSlide--;
  }

  moveToSlide(currentSlide);
  // 1 - -100%, 2 - 0%, 3 - 100%, 4 - 200%
  activateCurrentDot(currentSlide);
};

// btnRight.addEventListener("click", nextSlide);

btnLeft.addEventListener("click", previousSlide);

document.addEventListener("keydown", function (e) {
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") previousSlide();
});

dotContainer.addEventListener("click", function (e) {
  if (e.target.classList.contains("dots__dot")) {
    const slide = e.target.dataset.slide;
    moveToSlide(slide);
    activateCurrentDot(slide);
  }
});
