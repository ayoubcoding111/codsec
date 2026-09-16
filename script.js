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
    .querySelectorAll('.animate-words, [data-animate="fade-up"], .reveal-left, .reveal-right, .stack .panel, .marquee-band')
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
    .querySelectorAll('.animate-words, [data-animate="fade-up"], .reveal-left, .reveal-right')
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
  // Detail pages have no #hero-content — they should look like the
  // blurred inner pages (About / Projects), so force the blurred bg.
  if (!heroContent) {
    document.body.classList.add("is-blur-bg");
    return;
  }
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
    // Desktop (fine pointer): click opens the detail page when data-details-href exists.
    gallery.setAttribute("tabindex", "0");
    gallery.setAttribute("role", "button");
    gallery.setAttribute("aria-label", "Project screenshots — activate to view next");
    gallery.addEventListener("click", () => {
      const detailsHref = gallery.getAttribute("data-details-href");
      const finePointer = window.matchMedia("(hover: hover) and (pointer: fine)").matches;
      if (detailsHref && finePointer) {
        window.location.href = detailsHref;
        return;
      }
      preload();
      show(index + 1);
      // Brief cycling class so tap also gets the zoom + dot fill.
      gallery.classList.add("is-cycling");
      window.clearTimeout(gallery.__tapT);
      gallery.__tapT = window.setTimeout(() => {
        if (!timer) gallery.classList.remove("is-cycling");
      }, HOVER_MS);
    });
    gallery.addEventListener("keydown", (e) => {
      const detailsHref = gallery.getAttribute("data-details-href");
      if (!detailsHref) return;
      if (e.key === "Enter") window.location.href = detailsHref;
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
  const hoverSel = "a, button, .service, .process-step, .skill, .project-visual.gallery, .team-card";
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

/* --------------------------------------------------------------------------
 * Project detail README: live fetch from GitHub raw, 24h localStorage cache,
 * marked + DOMPurify render, relative-image rewrite, offline fallback.
 * Usage: <div id="readme" data-readme-repo="owner/repo" data-readme-branch="main">
 * ------------------------------------------------------------------------ */
(function initProjectReadme() {
  const container = document.getElementById("readme");
  if (!container) return;
  const repo = container.getAttribute("data-readme-repo");
  if (!repo) return;
  const branch = container.getAttribute("data-readme-branch") || "main";
  const status = document.getElementById("readme-status");
  const fallback = document.getElementById("readme-fallback");
  const refreshBtn = document.getElementById("readme-refresh");
  const toggleBtn = document.getElementById("readme-toggle");
  const wrap = document.getElementById("readme-wrap");
  const rawUrl = `https://raw.githubusercontent.com/${repo}/${branch}/README.md`;
  const repoBase = `https://raw.githubusercontent.com/${repo}/${branch}/`;
  const cacheKey = `readme-cache:${repo}:${branch}`;
  const CACHE_MS = 24 * 60 * 60 * 1000;

  const setStatus = (msg) => {
    if (status) status.textContent = msg;
  };

  const showFallback = () => {
    if (fallback) fallback.hidden = false;
  };

  const fixRelativeImages = (root) => {
    root.querySelectorAll("img").forEach((img) => {
      const src = img.getAttribute("src") || "";
      if (!src || /^(https?:|data:|blob:|#)/i.test(src)) return;
      const clean = src.replace(/^\.\//, "");
      try {
        img.src = new URL(clean, repoBase).href;
      } catch {
        img.src = repoBase + clean;
      }
      img.loading = "lazy";
      img.onerror = () => img.remove();
    });
    root.querySelectorAll('a[href]').forEach((a) => {
      const href = a.getAttribute("href") || "";
      if (!href || /^(https?:|mailto:|#)/i.test(href)) return;
      if (/^[^/]+\.(png|jpe?g|gif|webp|svg|mp4)$/i.test(href) || href.startsWith("screenshots/") || href.startsWith("imgs/")) {
        a.href = new URL(href.replace(/^\.\//, ""), repoBase).href;
      } else if (!href.startsWith(".")) {
        a.href = `https://github.com/${repo}/blob/${branch}/${href.replace(/^\//, "")}`;
      }
    });
  };

  const renderMarkdown = (md) => {
    let html = md;
    if (window.marked) {
      html = typeof window.marked.parse === "function" ? window.marked.parse(md) : window.marked(md);
    } else {
      html = `<pre>${md.replace(/[<>&]/g, (c) => ({ "<": "&lt;", ">": "&gt;", "&": "&amp;" }[c]))}</pre>`;
    }
    if (window.DOMPurify) html = window.DOMPurify.sanitize(html);
    container.innerHTML = html;
    fixRelativeImages(container);
    if (fallback) fallback.hidden = true;
    // Show expand toggle only when content overflows the collapsed height.
    if (toggleBtn && wrap) {
      const overflowing = container.scrollHeight > 660;
      toggleBtn.hidden = !overflowing;
      if (!overflowing) wrap.classList.remove("collapsed");
    }
  };

  const load = async (force) => {
    setStatus(force ? "Refreshing…" : "Loading…");
    if (!force) {
      try {
        const cached = JSON.parse(localStorage.getItem(cacheKey) || "null");
        if (cached && Date.now() - cached.time < CACHE_MS && cached.md) {
          renderMarkdown(cached.md);
          setStatus(`Live from GitHub · cached ${new Date(cached.time).toLocaleDateString()}`);
          // Refresh in background without blocking.
          fetch(rawUrl).then((r) => (r.ok ? r.text() : "")).then((md) => {
            if (md) localStorage.setItem(cacheKey, JSON.stringify({ time: Date.now(), md }));
          }).catch(() => {});
          return;
        }
      } catch {
        // ignore cache errors
      }
    }
    try {
      const res = await fetch(rawUrl);
      if (!res.ok) throw new Error(`HTTP ${res.status}`);
      const md = await res.text();
      try {
        localStorage.setItem(cacheKey, JSON.stringify({ time: Date.now(), md }));
      } catch {
        // storage full/blocked — still render
      }
      renderMarkdown(md);
      setStatus("Live from GitHub · just updated");
    } catch (err) {
      setStatus("Offline or rate-limited — showing snapshot");
      showFallback();
      const loading = container.querySelector(".readme-loading");
      if (loading) loading.textContent = "Live README unavailable. Snapshot below.";
    }
  };

  if (refreshBtn) refreshBtn.addEventListener("click", () => {
    try { localStorage.removeItem(cacheKey); } catch { /* ignore */ }
    load(true);
  });

  if (toggleBtn && wrap) toggleBtn.addEventListener("click", () => {
    const collapsed = wrap.classList.toggle("collapsed");
    toggleBtn.textContent = collapsed ? "Show more ↓" : "Show less ↑";
  });

  load(false);
})();

/* --------------------------------------------------------------------------
 * About — Meet the Team flip cards (migrated from cards.html)
 * Renders into #team-grid; hover flips on desktop, tap/Enter/Space on touch.
 * ------------------------------------------------------------------------ */
(function initTeamGrid() {
  const grid = document.getElementById("team-grid");
  if (!grid) return;

  const team = [
    {
      name: "Ayoub El Idrissi",
      role: "Lead Secure Web Developer",
      focus: "Threat Modeling & AppSec",
      bio: "Designs secure architectures and leads code audits across the stack.",
      skills: ["OWASP", "Auth", "CSP", "Pen Testing"],
      location: "Casablanca",
      years: "8y",
    },
    {
      name: "Sara Bennani",
      role: "Application Security Engineer",
      focus: "Vulnerability Research",
      bio: "Hunts for vulnerabilities and hardens APIs before they ship.",
      skills: ["SAST/DAST", "Node.js", "JWT", "Fuzzing"],
      location: "Rabat",
      years: "5y",
    },
    {
      name: "Youssef Alami",
      role: "Frontend Security Developer",
      focus: "Client-side Hardening",
      bio: "Builds accessible UIs that resist XSS, CSRF, and injection.",
      skills: ["React", "CSP", "Sanitization", "TypeScript"],
      location: "Marrakesh",
      years: "6y",
    },
    {
      name: "Imane Tazi",
      role: "DevSecOps Engineer",
      focus: "CI/CD & Secrets",
      bio: "Automates security scans and secret management in pipelines.",
      skills: ["Docker", "Vault", "GitHub Actions", "IaC"],
      location: "Tangier",
      years: "7y",
    },
    {
      name: "Omar Fassi",
      role: "Backend Security Developer",
      focus: "Secure APIs & Data",
      bio: "Implements zero-trust services and encrypted data flows.",
      skills: ["Postgres", "OAuth2", "Rate Limiting", "Go"],
      location: "Fez",
      years: "9y",
    },
    {
      name: "Nadia Chraibi",
      role: "Security QA Engineer",
      focus: "Testing & Compliance",
      bio: "Validates controls and drives GDPR / SOC 2 readiness.",
      skills: ["Playwright", "Audits", "GDPR", "Threat Cases"],
      location: "Agadir",
      years: "4y",
    },
  ];

  const initials = (n) =>
    n
      .split(" ")
      .map((w) => w[0])
      .join("")
      .slice(0, 2)
      .toUpperCase();

  const shieldSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" width="14" height="14"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10"/><path d="m9 12 2 2 4-4"/></svg>`;
  const pinSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z"/><circle cx="12" cy="10" r="3"/></svg>`;
  const clockSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="13" height="13"><circle cx="12" cy="12" r="10"/><path d="M12 6v6l4 2"/></svg>`;
  const githubSVG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20"><path d="M12 .5C5.65.5.5 5.65.5 12c0 5.08 3.29 9.39 7.86 10.91.58.11.79-.25.79-.55 0-.27-.01-1.17-.02-2.12-3.2.7-3.88-1.36-3.88-1.36-.52-1.33-1.28-1.68-1.28-1.68-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.19 1.76 1.19 1.03 1.76 2.7 1.25 3.36.96.1-.75.4-1.25.72-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.19-3.09-.12-.29-.52-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11.1 11.1 0 0 1 5.8 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.23 2.76.11 3.05.74.81 1.19 1.83 1.19 3.09 0 4.42-2.7 5.39-5.27 5.68.41.35.77 1.05.77 2.12 0 1.53-.01 2.76-.01 3.14 0 .3.2.67.8.55A11.51 11.51 0 0 0 23.5 12C23.5 5.65 18.35.5 12 .5Z"/></svg>`;
  const instagramSVG = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true" width="20" height="20"><rect x="2.5" y="2.5" width="19" height="19" rx="5.5" /><circle cx="12" cy="12" r="4.2" /><circle cx="17.6" cy="6.4" r="1.3" fill="currentColor" stroke="none" /></svg>`;
  const linkedinSVG = `<svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" width="20" height="20"><path d="M20.45 20.45h-3.55v-5.57c0-1.33-.03-3.04-1.85-3.04-1.86 0-2.14 1.45-2.14 2.94v5.67H9.35V9h3.41v1.56h.05c.47-.9 1.63-1.85 3.36-1.85 3.6 0 4.27 2.37 4.27 5.46v6.28ZM5.34 7.43a2.06 2.06 0 1 1 0-4.12 2.06 2.06 0 0 1 0 4.12ZM7.12 20.45H3.56V9h3.56v11.45Z"/></svg>`;

  team.forEach((m) => {
    const card = document.createElement("div");
    card.className = "team-card";
    card.setAttribute("tabindex", "0");
    card.setAttribute("role", "button");
    card.setAttribute(
      "aria-label",
      `${m.name}, ${m.role}. Activate to see details.`
    );

    card.innerHTML = `
      <div class="team-card-inner">
        <div class="team-face team-front">
          <div class="team-avatar">${initials(m.name)}<span class="team-shield">${shieldSVG}</span></div>
          <div class="team-name">${m.name}</div>
          <div class="team-role">${m.role}</div>
          <div class="team-hint">Hover or tap for more</div>
        </div>
        <div class="team-face team-back">
          <div class="team-back-role">${m.focus}</div>
          <div class="team-back-name">${m.name}</div>
          <p class="team-bio">${m.bio}</p>
          <div class="team-tags">${m.skills.map((s) => `<span class="team-tag">${s}</span>`).join("")}</div>
          <div class="team-meta">
            <span>${pinSVG}${m.location}</span>
            <span>${clockSVG}${m.years} exp</span>
          </div>
          <div class="team-socials">
            <a href="https://github.com/" target="_blank" rel="noopener" aria-label="${m.name} GitHub">${githubSVG}</a>
            <a href="https://www.linkedin.com/" target="_blank" rel="noopener" aria-label="${m.name} LinkedIn">${linkedinSVG}</a>
            <a href="https://instagram.com/" target="_blank" rel="noopener" aria-label="${m.name} Instagram">${instagramSVG}</a>
          </div>
        </div>
      </div>`;

    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      card.classList.toggle("flipped");
    });
    card.addEventListener("keydown", (e) => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        card.classList.toggle("flipped");
      }
    });

    grid.appendChild(card);
  });
})();
