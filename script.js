/**
 * Portfolio interactions:
 *  - GLOBAL word-by-word staggered entrance (any [data-animate-words],
 *    triggered by IntersectionObserver when scrolled into view)
 *  - generic [data-animate="fade-up"] reveals
 *  - hero exit animation (hero fades/lifts away on scroll)
 *  - nav blur once scrolled past the top
 *  - mobile menu open/close
 *  - skills marquee duplication for a seamless left->right loop
 *  - seamless boomerang video background (see bottom section)
 */

/* --------------------------------------------------------------------------
 * Global animated words
 * ------------------------------------------------------------------------ */

/**
 * Split text into words and stagger a fade/slide-up entrance across them.
 * Returns a DocumentFragment of spans; spacing uses non-breaking spaces so
 * words never wrap inside a span.
 */
function buildAnimatedWords(text, baseDelay, stagger) {
  const frag = document.createDocumentFragment();
  const words = text.split(" ");
  words.forEach((word, i) => {
    const span = document.createElement("span");
    span.className = "word";
    span.style.animationDelay = `${baseDelay + i * stagger}s`;
    span.textContent = word;
    if (i !== words.length - 1) span.appendChild(document.createTextNode("\u00A0"));
    frag.appendChild(span);
  });
  return frag;
}

// Build spans for every global animated-words target from its data attrs.
document.querySelectorAll(".animate-words[data-animate-words]").forEach((el) => {
  if (el.childElementCount > 0) return; // already built
  const text = el.getAttribute("data-animate-words") || el.textContent || "";
  const base = parseFloat(el.getAttribute("data-base-delay") || "0.1");
  const stagger = parseFloat(el.getAttribute("data-stagger") || "0.05");
  el.appendChild(buildAnimatedWords(text.trim(), base, stagger));
});

const reduceMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

/* --------------------------------------------------------------------------
 * Fancy buttery smooth scroll (Lenis). Skipped for reduced-motion and
 * when the CDN fails — the site stays fully native then.
 * ------------------------------------------------------------------------ */
function smoothToEl(el, center) {
  if (!el) return;
  if (window.__lenis) {
    const opts = { duration: 1.5 };
    if (center) {
      opts.offset = -(
        window.innerHeight / 2 -
        el.getBoundingClientRect().height / 2
      );
    }
    window.__lenis.scrollTo(el, opts);
  } else {
    el.scrollIntoView({
      behavior: reduceMotion ? "auto" : "smooth",
      block: center ? "center" : "start",
    });
  }
}

if (!reduceMotion && typeof Lenis !== "undefined") {
  const lenis = new Lenis({ lerp: 0.09, smoothWheel: true });
  window.__lenis = lenis;
  const lenisRaf = (time) => {
    lenis.raf(time);
    requestAnimationFrame(lenisRaf);
  };
  requestAnimationFrame(lenisRaf);
}

// Same-page anchors glide through Lenis when it's active.
document.querySelectorAll('a[href^="#"]').forEach((a) => {
  if (a.hasAttribute("data-close-menu")) return; // handled by menu code
  a.addEventListener("click", (e) => {
    const hash = a.getAttribute("href");
    if (!hash || hash.length < 2 || !window.__lenis) return;
    const target = document.querySelector(hash);
    if (!target) return;
    e.preventDefault();
    smoothToEl(target, false);
  });
});

