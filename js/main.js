"use strict";
window.onload = (e) => {
  const MainElements = document.querySelectorAll("main > *");
  const logo = document.querySelector(".brand img");
  const navLinks = document.querySelectorAll("nav > li");
  const sticky = document.querySelector("#sticky");
  const stickyLimit = document.querySelector(".sticky-limit");
  const a = document.querySelectorAll("a");
  const fsSlides = document.querySelectorAll(".portfolio_slider_images li");
  const fsSlidesLinks = document.querySelectorAll(
    ".portfolio_slider_navigation li"
  );
  const splitting = document.querySelectorAll("[data-splitting]");
  const zipEffect = document.querySelectorAll(".zip-it");
  const form = document.querySelector("#form");
  const Anchordelay = 500; // in milliseconds
  const fsSlideDelay = 3000; // in milliseconds

  if (splitting.length) {
    Splitting();
  }
  /* =========================
  Default state on page load
 ============================= */
  logo.style.transform = "scale(1)";
  [...MainElements].forEach((el) => {
    el.style.opacity = 1;
  });
  [...navLinks].forEach((el) => {
    el.style.transform = "matrix(1, 0, 0, 1, 0, 0)";
    el.style.opacity = 1;
  });

  /* =========================
 Work page slider animation
============================= */
  // Only trigger the fullscreen portfolio function when it's available
  if (fsSlides.length) {
    // set first element as active
    [...fsSlides][0].classList.add("active");
    [...fsSlidesLinks][0].classList.add("active");
    setInterval(() => {
      [...zipEffect][0].classList.add("animate");
    }, 1);
    // start image counting
    let CurrentImg = 1;

    // run fsSlide fn on delay time
    setInterval(() => {
      fsSlide(CurrentImg);
      CurrentImg++;
      if (
        CurrentImg === [...fsSlides].length &&
        CurrentImg === [...fsSlidesLinks].length
      ) {
        CurrentImg = 0;
      }
    }, fsSlideDelay);
    // slider class toogle
    function fsSlide(CurrentImg) {
      // remove all active class
      [...fsSlides].forEach((el) => {
        el.classList.remove("active");
      });
      [...fsSlidesLinks].forEach((el) => {
        el.classList.remove("active");
      });
      [...zipEffect].forEach((el) => {
        el.classList.remove("animate");
      });

      // add class on current item
      [...fsSlides][CurrentImg].classList.add("active");
      [...fsSlidesLinks][CurrentImg].classList.add("active");

      setInterval(() => {
        [...zipEffect][CurrentImg].classList.add("animate");
      }, 1);
    }
  }

  /* ===================================
  On Scroll Animation in about page
 ======================================= */
  window.onscroll = function () {
    stickyAnim();
  };
  function stickyAnim() {
    if (sticky) {
      const stickyPos = sticky.offsetTop;
      if (
        window.pageYOffset > stickyPos &&
        window.pageYOffset <= stickyLimit.scrollHeight + 300
      ) {
        sticky.style.top = 0;
        sticky.classList.add("sticky");
      } else {
        sticky.classList.remove("sticky");
      }
    }
  }

  /* =========================
    Anchor tag click delay
============================= */

  [...a].forEach((elm) => {
    let href = elm.getAttribute("href");
    if (href != "#") {
      elm.addEventListener("click", (e) => {
        e.preventDefault();
        // main elements opacity and logo scale
        logo.style.transform = "scale(0)";
        logo.style.transitionDelay = "0s";

        [...MainElements].forEach((el) => {
          el.style.opacity = 0;
        });
        // Nav links transition
        [...navLinks].forEach((el) => {
          el.style.transform = "matrix(1, 0, 0, 1, -50, -15)";
          el.style.opacity = 0;
        });
        // go to href page after delay
        setInterval(() => {
          window.location = href;
        }, Anchordelay);
      });
    }
  });

  /* =========================
    Typed js animation
============================= */
  var typed = new Typed(".typed", {
    strings: ["Write me, Please", "Hola", "こんにちは", "Aloha", "Ciao"],
    typeSpeed: 0,
    backSpeed: 50,
    smartBackspace: true, // this is a default
    loop: true,
  });

  /* =========================
    form submit
============================= */
  form.addEventListener("submit", handleForm);
  function handleForm(ev) {
    ev.preventDefault(); //stop the page reloading
    let formData = new FormData(form);

    //add more things that were not in the form
    // formData.append("api-key", "myApiKey");

    // look at all the contents
    for (let key of formData.keys()) {
      console.log(key, formData.get(key));
    }

    //send the request with formData
    let url = form.getAttribute("action");
    let method = form.getAttribute("method");
    let req = new Request(url, {
      body: formData,
      method: method,
    });

    fetch(req)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        console.log("response from server", data);
        document.querySelector(".response").innerHTML = data;
      })
      .catch(console.warn);
  }
};
