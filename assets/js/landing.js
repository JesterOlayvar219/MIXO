var swiperImg = new Swiper(".mySwiper", {
  spaceBetween: 30,
  effect: "fade",
  loop: true,
  autoplay: {
    delay: 3000,
    disableOnInteraction: false,
  },
  navigation: false,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
});

document.querySelector(".next-button").addEventListener("click", () => {
  swiperImg.slideNext();
});

document.querySelector(".preview-button").addEventListener("click", () => {
  swiperImg.slidePrev();
});

// chat bot
var modal = document.getElementById("chatBot");
var btn = document.getElementById("chatBtn");
var span = document.getElementsByClassName("close")[0];

btn.onclick = function () {
  modal.style.display = "block";
};

span.onclick = function () {
  modal.style.display = "none";
};

window.onclick = function (event) {
  if (event.target == modal) {
    modal.style.display = "none";
  }
};

const swiperMark = new Swiper(".swiper", {
  spaceBetween: 0, //10
  speed: 20000, //3000
  direction: "horizontal",
  autoplay: { delay: 0, disableOnInteraction: false, stopOnLastSlide: false },
  loop: true,
  slidesPerView: 1, //6
  freeMode: true,
  // centeredSlides: true,

  breakpoints: {
    640: {
      slidesPerView: 2,
    },
    768: {
      slidesPerView: 4,
    },
    1024: {
      slidesPerView: 6,
    },
  },
});
