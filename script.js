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

  // Get scroll value
  lenis.on("scroll", ({ scroll, limit, velocity, direction, progress }) => {
    console.log({ scroll, limit, velocity, direction, progress });
  });

  function raf(time) {
    lenis.raf(time);
    requestAnimationFrame(raf);
  }

  requestAnimationFrame(raf);

  // Set initial states first (this is important)
  gsap.set("nav", { y: -200, opacity: 0 });
  gsap.set(".hero_content h1", { y: 20, opacity: 0 });
  gsap.set(".hero_content p", { y: 30, opacity: 0 });
  gsap.set(".hero_content button", { y: 40, opacity: 0 });
  gsap.set(".nav-links li", { opacity: 0, y: 20 });
  gsap.set(".nav-resume", { opacity: 0, y: 20 });

  // Initial animations when page loads
  const tl = gsap.timeline();

  // Animate navigation
  tl.to("nav", {
    y: 0,
    opacity: 1,
    duration: 0.8,
    ease: "expoScale",
  });

  // Animate hero content
  tl.to(
    ".hero_content h1",
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
    },
    "-=0.5"
  );

  tl.to(
    ".hero_content p",
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
    },
    "-=0.7"
  );

  tl.to(
    ".hero_content button",
    {
      y: 0,
      opacity: 1,
      duration: 1,
      ease: "power4.out",
    },
    "-=0.7"
  );

  // Animate nav links
  gsap.to(".nav-links li", {
    opacity: 1,
    y: 0,
    duration: 1,
    stagger: 0.2,
    ease: "power4.out",
  });

  // Animate resume button
  gsap.to(".nav-resume", {
    opacity: 1,
    y: 0,
    duration: 1,
    ease: "power4.out",
  });

  

//   Optional: Add scroll-triggered animations
  // Example: Fade in elements as they come into view
  gsap.utils.toArray(".hero_section, .nav-container").forEach((section) => {
    gsap.from(section, {
      scrollTrigger: {
        trigger: section,
        start: "top center",
        toggleActions: "play none none reverse",
      },
      opacity: 0.5, // Start at 0.5 opacity instead of 0
      y: 50,
      duration: 1,
      ease: "power4.out",
    });
  });
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
  }, 1000); // Check after 1 second
});
