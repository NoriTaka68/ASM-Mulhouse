// Navigation bar behavior
const nav = document.querySelector("header");
const burger = document.querySelector(".burger");
const navLinks = document.querySelector(".nav-links");
const navItems = document.querySelectorAll(".nav-links li");

// Change navbar on scroll
window.addEventListener("scroll", () => {
  if (window.scrollY > 50) {
    nav.classList.add("scrolled");
  } else {
    nav.classList.remove("scrolled");
  }
});

// Mobile menu toggle
burger.addEventListener("click", () => {
  navLinks.classList.toggle("nav-active");

  // Animate links
  navItems.forEach((link, index) => {
    if (link.style.animation) {
      link.style.animation = "";
    } else {
      link.style.animation = `navLinkFade 0.5s ease forwards ${
        index / 7 + 0.3
      }s`;
    }
  });

  // Burger animation
  burger.classList.toggle("toggle");
});

// Scroll animation
function animateOnScroll() {
  const elements = document.querySelectorAll(".animate-on-scroll");

  elements.forEach((element) => {
    const elementPosition = element.getBoundingClientRect().top;
    const screenPosition = window.innerHeight / 1.2;

    if (elementPosition < screenPosition) {
      element.classList.add("visible");
      element.style.transform = "translateY(0)";
    }
  });
}

window.addEventListener("scroll", animateOnScroll);
window.addEventListener("load", animateOnScroll);

// Gallery filter
if (document.querySelector(".filter-btn")) {
  const filterBtns = document.querySelectorAll(".filter-btn");
  const galleryItems = document.querySelectorAll(".gallery-item");

  filterBtns.forEach((btn) => {
    btn.addEventListener("click", () => {
      // Active button
      filterBtns.forEach((b) => b.classList.remove("active"));
      btn.classList.add("active");

      // Filter items
      const filterValue = btn.getAttribute("data-filter");

      galleryItems.forEach((item) => {
        if (
          filterValue === "all" ||
          item.getAttribute("data-category") === filterValue
        ) {
          item.style.display = "block";
        } else {
          item.style.display = "none";
        }
      });
    });
  });
}

// Gallery lightbox
if (document.querySelector(".gallery-item")) {
  const galleryItems = document.querySelectorAll(".gallery-item");
  const body = document.body;

  // Create lightbox elements
  const lightbox = document.createElement("div");
  lightbox.className = "gallery-lightbox";

  const lightboxContent = document.createElement("div");
  lightboxContent.className = "lightbox-content";

  const lightboxImg = document.createElement("img");
  lightboxImg.className = "lightbox-image";

  const lightboxCaption = document.createElement("div");
  lightboxCaption.className = "lightbox-caption";

  const closeBtn = document.createElement("span");
  closeBtn.className = "lightbox-close";
  closeBtn.innerHTML = '<i class="fas fa-times"></i>';

  lightboxContent.appendChild(lightboxImg);
  lightboxContent.appendChild(lightboxCaption);
  lightbox.appendChild(lightboxContent);
  lightbox.appendChild(closeBtn);
  body.appendChild(lightbox);

  let currentIndex = 0;

  // Open lightbox
  galleryItems.forEach((item, index) => {
    const img = item.querySelector("img");
    const title = item.querySelector("h3").textContent;
    const desc = item.querySelector("p").textContent;

    item.querySelector(".gallery-zoom").addEventListener("click", () => {
      currentIndex = index;
      lightboxImg.src = img.src;
      lightboxCaption.innerHTML = `<h3>${title}</h3><p>${desc}</p>`;
      lightbox.classList.add("active");
      body.style.overflow = "hidden";
    });
  });

  // Close lightbox
  closeBtn.addEventListener("click", () => {
    lightbox.classList.remove("active");
    body.style.overflow = "auto";
  });

  // Close on outside click
  lightbox.addEventListener("click", (e) => {
    if (e.target === lightbox) {
      lightbox.classList.remove("active");
      body.style.overflow = "auto";
    }
  });
}

// Contact form validation and submission
if (document.querySelector(".contact-form")) {
  const contactForm = document.querySelector(".contact-form");

  contactForm.addEventListener("submit", (e) => {
    e.preventDefault();

    // Form validation would go here

    // Show success message
    contactForm.parentElement.classList.add("show-success");

    // Reset form
    contactForm.reset();

    // Hide success after 5 seconds and show form again
    setTimeout(() => {
      contactForm.parentElement.classList.remove("show-success");
    }, 5000);
  });
}
