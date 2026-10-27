/* ==========================================================
   main.js — shared behaviour for every page
   (navigation menu, active link, scroll animations, footer)
   ========================================================== */

document.addEventListener("DOMContentLoaded", function () {
  setupMenu();
  highlightActiveLink();
  setupReveal();
  setFooterYear();
  setupGreeting();
  setupProjectFilter();
});

/* Mobile hamburger menu: event handling + DOM class toggling */
function setupMenu() {
  const toggle = document.querySelector(".menu-toggle");
  const links = document.querySelector(".nav-links");
  if (!toggle || !links) return;

  toggle.addEventListener("click", function () {
    const isOpen = links.classList.toggle("open");
    toggle.setAttribute("aria-expanded", isOpen);
    toggle.textContent = isOpen ? "✕" : "☰";
  });
}

/* Mark the link for the current page as active */
function highlightActiveLink() {
  let page = window.location.pathname.split("/").pop();
  if (page === "") page = "index.html";

  document.querySelectorAll(".nav-links a").forEach(function (link) {
    if (link.getAttribute("href") === page) {
      link.classList.add("active");
      link.setAttribute("aria-current", "page");
    }
  });
}

/* Fade elements in as they scroll into view, and fill skill bars */
function setupReveal() {
  const items = document.querySelectorAll(".reveal");

  if (!("IntersectionObserver" in window)) {
    items.forEach(function (el) { el.classList.add("visible"); });
    fillSkillBars();
    return;
  }

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(function (entry) {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        entry.target.querySelectorAll(".bar span").forEach(function (bar) {
          bar.style.width = bar.dataset.level + "%";
        });
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.15 });

  items.forEach(function (el) { observer.observe(el); });
}

function fillSkillBars() {
  document.querySelectorAll(".bar span").forEach(function (bar) {
    bar.style.width = bar.dataset.level + "%";
  });
}

function setFooterYear() {
  const year = document.getElementById("year");
  if (year) year.textContent = new Date().getFullYear();
}

/* Homepage greeting that changes with the time of day (dynamic content) */
function setupGreeting() {
  const el = document.getElementById("greeting");
  if (!el) return;
  const hour = new Date().getHours();
  let greeting = "Good evening";
  if (hour < 12) greeting = "Good morning";
  else if (hour < 17) greeting = "Good afternoon";
  el.textContent = greeting + ", welcome to my portfolio";
}

/* Projects page: filter cards by category */
function setupProjectFilter() {
  const buttons = document.querySelectorAll(".filter-btn");
  const projects = document.querySelectorAll(".project");
  if (!buttons.length) return;

  buttons.forEach(function (btn) {
    btn.addEventListener("click", function () {
      buttons.forEach(function (b) { b.classList.remove("active"); });
      btn.classList.add("active");

      const category = btn.dataset.filter;
      projects.forEach(function (card) {
        const match = category === "all" || card.dataset.category === category;
        card.classList.toggle("hide", !match);
      });
    });
  });
}
