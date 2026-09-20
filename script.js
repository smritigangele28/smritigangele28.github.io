const year = document.getElementById("year");
if (year) {
  year.textContent = String(new Date().getFullYear());
}

const nav = document.querySelector(".nav");
const toggle = document.querySelector(".nav-toggle");
const menu = document.getElementById("nav-menu");

if (nav && toggle && menu) {
  toggle.addEventListener("click", () => {
    const open = nav.classList.toggle("is-open");
    toggle.setAttribute("aria-expanded", String(open));
  });

  menu.querySelectorAll("a").forEach((link) => {
    link.addEventListener("click", () => {
      nav.classList.remove("is-open");
      toggle.setAttribute("aria-expanded", "false");
    });
  });
}

const sectionIds = ["expertise", "work", "experience", "writing", "contact"];
const sections = sectionIds
  .map((id) => document.getElementById(id))
  .filter(Boolean);
const navLinks = [...document.querySelectorAll(".nav-list a[href^='#']")];

const spy = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      navLinks.forEach((link) => {
        const active = link.getAttribute("href") === `#${entry.target.id}`;
        if (active) {
          link.setAttribute("aria-current", "true");
        } else {
          link.removeAttribute("aria-current");
        }
      });
    });
  },
  { rootMargin: "-40% 0px -50% 0px", threshold: 0.1 }
);

sections.forEach((section) => spy.observe(section));
