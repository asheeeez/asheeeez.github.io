gsap.registerPlugin(ScrollTrigger);

document.addEventListener("DOMContentLoaded", () => {
  const lenis = new Lenis({
    duration: 1.2,
    easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    direction: "vertical",
    gestureDirection: "vertical",
    smooth: true,
    mouseMultiplier: 1,
    smoothTouch: false,
    touchMultiplier: 2,
    infinite: false,
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);
  gsap.timeline({ defaults: { ease: "sine.inOut" } });

  // Set initial states first (this is important)
  gsap.set("nav", { y: -200, opacity: 0 });
  gsap.set(".hero_content_left h1", { y: 20, opacity: 0 });
  gsap.set(".hero_content_left p", { y: 30, opacity: 0 });
  gsap.set(".nav-links li", { opacity: 0, y: -30 });
  gsap.set(".nav-resume", { opacity: 0, y: 20 });
  gsap.set(".hero_content_right img", { y: 40, opacity: 0 });
  gsap.set(".keyboard-image", { x: 0, y: 40, opacity: 0.1, rotate: 20 });
  gsap.set(".scrolling-text-container", { opacity: 1, y: 0 });

  // Scroll-triggered animation for keyboard image
  gsap.to(".keyboard-image", {
    rotate: -20,
    x: -50,
    y: -350,
    scrollTrigger: {
      trigger: ".hero_section2",
      start: "top bottom",
      end: "bottom top",
      scrub: "true",
    },
  });

  // Initial animations when page loads
  const tl = gsap.timeline();

  // Animate navigation
  tl.to("nav", {
    y: 0,
    opacity: 1,
    duration: 1,
    ease: "sine.inOut",
  });
  // Animate nav links
  gsap.to(".nav-links li", {
    y: 0,
    opacity: 1,
    duration: 1,
    stagger: 0.5,
    ease: "sine.inOut",
  });

  // Animate hero content
  tl.to(
    ".hero_content_left h1",
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "sine.inOut",
    },
    "-=0.5"
  );
  tl.to(
    ".hero_content_left p",
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "sine.inOut",
    },
    "-=0.7"
  );
  tl.to(
    ".hero_content_right img",
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "sine.inOut",
    },
    "-=0.7"
  );
  tl.to(
    ".keyboard-image",
    {
      y: 0,
      opacity: 0.4,
      duration: 3,
      ease: "sine.inOut",
      delay: 0.5,
    },
    "-=0.7"
  );

  // Animate resume button
  gsap.to(".nav-resume", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "sine.inOut",
  });

  // Add smooth scrolling for anchor links
  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener("click", function (e) {
      e.preventDefault();

      const targetId = this.getAttribute("href");
      if (targetId === "#") return;

      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        lenis.scrollTo(targetElement, {
          offset: 0,
          duration: 1.2,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        });
      }
    });
  });

  function throttle(func, limit) {
    let inThrottle;
    return function () {
      const context = this;
      const args = arguments;
      if (!inThrottle) {
        func.apply(context, args);
        inThrottle = true;
        setTimeout(() => (inThrottle = false), limit);
      }
    };
  }

  window.addEventListener("load", function () {
    setTimeout(function () {
      document
        .querySelectorAll(
          "nav, .hero_content h1, .hero_content p, .hero_content button, .nav-links li, .nav-resume"
        )
        .forEach(function (el) {
          if (parseFloat(window.getComputedStyle(el).opacity) < 0.5) {
            el.style.opacity = "1";
            el.style.transform = "none";
          }
        });
    }, 1000);
  });

  const roles = [
    "Full Stack Developer",
    "UI/UX Designer",
    "WordPress Developer",
    "Mobile App Developer",
    "E-Commerce Developer",
    "Data Analyst",
  ];

  let currentIndex = 0;

  function changeRole() {
    console.log("changeRole function called");
    const roleContainer = document.querySelector(".role-container");
    const roleElement = document.querySelector(".role");

    // Update the role text
    roleElement.textContent = roles[currentIndex];

    // Add active class to fade in
    roleElement.classList.add("active");

    // Remove active class after a delay to fade out
    setTimeout(() => {
      roleElement.classList.remove("active");
    }, 1500);

    // Update the index for the next role
    currentIndex = (currentIndex + 1) % roles.length;

    // Change role every 2.5 seconds
    setTimeout(changeRole, 2500);
  }

  // Start the role change
  changeRole();

  const mobileNavToggle = document.querySelector(".mobile-nav-toggle");
  const mobileNavLinks = document.querySelector(".mobile-nav-links");

  mobileNavToggle.addEventListener("click", () => {
    mobileNavLinks.style.display =
      mobileNavLinks.style.display === "block" ? "none" : "block";
  });

  const scrollingTextContainer = document.querySelector('.scrolling-text-container');
  const scrollingText = document.querySelector('.scrolling-text');
  const letters = document.querySelectorAll('.scrolling-text span');

  const numLetters = letters.length;
  const angleIncrement = 360 / numLetters;

  letters.forEach((letter, index) => {
    letter.style.transform = `rotate(${index * angleIncrement}deg)`;
  });

  document.addEventListener('mousemove', (event) => {
    const scrollingTextContainer = document.querySelector('.scrolling-text-container');
    if (scrollingTextContainer) {
      gsap.to(scrollingTextContainer, {
        left: event.clientX - scrollingTextContainer.offsetWidth / 2,
        top: event.clientY - scrollingTextContainer.offsetHeight / 2,
        duration: 0.5, // Adjust duration as needed
        ease: "elastic.out(1, 0.75)", // Apply elastic easing
      });
    }
  });
});
const marquee = document.querySelector('.marquee');
const marqueeText = document.querySelector('.marquee span');

// Duplicate text for seamless looping
const duplicateText = marqueeText.cloneNode(true);
marquee.appendChild(duplicateText);

// Set up infinite scrolling effect
gsap.set(marquee, { x: 0 });

const marqueeTl = gsap.timeline({ repeat: -1, defaults: { ease: "none" } });

marqueeTl.to(marquee, {
  x: "-50%", // Move half of the duplicated content to maintain continuity
  duration: 10,
  ease: "linear",
  onComplete: () => {
    gsap.set(marquee, { x: 0 }); // Reset to avoid jumps
  }
});


ScrollTrigger.create({
  trigger: '.marquee-container',
  start: 'top bottom',
  end: 'bottom top',
  onUpdate: (self) => {
    const scrollSpeed = self.getVelocity() * 0.01; // Adjust the multiplier as needed
    const newDuration = Math.max(20, 80 - scrollSpeed * 100); // Adjust the range as needed
    marqueeTl.duration(newDuration);
  },
});