if (reduceMotion) {
  // Show everything immediately, no scroll choreography.
  document
    .querySelectorAll('.animate-words, [data-animate="fade-up"], .stack .panel, .marquee-band')
    .forEach((el) => el.classList.add("in-view"));
} else {
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        // Fires once per element, hero included.
        revealObserver.unobserve(el);
        // Service cards and project cards glide in staggered,
        // one after another.
        const group = ["project-card", "project-row", "service"].find((c) =>
          el.classList.contains(c)
        );
        if (group && el.parentElement) {
          const cards = Array.from(el.parentElement.children).filter((c) =>
            c.classList.contains(group)
          );
          const i = Math.max(0, cards.indexOf(el));
          setTimeout(() => el.classList.add("in-view"), i * 220);
        } else {
          el.classList.add("in-view");
        }
      });
    },
    { threshold: 0.3, rootMargin: "0px 0px -8% 0px" }
  );

  document
    .querySelectorAll('.animate-words, [data-animate="fade-up"]')
    .forEach((el) => revealObserver.observe(el));

  // Section-by-section reveal: each panel + the marquee band fades/slides
  // in one by one as it enters the viewport (fires once per section).
  const panelRevealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("in-view");
          panelRevealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: "0px 0px -5% 0px" }
  );

  document
    .querySelectorAll(".stack .panel:not(.in-view), .marquee-band")
    .forEach((el) => panelRevealObserver.observe(el));
}

/* --------------------------------------------------------------------------
 * Mobile menu
 * ------------------------------------------------------------------------ */

const menuToggle = document.getElementById("menu-toggle");
const mobileMenu = document.getElementById("mobile-menu");
const iconOpen = document.getElementById("icon-open");
const iconClose = document.getElementById("icon-close");

function setMenuOpen(open) {
  if (!mobileMenu) return;
  mobileMenu.classList.toggle("is-open", open);
  if (iconOpen) iconOpen.classList.toggle("hidden", open);
  if (iconClose) iconClose.classList.toggle("hidden", !open);
  if (menuToggle) {
    menuToggle.setAttribute("aria-expanded", String(open));
    menuToggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
  }
  document.body.style.overflow = open ? "hidden" : "";
  if (window.__lenis) {
    if (open) window.__lenis.stop();
    else window.__lenis.start();
  }
}

if (menuToggle && mobileMenu) {
  menuToggle.addEventListener("click", (e) => {
    e.preventDefault();
    setMenuOpen(!mobileMenu.classList.contains("is-open"));
  });

  // Close buttons and menu links carry data-close-menu.
  // Anchor links still navigate to their section after closing.
  mobileMenu.querySelectorAll("[data-close-menu]").forEach((el) => {
    el.addEventListener("click", (e) => {
      const href = el.getAttribute("href");
      setMenuOpen(false);
      if (href && href.startsWith("#") && href.length > 1) {
        e.preventDefault();
        const target = document.querySelector(href);
        // Wait a tick for the overlay to hide, then glide.
        setTimeout(() => {
          smoothToEl(target, false);
        }, 60);
      } else if (el.tagName === "A") {
        e.preventDefault();
      }
    });
  });

  // Reset state if the viewport grows past the mobile breakpoint.
  window.addEventListener("resize", () => {
    if (window.innerWidth >= 768) setMenuOpen(false);
  });
}

/* --------------------------------------------------------------------------
 * Hero exit + nav blur (purely visual — scrolling itself stays native)
 * ------------------------------------------------------------------------ */

const panels = Array.from(document.querySelectorAll(".panel"));
const heroContent = document.getElementById("hero-content");
const scrollHint = document.querySelector(".scroll-hint");

function updateHeroExit() {
  if (!heroContent) return;
  // Once ~25% of the viewport is scrolled, hero lifts away.
  // Scrolling back up removes the class so the hero re-appears.
  const progress = window.scrollY / Math.max(1, window.innerHeight);
  const exiting = progress > 0.22;
  heroContent.classList.toggle("is-exiting", exiting);
  // Same moment: the fixed video blurs into the moving backdrop for
  // all other pages (see body.is-blur-bg .bg-media in styles.css).
  document.body.classList.toggle("is-blur-bg", exiting);
  if (scrollHint) scrollHint.style.opacity = exiting ? "0" : "1";
}

window.addEventListener("scroll", updateHeroExit, { passive: true });
updateHeroExit();

// Nav blur: keep the bar as-is over the hero, turn it blurry once the
// user scrolls down. Removing the class on scroll-up restores the hero look.
function updateNavBlur() {
  document.body.classList.toggle("is-scrolled", window.scrollY > 40);
}

