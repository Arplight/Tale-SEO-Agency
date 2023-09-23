//Progress bars
function progress(progId, labelId, percentage) {
  let prog = document.getElementById(progId);
  let label = document.getElementById(labelId);
  let target = prog.max;
  let countDown = setInterval(() => {
    prog.value < target - percentage ? prog.value++ : clearInterval(countDown);
    label.innerText = `${prog.value}%`;
  }, 15);
}

//Back to top button
let topBtn = document.getElementById("top-btn");
window.addEventListener("scroll", () => {
  topBtn.classList.toggle("visible", window.scrollY >= 400);
});

function toTop() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

//Navbar scroll state
let nav = document.getElementById("sticky-nav");
let menu = document.getElementById("menu");
window.addEventListener("scroll", navScroll);
window.addEventListener("resize", navScroll);

function navScroll() {
  const { innerWidth, scrollY } = window;
  let isScrolled = scrollY >= 60 && innerWidth >= 768;
  nav.classList.toggle("nav-scroll", isScrolled);
  menu.style.marginTop = isScrolled ? "24px" : "34px";
}

//Nav icon toggler
function navToggle(btn) {
  btn.classList.toggle("animate");
}

//Nav scroll to section
function toSection() {
  let sections = document.querySelectorAll(".section");
  sections.forEach((section) => {
    section.addEventListener("click", (e) => {
      e.preventDefault();
      const target = document.querySelector(section.getAttribute("href"));
      const offset = 60;
      window.scrollTo({
        top:
          window.innerWidth <= 992
            ? target.offsetTop
            : target.offsetTop + offset,
        behavior: "smooth",
      });
    });
  });
}

//Nav link active on scroll
function activeSection() {
  let sections = document.querySelectorAll(".sec");
  window.addEventListener("scroll", (current) => {
    current = window.scrollY;
    sections.forEach((section) => {
      let target = document.querySelector(section.getAttribute("href"));
      let isInRange =
        current >= target.offsetTop &&
        current < target.offsetTop + target.offsetHeight;
      section.classList.toggle("active", isInRange);
    });
  });
}

//Typer function
function typer(id) {
  let i = 0;
  let j = 0;
  let arrOfClasses = [];
  let arrOfWords = [];
  let title = document.getElementById(id);
  for (let d of title.children) {
    arrOfClasses.push(d);
    arrOfWords.push(d.innerText);
    d.innerText = "";
  }

  function charPrint() {
    if (i < arrOfWords.length) {
      if (j < arrOfWords[i].length) {
        if (arrOfWords[i][j] == " ") {
          arrOfClasses[i].innerHTML += "&nbsp;";
        } else {
          arrOfClasses[i].innerText += arrOfWords[i][j].trim();
        }
        j++;
      } else if (i < arrOfWords.length - 1) {
        i++;
        j = 0;
        arrOfClasses[i].innerHTML += "&nbsp;";
      }
    } else {
      clearInterval(intervalId);
    }
  }

  let intervalId = setInterval(charPrint, 50);
}

// Slick carousel
function slickCarousel() {
  $("#projects-slider").slick({
    slidesToShow: 4,
    slidesToScroll: 1,
    autoplay: true,
    autoplaySpeed: 2000,
    speed: 800,
    pauseOnHover: true,
    draggable: true,
    touchMove: true,
    arrows: false,
    dots: false,
    responsive: [
      {
        breakpoint: 992,
        settings: {
          slidesToShow: 3,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 576,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
          pauseOnHover: false,
        },
      },
    ],
  });
}

// Function calling
function funcCall() {
  const currentPage = document.body.getAttribute("data-page");
  // Current page check
  if (currentPage === "index") {
    toSection();
    activeSection();
    slickCarousel();
    var waypoint = new Waypoint({
      element: document.querySelector(".progs"),
      handler: function () {
        progress("prog-1", "label-1", 10);
        progress("prog-2", "label-2", 20);
        progress("prog-3", "label-3", 5);
      },
      offset: "bottom-in-view",
    });
  } else if (currentPage === "about") {
    var waypoint = new Waypoint({
      element: document.querySelector(".progs"),
      handler: function () {
        progress("prog-4", "label-4", 10);
        progress("prog-5", "label-5", 20);
        progress("prog-6", "label-6", 5);
      },
      offset: "bottom-in-view",
    });
  }
  typer("test");
}

(async () => {
  // Preloading content
  await new Promise((resolve, reject) => {
    window.addEventListener("load", () => {
      let contents = document.querySelectorAll(".pending");
      let spinner = document.getElementById("bg");
      setTimeout(() => {
        spinner.style.display = "none";
        contents.forEach((content) => {
          content.classList.remove("pending");
          content.classList.add("start");
        });
        resolve();
      }, 800);
    });
  });
  funcCall();
})();
