"use strict";

///////////////////////////////////////
// Modal window
const sections = document.querySelectorAll(".section");
const nav = document.querySelector(".nav");
const header = document.querySelector(".header");
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const btnCloseModal = document.querySelector(".btn--close-modal");
const btnsOpenModal = document.querySelectorAll(".btn--show-modal");
const btnscrollto = document.querySelector(".btn--scroll-to");
const section1 = document.querySelector("#section--1");
const h1 = document.querySelector("h1");
const tabs = document.querySelectorAll(".operations__tab");
const containertab = document.querySelector(".operations__tab-container");
const tabContent = document.querySelectorAll(".operations__content");
const parent_link = document.querySelector(".nav__links");

parent_link.addEventListener("click", function (e) {
  e.preventDefault();
  if (e.target.classList.contains("nav__link")) {
    document
      .querySelector(`${e.target.getAttribute("href")}`)
      .scrollIntoView({ behavior: "smooth" });
  }
});

/// tabbing:
containertab.addEventListener("click", (e) => {
  const clicked = e.target.closest(".operations__tab");
  const content_vs = document.querySelector(
    `.operations__content--${clicked.dataset.tab}`
  );
  if (!clicked) return;
  tabs.forEach((val) => val.classList.remove("operations__tab--active"));
  tabContent.forEach((val) =>
    val.classList.remove("operations__content--active")
  );
  clicked.classList.add("operations__tab--active");

  content_vs.classList.add("operations__content--active");
});

//// sticky navigation ................(Without intersection api)

// const initval = section1.getBoundingClientRect();
// console.log(initval);
// window.addEventListener("scroll", () => {
//   if (window.scrollY >= initval.top) nav.classList.add("sticky");
//   else nav.classList.remove("sticky");
// });

///// Using interesection  API to implement Sticky Navigation....

const navHeight = nav.getBoundingClientRect().height;

const obsCallback = (entries) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) nav.classList.add("sticky");
    else nav.classList.remove("sticky");
  });
};
const obsOptions = {
  root: null,
  threshold: 0,
  rootMargin: `-${navHeight}px`,
};

const observer = new IntersectionObserver(obsCallback, obsOptions);
observer.observe(header);

////// Using intersection API to apply transition onto sections :

const InterCallback = (entries) => {
  //   console.log(entries);
  const [entry] = entries;
  if (!entry.isIntersecting) return;
  entry.target.classList.remove("section--hidden");
  InterObserver.unobserve(entry.target);
};

const InterOptions = {
  threshold: 0.15,
};
const InterObserver = new IntersectionObserver(InterCallback, InterOptions);
sections.forEach((sec) => {
  InterObserver.observe(sec);
  sec.classList.add("section--hidden");
});

//// Lazy loading of images:
const imgTarget = document.querySelectorAll("img[data-src]");
const ImgOptions = {
  root: null,
  threshold: 0,
  rootMargin: "200px",
};

const Imgcallback = (entries) => {
  const [entry] = entries;
  console.log(entries);
  if (!entry.isIntersecting) return;
  entry.target.src = entry.target.dataset.src;
  entry.target.addEventListener("load", () => {
    entry.target.classList.remove("lazy-img");
  });
  ImgObserver.unobserve(entry.target);
};
const ImgObserver = new IntersectionObserver(Imgcallback, ImgOptions);
imgTarget.forEach((img) => ImgObserver.observe(img));

//fadding...............

const fadding = function (e, opac) {
  if (e.target.classList.contains("nav__link")) {
    console.log(this, e.target);
    const link = e.target;
    const siblinks = link.closest(".nav").querySelectorAll(".nav__link");
    const logo = link.closest(".nav").querySelector("img");
    siblinks.forEach((el) => {
      if (el !== link) el.style.opacity = this;
    });
    logo.style.opacity = this;
  }
};

nav.addEventListener("mouseover", fadding.bind(0.5));

nav.addEventListener("mouseout", fadding.bind(1));

// implementing smooth scrolling;
btnscrollto.addEventListener("click", (e) => {
  section1.scrollIntoView({ behavior: "smooth" });
});

const openModal = function (e) {
  e.preventDefault();
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden");
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
};

btnsOpenModal.forEach((modal) => {
  modal.addEventListener("click", openModal);
});

document.querySelector("btn--close-cookie");
btnCloseModal.addEventListener("click", closeModal);
overlay.addEventListener("click", closeModal);

document.addEventListener("keydown", function (e) {
  if (e.key === "Escape" && !modal.classList.contains("hidden")) {
    closeModal();
  }
});

const btn = document.getElementsByTagName("button");

const message = document.createElement("div");
message.innerHTML =
  'We accept cookies for imporvement and analytics.<button class="btn  btn--close-cookie">Got it!</button>';
message.style.backgroundColor = "#37383d";

header.append(message);
message.classList.add("cookie-message");
message.style.height =
  Number.parseFloat(getComputedStyle(message).height, 10) + 40 + "px";
const cookie_close = document.querySelector(".btn--close-cookie");
console.log(cookie_close);
cookie_close.addEventListener("click", () => {
  message.remove();
});

/// Implementing Slider in for testimonials :

const slides = document.querySelectorAll(".slide");
const slider = document.querySelector(".slider");

const Btnleft = document.querySelector(".slider__btn--left");
const Btnright = document.querySelector(".slider__btn--right");
const dotContainer = document.querySelector(".dots");

let currentSlide = 0;
const maxSlide = slides.length;

const createDots = function () {
  slides.forEach((_, i) => {
    dotContainer.insertAdjacentHTML(
      "beforeend",
      `<button class= "dots__dot" data-side = "${i}" ></button>`
    );
  });
};

const selectDot = function (slide) {
  document.querySelectorAll(".dots__dot").forEach((s) => {
    s.classList.remove("dots__dot--active");
  });
  document
    .querySelector(`.dots__dot[data-side = "${slide}"]`)
    ?.classList.add("dots__dot--active");
};

const goToSlide = function (s) {
  slides.forEach((slide, i) => {
    slide.style.transform = `translateX(${100 * (i - s)}%)`;
  });
};

const init = function () {
  createDots();
  selectDot(0);
  goToSlide(0);
};
init();
const nextSlide = function () {
  if (currentSlide >= maxSlide - 1) {
    currentSlide = 0;
  } else {
    currentSlide++;
  }

  goToSlide(currentSlide);
};
const prevSlide = function () {
  if (currentSlide === 0) {
    currentSlide = maxSlide - 1;
  } else {
    currentSlide--;
  }
  goToSlide(currentSlide);
};

Btnright.addEventListener("click", () => {
  nextSlide();
  selectDot(currentSlide);
});
Btnleft.addEventListener("click", function () {
  prevSlide();
  selectDot(currentSlide);
});
document.addEventListener("keydown", (e) => {
  console.log(e);
  if (e.key === "ArrowRight") nextSlide();
  if (e.key === "ArrowLeft") prevSlide();
});

// Using event Delegation :
dotContainer.addEventListener("click", (e) => {
  const target = e.target.dataset.side;
  if (e.target.classList.contains("dots__dot")) {
    currentSlide = target;
    goToSlide(currentSlide);
    selectDot(currentSlide);
    console.log(currentSlide);
  }
});

////************************  End of Project ***************************////