window.addEventListener("scroll", updateNavBlur, { passive: true });
updateNavBlur();

// Active nav-link highlight: position-based spy, so even very tall
// sections (like the Process timeline) highlight correctly.
const navLinks = Array.from(document.querySelectorAll(".nav-link"));
let spyTicking = false;
function updateActiveNav() {
  spyTicking = false;
  if (!navLinks.length || !panels.length) return;
  const line = window.innerHeight * 0.4;
  let current = panels[0];
  panels.forEach((p) => {
    if (p.getBoundingClientRect().top <= line) current = p;
  });
  const id = `#${current.id}`;
  navLinks.forEach((a) =>
    a.classList.toggle("is-active", a.getAttribute("href") === id)
  );
}
function requestActiveNav() {
  if (spyTicking) return;
  spyTicking = true;
  requestAnimationFrame(updateActiveNav);
}
window.addEventListener("scroll", requestActiveNav, { passive: true });
window.addEventListener("resize", requestActiveNav);
updateActiveNav();

/* --------------------------------------------------------------------------
 * Process timeline: glowing rail fills with scroll, steps slide in and
 * light up one by one (dot + title + tagline highlight the active step)
 * ------------------------------------------------------------------------ */
const processTimeline = document.getElementById("process-timeline");
const processRailFill = document.getElementById("process-rail-progress");
const processSteps = Array.from(document.querySelectorAll(".process-step"));

if (reduceMotion) {
  if (processRailFill) processRailFill.style.transform = "scaleY(1)";
  processSteps.forEach((s) => s.classList.add("in-view", "is-active"));
} else {
  // Rail progress: 0 when the timeline top hits viewport center,
  // 1 when its bottom reaches the viewport bottom.
  let railTicking = false;
  const updateRail = () => {
    railTicking = false;
    if (!processTimeline || !processRailFill) return;
    const rect = processTimeline.getBoundingClientRect();
    const vh = window.innerHeight;
    const p = (vh * 0.5 - rect.top) / Math.max(1, rect.height - vh * 0.5);
    processRailFill.style.transform = `scaleY(${Math.min(1, Math.max(0, p))})`;
  };
  const requestRail = () => {
    if (railTicking) return;
    railTicking = true;
    requestAnimationFrame(updateRail);
  };
  window.addEventListener("scroll", requestRail, { passive: true });
  window.addEventListener("resize", requestRail);
  updateRail();

  // Steps: slide in once, highlight while centered in view.
  if ("IntersectionObserver" in window && processSteps.length) {
    const stepObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("in-view", "is-active");
          } else {
            entry.target.classList.remove("is-active");
          }
        });
      },
      { threshold: 0.5 }
    );
    processSteps.forEach((s) => stepObserver.observe(s));
  } else {
    processSteps.forEach((s) => s.classList.add("in-view", "is-active"));
  }
}

// Timeline dots jump straight to their step.
document.querySelectorAll(".process-dot").forEach((btn) => {
  btn.addEventListener("click", () => {
    smoothToEl(document.getElementById(btn.getAttribute("data-scroll-to")), true);
  });
});

/* --------------------------------------------------------------------------
 * Skills marquee: duplicate content once for a seamless -50% -> 0 loop
 * ------------------------------------------------------------------------ */
const skillsTrack = document.getElementById("skills-track");
if (skillsTrack && !skillsTrack.dataset.cloned) {
  skillsTrack.dataset.cloned = "true";
  skillsTrack.innerHTML += skillsTrack.innerHTML;
}

/* --------------------------------------------------------------------------
 * About stat counters: count up once when scrolled into view
 * ------------------------------------------------------------------------ */
