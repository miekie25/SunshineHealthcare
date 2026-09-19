document.documentElement.classList.add("js-enabled");

(function () {
  "use strict";

  var yearEl = document.getElementById("year");
  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  var navToggle = document.getElementById("navToggle");
  var primaryNav = document.getElementById("primaryNav");

  function closeNav() {
    if (primaryNav) {
      primaryNav.classList.remove("is-open");
    }
    if (navToggle) {
      navToggle.setAttribute("aria-expanded", "false");
    }
  }

  if (navToggle && primaryNav) {
    navToggle.addEventListener("click", function () {
      var isOpen = primaryNav.classList.toggle("is-open");
      navToggle.setAttribute("aria-expanded", isOpen ? "true" : "false");
    });

    primaryNav.querySelectorAll("a").forEach(function (link) {
      link.addEventListener("click", closeNav);
    });
  }

  var revealEls = document.querySelectorAll(".reveal");
  if ("IntersectionObserver" in window && revealEls.length) {
    var revealObserver = new IntersectionObserver(
      function (entries, observer) {
        entries.forEach(function (entry) {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.15 }
    );
    revealEls.forEach(function (el) {
      revealObserver.observe(el);
    });
  } else {
    revealEls.forEach(function (el) {
      el.classList.add("is-visible");
    });
  }

  var toTop = document.getElementById("toTop");
  if (toTop) {
    var toTopShown = false;
    function updateToTop() {
      var show = window.scrollY > 400;
      if (show !== toTopShown) {
        toTopShown = show;
        toTop.style.display = show ? "grid" : "none";
      }
    }
    updateToTop();
    window.addEventListener("scroll", updateToTop, { passive: true });

    toTop.addEventListener("click", function () {
      window.scrollTo({ top: 0, behavior: "smooth" });
    });
  }
})();