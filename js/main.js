"use strict";
window.onload = (e) => {
  const Mainelmnts = document.querySelectorAll("main > *");
  const logo = document.querySelector(".brand img");
  const navLinks = document.querySelectorAll("nav > li");
  const sticky = document.querySelector("#sticky");
  const stickyLimit = document.querySelector(".sticky-limit");
  const a = document.querySelectorAll("a");
  const delay = 500; // in milliseconds

  /*------- On Scroll Animation -------*/
  window.onscroll = function () {
    stickyAnim();
  };
  /*------- Anchor tag click delay --------*/
  [...a].forEach((elm) => {
    let href = elm.getAttribute("href");
    if (href != "#") {
      elm.addEventListener("click", (e) => {
        e.preventDefault();
        [...Mainelmnts].forEach((el) => {
          el.style.opacity = 0;
          logo.style.transform = "scale(0)";
        });
        [...navLinks].forEach((el) => {
          el.style.transform = "matrix(1, 0, 0, 1, -50, -15)";
          el.style.opacity = 0;
        });

        setInterval(() => {
          window.location = href;
        }, delay);
      });
    }
  });

  /*------  About Page Sticky animation ------*/
  function stickyAnim() {
    const stickyPos = sticky.offsetTop;
    if (
      window.pageYOffset > stickyPos &&
      window.pageYOffset <= stickyLimit.scrollHeight + 200
    ) {
      sticky.style.top = 0;
      sticky.classList.add("sticky");
    } else {
      sticky.classList.remove("sticky");
    }
    if (window.pageYOffset > stickyLimit.scrollHeight + 200) {
      sticky.style.top = window.pageYOffset - 200 + "px";
    }
  }
};