const counters = document.querySelectorAll("[data-count]");
if (counters.length && !reduceMotion && "IntersectionObserver" in window) {
  const counterObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        counterObserver.unobserve(el);
        const end = parseFloat(el.getAttribute("data-count")) || 0;
        const duration = 1500;
        const started = performance.now();
        const tick = (now) => {
          const p = Math.min(1, (now - started) / duration);
          const eased = 1 - Math.pow(1 - p, 3);
          el.textContent = String(Math.round(end * eased));
          if (p < 1) requestAnimationFrame(tick);
        };
        requestAnimationFrame(tick);
      });
    },
    { threshold: 0.6 }
  );
  counters.forEach((el) => counterObserver.observe(el));
}

/* --------------------------------------------------------------------------
 * Boomerang video background
 * ------------------------------------------------------------------------ */

const video = document.getElementById("hero-video");
const canvas = document.getElementById("hero-canvas");

if (video && canvas) {
  const frames = [];
  const MAX_WIDTH = 960;
  const MAX_FRAMES = 450; // ~15s at 30fps, caps memory on long clips

  let capturing = true;
  let lastTime = -1;
  let loopStarted = false;
  let rafId = 0;
  let vfcId = 0;
  let renderRaf = 0;

  const captureFrame = () => {
    if (!capturing || video.readyState < 2) return;
    if (video.currentTime === lastTime) return;
    lastTime = video.currentTime;
    const vw = video.videoWidth;
    const vh = video.videoHeight;
    if (!vw || !vh || frames.length >= MAX_FRAMES) return;
    const scale = Math.min(1, MAX_WIDTH / vw);
    const w = Math.max(2, Math.round(vw * scale));
    const h = Math.max(2, Math.round(vh * scale));
    const c = document.createElement("canvas");
    c.width = w;
    c.height = h;
    const ctx = c.getContext("2d");
    if (!ctx) return;
    try {
      ctx.drawImage(video, 0, 0, w, h);
    } catch {
      return;
    }
    frames.push(c);
  };

  const hasVFC = typeof video.requestVideoFrameCallback === "function";

  const rafLoop = () => {
    captureFrame();
    if (capturing) rafId = requestAnimationFrame(rafLoop);
  };

  const vfcLoop = () => {
    captureFrame();
    if (capturing && typeof video.requestVideoFrameCallback === "function") {
      vfcId = video.requestVideoFrameCallback(vfcLoop);
    }
  };

  const startCaptureLoop = () => {
    if (loopStarted) return;
    loopStarted = true;
    if (hasVFC) {
      try {
        vfcId = video.requestVideoFrameCallback(vfcLoop);
        return;
      } catch {
        // fall through to rAF
      }
    }
    rafId = requestAnimationFrame(rafLoop);
  };

  const startBoomerangLoop = () => {
    const ctx = canvas.getContext("2d");
    if (!ctx || frames.length === 0) return;

    if (frames.length === 1) {
      canvas.width = frames[0].width;
      canvas.height = frames[0].height;
      try {
        ctx.drawImage(frames[0], 0, 0);
      } catch {
        // ignore
      }
      canvas.classList.add("is-live");
      return;
    }

    canvas.width = frames[0].width;
    canvas.height = frames[0].height;
    // Start on the LAST frame going backward: the video just ended there, so
    // the first boomerang loop reverses instead of jumping to the start.
    const lastIdx = frames.length - 1;
    try {
      ctx.drawImage(frames[lastIdx], 0, 0);
    } catch {
      // ignore
    }
    // Canvas already holds the handoff frame before the video hides —
    // no blank frame, no blink.
    canvas.classList.add("is-live");

    let index = Math.max(0, lastIdx - 1);
    let dir = -1;
    let last = performance.now();
    const interval = 1000 / 30;

    const render = (now) => {
      renderRaf = requestAnimationFrame(render);
      if (now - last < interval) return;
      last = now;
      try {
        ctx.drawImage(frames[index], 0, 0);
      } catch {
        return;
      }
      // Bounce without repeating end frames, so there's no 1-frame pause.
      if (dir > 0) {
        if (index >= frames.length - 1) {
          dir = -1;
          index = frames.length - 2;
        } else {
          index += 1;
        }
      } else {
        if (index <= 0) {
          dir = 1;
          index = 1;
        } else {
          index -= 1;
        }
      }
    };
    renderRaf = requestAnimationFrame(render);
  };

  const onEnded = () => {
    capturing = false;
    if (frames.length > 0) {
      video.style.display = "none";
      startBoomerangLoop();
    } else {
      // Capture failed: fall back to a plain restart so we never freeze.
      try {
        video.currentTime = 0;
        video.play().catch(() => {});
      } catch {
        // ignore
      }
      capturing = true;
      lastTime = -1;
      startCaptureLoop();
    }
  };

  const onCanPlay = () => {
    video.classList.add("is-visible");
    if (loopStarted) return;
    // Restart from 0 (only once — `canplay` fires repeatedly) so the capture
    // covers the FULL clip.
    try {
      if (video.currentTime > 0.1) video.currentTime = 0;
    } catch {
      // ignore
    }
    lastTime = -1;
    video.play().catch(() => {});
    startCaptureLoop();
  };

  const onError = () => {
    capturing = false;
  };

  video.addEventListener("canplay", onCanPlay);
  video.addEventListener("ended", onEnded);
  video.addEventListener("error", onError);
  if (video.readyState >= 3) onCanPlay();

  window.addEventListener("pagehide", () => {
    capturing = false;
    cancelAnimationFrame(rafId);
    cancelAnimationFrame(renderRaf);
    try {
      if (hasVFC && typeof video.cancelVideoFrameCallback === "function" && vfcId) {
        video.cancelVideoFrameCallback(vfcId);
      }
    } catch {
      // ignore
    }
  });
}

/* --------------------------------------------------------------------------
 * Project galleries: hero pic by default, hover cycles the rest one by one
 * with a smooth crossfade. Touch: tap advances, slow autoplay while in view.
 * ------------------------------------------------------------------------ */
(function initProjectGalleries() {
  const galleries = Array.from(document.querySelectorAll("[data-gallery]"));
  if (!galleries.length) return;

  const HOVER_MS = 1100;
  const TOUCH_MS = 2000;
  const canHover = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const coarsePointer = window.matchMedia("(hover: none), (pointer: coarse)").matches;

  galleries.forEach((gallery) => {
    const imgs = Array.from(gallery.querySelectorAll(".gallery-img"));
    const dots = Array.from(gallery.querySelectorAll(".gallery-dot"));
    const count = gallery.querySelector(".gallery-count");
    if (imgs.length < 2) return;

    let index = 0;
    let timer = 0;
    let preloaded = false;

    const show = (next) => {
      index = (next + imgs.length) % imgs.length;
      imgs.forEach((img, i) => img.classList.toggle("is-active", i === index));
      dots.forEach((dot, i) => dot.classList.toggle("is-active", i === index));
      if (count) count.textContent = `${index + 1} / ${imgs.length}`;
      // Restart dot fill animation so it matches the current slide.
      gallery.classList.remove("is-cycling");
      void gallery.offsetWidth;
      if (timer) gallery.classList.add("is-cycling");
    };

    const preload = () => {
      if (preloaded) return;
      preloaded = true;
      imgs.forEach((img) => {
        const src = img.getAttribute("src");
        if (src) {
          const probe = new Image();
          probe.src = src;
        }
      });
    };

    const stop = (reset) => {
      window.clearInterval(timer);
      timer = 0;
      gallery.classList.remove("is-cycling");
      if (reset) show(0);
    };

    const start = (ms) => {
      if (reduceMotion || timer) return;
      preload();
      gallery.classList.add("is-cycling");
      // Re-trigger dot fill for the current slide.
      const activeDot = dots[index];
      if (activeDot) {
        activeDot.classList.remove("is-active");
        void gallery.offsetWidth;
        activeDot.classList.add("is-active");
      }
      timer = window.setInterval(() => show(index + 1), ms);
    };

    if (canHover) {
      gallery.addEventListener("mouseenter", () => start(HOVER_MS));
      gallery.addEventListener("mouseleave", () => stop(true));
      gallery.addEventListener("focusin", () => start(HOVER_MS));
      gallery.addEventListener("focusout", () => stop(true));
    }

    // Touch fallback: tap steps through pics one by one.
    gallery.setAttribute("tabindex", "0");
    gallery.setAttribute("role", "button");
    gallery.setAttribute("aria-label", "Project screenshots — activate to view next");
    gallery.addEventListener("click", () => {
      preload();
      show(index + 1);
      // Brief cycling class so tap also gets the zoom + dot fill.
      gallery.classList.add("is-cycling");
      window.clearTimeout(gallery.__tapT);
      gallery.__tapT = window.setTimeout(() => {
        if (!timer) gallery.classList.remove("is-cycling");
      }, HOVER_MS);
    });

    // Slow autoplay on touch devices only while the card is visible.
    if (coarsePointer && !reduceMotion && "IntersectionObserver" in window) {
      const autoObserver = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) start(TOUCH_MS);
            else stop(false);
          });
        },
        { threshold: 0.45 }
      );
      autoObserver.observe(gallery);
    }

    show(0);
  });
})();

/* --------------------------------------------------------------------------
 * Custom smooth cursor: fast dot + lerped trailing ring, scroll-aware
 * ------------------------------------------------------------------------ */
(function initCustomCursor() {
  if (reduceMotion) return;
  const fine = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
  const dot = document.getElementById("cursor-dot");
  const ring = document.getElementById("cursor-ring");
  if (!fine || !dot || !ring) return;

  document.documentElement.classList.add("has-custom-cursor");

  let mx = window.innerWidth / 2;
  let my = window.innerHeight / 2;
  let rx = mx;
  let ry = my;
  let dx = mx;
  let dy = my;
  let visible = false;
  let raf = 0;

  const render = () => {
    // Dot follows almost instantly, ring trails with lerp for smoothness.
    dx += (mx - dx) * 0.35;
    dy += (my - dy) * 0.35;
    rx += (mx - rx) * 0.16;
    ry += (my - ry) * 0.16;
    dot.style.transform = `translate(${dx - 4}px, ${dy - 4}px)`;
    const half = ring.offsetWidth / 2 || 19;
    ring.style.transform = `translate(${rx - half}px, ${ry - half}px)`;
    raf = requestAnimationFrame(render);
  };

  window.addEventListener(
    "mousemove",
    (e) => {
      mx = e.clientX;
      my = e.clientY;
      if (!visible) {
        visible = true;
        dot.style.opacity = "1";
        ring.style.opacity = "1";
        raf = requestAnimationFrame(render);
      }
    },
    { passive: true }
  );

  document.addEventListener("mouseleave", () => {
    visible = false;
    cancelAnimationFrame(raf);
    dot.style.opacity = "0";
    ring.style.opacity = "0";
  });

  // Grow on interactive hover.
  const hoverSel = "a, button, .service, .process-step, .skill, .project-visual.gallery";
  document.addEventListener("mouseover", (e) => {
    if (e.target.closest(hoverSel)) document.body.classList.add("cursor-hover");
  });
  document.addEventListener("mouseout", (e) => {
    if (e.target.closest(hoverSel)) document.body.classList.remove("cursor-hover");
  });

  // Modern scroll state: ring expands while scrolling, relaxes when idle.
  let scrollTimer = 0;
  const onScroll = () => {
    document.body.classList.add("is-scrolling");
    window.clearTimeout(scrollTimer);
    scrollTimer = window.setTimeout(() => {
      document.body.classList.remove("is-scrolling");
    }, 160);
  };
  window.addEventListener("scroll", onScroll, { passive: true });
  window.addEventListener("wheel", onScroll, { passive: true });
})();
