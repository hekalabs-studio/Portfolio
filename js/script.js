// Toggle mobile menu
const btnMenu = document.getElementById('btn-menu');
const nav = document.getElementById('main-nav');
const showCertificates = document.getElementById("showCertificates");
btnMenu.addEventListener('click', () => {
  nav.classList.toggle('open');
  btnMenu.classList.toggle('active');
});

// Close nav when link clicked (mobile)
document.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    btnMenu.classList.remove('active');
  });
});

// Smooth scroll for in-page links (offset mengikuti tinggi navbar fixed)
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 80,
        behavior: 'smooth'
      });
    }
  });
});

// Navbar: tampilkan latar kaca saat halaman digulir
const siteHeader = document.querySelector('.site-header');
function updateHeaderState() {
  if (!siteHeader) return;
  siteHeader.classList.toggle('scrolled', window.scrollY > 24);
}
window.addEventListener('scroll', updateHeaderState, { passive: true });
updateHeaderState();

// Year in footer
document.getElementById('year').textContent = new Date().getFullYear();

// Intersection Observer for animations
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

let animationDelay = 0;
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      setTimeout(() => {
        entry.target.classList.add('animate');
      }, animationDelay);
      animationDelay += 100; // Stagger delay
      if (animationDelay > 500) animationDelay = 0; // Reset after a few
    }
  });
}, observerOptions);

// Observe elements for animation
document.querySelectorAll('.section, .hero-left, .hero-right, .portfolio-item, .certificate-item, .gallery-group, .card, .test-card, .contact-form, .edu-item, .edu-stat').forEach(el => {
  observer.observe(el);
});


// Show only the first 3 items in each certificate/portfolio/gallery grid,
// with a "Show More" button to reveal the rest.
function initRevealGrids(selector, limit = 3) {
  document.querySelectorAll(selector).forEach((grid) => {
    // Skip if this grid was already initialized (e.g. observer re-run)
    if (grid.dataset.revealInit === 'true') return;

    const items = Array.from(grid.children);
    if (items.length <= limit) return; // nothing to hide, keep as-is

    grid.dataset.revealInit = 'true';

    items.forEach((item, i) => {
      if (i >= limit) item.classList.add('grid-hidden');
    });

    const wrap = document.createElement('div');
    wrap.className = 'show-more-wrap';

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'show-more-btn';
    const hiddenCount = items.length - limit;
    btn.textContent = `Show More (${hiddenCount})`;

    btn.addEventListener('click', () => {
      const expanded = grid.classList.toggle('grid-expanded');
      items.forEach((item, i) => {
        if (i >= limit) item.classList.toggle('grid-hidden', !expanded);
      });
      btn.textContent = expanded ? 'Show Less' : `Show More (${hiddenCount})`;
      if (!expanded) {
        grid.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
      }
    });

    wrap.appendChild(btn);
    grid.insertAdjacentElement('afterend', wrap);
  });
}

initRevealGrids('.certificate-grid');
/* Catatan: .certificates-container TIDAK dipakai di sini. Container itu
   berisi kartu kategori (bukan item), sehingga limit 3 membuat kategori
   ke-4 (Other Certificates) tersembunyi & tampak seperti bug. */
initRevealGrids('.portfolio-grid');
initRevealGrids('.edu-grid');

function showMessage(text, type) {
  formMessage.textContent = text;
  formMessage.classList.add(type);
  formMessage.style.display = 'block';
  setTimeout(() => {
    formMessage.style.display = 'none';
  }, 5000);
}

/* Accessibility small enhancement: allow Esc to close mobile nav */
document.addEventListener('keydown', (e) => {
  if(e.key === 'Escape'){
    nav.classList.remove('open');
    btnMenu.classList.remove('active');
  }
});

// Add loading animation for images
document.querySelectorAll('img').forEach(img => {
  img.addEventListener('load', () => {
    img.classList.add('loaded');
  });
  if (img.complete) {
    img.classList.add('loaded');
  }
});

// Scroll progress bar
window.addEventListener('scroll', () => {
  const scrollTop = window.pageYOffset;
  const docHeight = document.body.scrollHeight - window.innerHeight;
  const scrollPercent = (scrollTop / docHeight) * 100;
  document.getElementById('progress-bar').style.width = scrollPercent + '%';
});

// Typing animation for name
const typingName = document.getElementById('typing-name');
const fullText = "i'm Novemas Heka Alfarizi.";
let index = 0;

function typeWriter() {
  if (index < fullText.length) {
    typingName.innerHTML = fullText.substring(0, index + 1) + '<span class="cursor">|</span>';
    index++;
    setTimeout(typeWriter, 100); // Speed of typing
  } else {
    // After typing, keep cursor with blinking animation
    typingName.innerHTML = fullText + '<span class="cursor">|</span>';
  }
}

// Start typing animation when page loads
window.addEventListener('load', () => {
  typingName.innerHTML = ''; // Clear initial text
  typeWriter();
});

// Dark mode toggle (button is currently commented out in the HTML -
// guard so a missing element doesn't crash the rest of the script)
const darkModeToggle = document.getElementById('dark-mode-toggle');
if (darkModeToggle) {
  darkModeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-mode');
    if(document.body.classList.contains('dark-mode')){
      darkModeToggle.textContent = '☀️';
    } else {
      darkModeToggle.textContent = '🌙';
    }
  });

  // Save dark mode preference
  if(localStorage.getItem('darkMode') === 'enabled'){
    document.body.classList.add('dark-mode');
    darkModeToggle.textContent = '☀️';
  }
}


const certificateData = {
  contest: [
    'img/certificateCoding/CodingMission.webp',
    'img/certificateCoding/CodingMission_Prize.webp',
  ],
  contest1: [
    'img/certificateCoding/BOM PETRA.webp',
  ],
  hplife: ['img/certificateCoding/HP-Life_critical thingking.webp'],
  course: ['img/certificateCoding/revou_course.webp'],
  course2: ['img/certificateCoding/PelatihanLatika.webp'],
  course3: ['img/certificateCoding/CourseACodeorg.webp'],
  other1: ['img/moreCertificate/PiagamWebinarPeringatanDiniBencana.webp'],
  other2: ['img/moreCertificate/Sertifikat_antiperundungan.webp'],
  other3: ['img/moreCertificate/sertifikatOlimIPS.webp'],
};

/* ============================================================
   SCROLL LOCK - satu mekanisme untuk semua lightbox
   ------------------------------------------------------------
   Sebelumnya tiap lightbox mengunci scroll dengan caranya sendiri:
   galeri memakai inline style (body.style.overflow='hidden') dan
   sertifikat memakai class 'lightbox-open'. Karena keduanya tidak
   saling tahu, menutup satu lightbox bisa menghapus kunci milik
   lightbox lain yang masih terbuka -> halaman ikut ter-scroll
   (atau justru tetap terkunci setelah semua ditutup).

   Solusi: penghitung referensi. Setiap lightbox memanggil lock()
   saat terbuka dan unlock() saat tertutup. Kunci baru dilepas
   ketika tidak ada lagi pemakai (count kembali 0).
   ============================================================ */
let scrollLockCount = 0;

function lockBodyScroll() {
  scrollLockCount += 1;
  if (scrollLockCount !== 1) return; /* sudah terkunci oleh lightbox lain */
  document.body.classList.add('lightbox-open');
  document.body.style.overflow = 'hidden';
}

function unlockBodyScroll() {
  if (scrollLockCount === 0) return; /* tidak pernah dikunci: jangan sentuh */
  scrollLockCount -= 1;
  if (scrollLockCount !== 0) return; /* masih ada lightbox lain terbuka */
  document.body.classList.remove('lightbox-open');
  document.body.style.overflow = '';
}

/* ============================================================
   CERTIFICATE LIGHTBOX - pratinjau sertifikat ukuran besar
   - Overlay memakai #showCertificates yang selalu ter-render;
     kelas .cert-open yang menampilkan/menyembunyikannya.
   - Tutup lewat: tombol X, klik area gelap, tombol Esc, tombol Back.
   - Navigasi antar gambar dalam satu kartu: panah, klik, ArrowLeft/Right.
   ============================================================ */
(function () {
  const overlay = document.getElementById('showCertificates');
  if (!overlay) return;

  const stage = overlay.querySelector('.showImages');
  const closeBtn = overlay.querySelector('.close-lightbox');
  const prevBtn = overlay.querySelector('.cert-prev');
  const nextBtn = overlay.querySelector('.cert-next');
  const counter = overlay.querySelector('.cert-counter');

  let certList = [];
  let certIndex = 0;
  let certOpen = false;
  let lastFocused = null;
  let pushedState = false;

  function renderCertificate() {
    stage.innerHTML = '';
    certList.forEach((src, idx) => {
      const figure = document.createElement('figure');
      figure.className = 'cert-slide' + (idx === certIndex ? ' active' : '');
      const img = document.createElement('img');
      img.src = src;
      img.alt = 'Sertifikat ' + (idx + 1) + ' dari ' + certList.length;
      img.decoding = 'async';
      figure.appendChild(img);
      stage.appendChild(figure);
    });

    const many = certList.length > 1;
    stage.classList.toggle('multi', many);
    stage.classList.remove('zoom-in');
    void stage.offsetWidth; /* paksa reflow agar animasi zoom diputar ulang */
    stage.classList.add('zoom-in');

    counter.hidden = !many;
    counter.textContent = (certIndex + 1) + ' / ' + certList.length;
    prevBtn.hidden = !many;
    nextBtn.hidden = !many;

    /* Slide aktif saja yang ditampilkan (lihat .cert-slide di style.css). */
    stage.scrollLeft = 0;
  }

  function openCertificate(list, index) {
    /* Bila lightbox sudah terbuka (mis. kartu lain dipicu saat terbuka),
       cukup ganti isinya. Tanpa penjagaan ini, lockBodyScroll() dipanggil
       dua kali tanpa unlock yang sepadan sehingga scroll tetap terkunci
       selamanya setelah ditutup. */
    const wasOpen = certOpen;

    certList = list;
    certIndex = index || 0;
    lastFocused = wasOpen ? lastFocused : document.activeElement;
    certOpen = true;

    overlay.classList.add('cert-open');
    overlay.setAttribute('aria-hidden', 'false');
    if (!wasOpen) lockBodyScroll();
    renderCertificate();

    /* Tombol Back di HP ikut menutup lightbox, bukan keluar halaman.
       Hanya sekali per sesi lightbox agar riwayat tidak menumpuk. */
    if (!wasOpen) {
      try {
        history.pushState({ certLightbox: true }, '');
        pushedState = true;
      } catch (err) {
        pushedState = false;
      }
    }

    closeBtn.focus();
  }

  function closeCertificate() {
    if (!certOpen) return;
    certOpen = false;
    certList = [];
    certIndex = 0;

    overlay.classList.remove('cert-open');
    overlay.setAttribute('aria-hidden', 'true');
    stage.innerHTML = '';
    unlockBodyScroll();

    if (pushedState) {
      pushedState = false;
      history.back(); /* dibersihkan oleh handler popstate di bawah */
    }

    if (lastFocused && typeof lastFocused.focus === 'function') {
      lastFocused.focus();
    }
    lastFocused = null;
  }

  function stepCertificate(dir) {
    if (certList.length < 2) return;
    certIndex = (certIndex + dir + certList.length) % certList.length;
    renderCertificate();
  }

  /* Ditulis sebagai window.certificate karena dipanggil dari atribut
     onclick di index.html. certificate('0') = tutup lightbox. */
  window.certificate = function (key) {
    const images = certificateData[key];
    if (!images || !images.length) {
      closeCertificate();
      return false;
    }
    openCertificate(images, 0);
    return false;
  };

  /* Klik area gelap di luar gambar -> tutup */
  overlay.addEventListener('click', (e) => {
    if (e.target === overlay || e.target === stage) closeCertificate();
  });

  /* Setiap gambar sertifikat bisa diklik untuk menutup. Listener dipasang
     di stage (event delegation) karena gambar di-render ulang tiap slide. */
  stage.addEventListener('click', (e) => {
    if (e.target.tagName === 'IMG') closeCertificate();
  });

  closeBtn.addEventListener('click', (e) => {
    e.stopPropagation();
    closeCertificate();
  });
  prevBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    stepCertificate(-1);
  });
  nextBtn.addEventListener('click', (e) => {
    e.preventDefault();
    e.stopPropagation();
    stepCertificate(1);
  });

  document.addEventListener('keydown', (e) => {
    if (!certOpen) return;
    if (e.key === 'Escape') {
      e.preventDefault();
      closeCertificate();
    } else if (e.key === 'ArrowLeft') {
      stepCertificate(-1);
    } else if (e.key === 'ArrowRight') {
      stepCertificate(1);
    } else if (e.key === 'Tab') {
      /* Jaga fokus tetap di dalam dialog */
      const focusables = [closeBtn, prevBtn, nextBtn].filter((b) => !b.hidden);
      if (!focusables.length) return;
      const first = focusables[0];
      const last = focusables[focusables.length - 1];
      if (e.shiftKey && document.activeElement === first) {
        e.preventDefault();
        last.focus();
      } else if (!e.shiftKey && document.activeElement === last) {
        e.preventDefault();
        first.focus();
      }
    }
  });

  /* Tombol Back browser/HP menutup lightbox */
  window.addEventListener('popstate', () => {
    if (!certOpen) return;
    pushedState = false;
    certOpen = false;
    certList = [];
    certIndex = 0;
    overlay.classList.remove('cert-open');
    overlay.setAttribute('aria-hidden', 'true');
    stage.innerHTML = '';
    unlockBodyScroll();
    if (lastFocused && typeof lastFocused.focus === 'function') lastFocused.focus();
    lastFocused = null;
  });
})();

// Allow opening a certificate card with Enter/Space (keyboard accessibility)
document.querySelectorAll('.certificate-item[role="button"]').forEach((item) => {
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

/* ============================================================
   PORTFOLIO CAROUSEL - auto-slide + panah + titik + swipe
   Tiap .project-card yang punya lebih dari 1 slide akan
   berganti foto otomatis (jeda saat kursor berada di atas).
   ============================================================ */
(function () {
  const AUTOPLAY_MS = 3500;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  document.querySelectorAll('.project-card').forEach((card) => {
    const viewport = card.querySelector('.project-slides');
    const track = card.querySelector('.slides-track');
    const slides = Array.from(card.querySelectorAll('.project-slide'));
    const dotsWrap = card.querySelector('.slide-dots');
    if (!viewport || !track || slides.length < 2) {
      if (viewport) viewport.classList.add('single');
      return;
    }

    let current = 0;
    let timer = null;

    // Titik indikator (dibuat otomatis sesuai jumlah slide)
    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'slide-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('aria-label', 'Ke foto ' + (i + 1));
      dot.addEventListener('click', (e) => {
        e.stopPropagation();
        goTo(i);
        restart();
      });
      dotsWrap.appendChild(dot);
      return dot;
    });

    function goTo(i) {
      current = ((i % slides.length) + slides.length) % slides.length;
      track.style.transform = 'translateX(-' + current * 100 + '%)';
      dots.forEach((d, di) => d.classList.toggle('active', di === current));
    }
    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    function start() {
      if (reduceMotion || timer) return;
      timer = setInterval(next, AUTOPLAY_MS);
    }
    function stop() {
      clearInterval(timer);
      timer = null;
    }
    const restart = () => { stop(); start(); };

    const prevBtn = card.querySelector('.slide-arrow.prev');
    const nextBtn = card.querySelector('.slide-arrow.next');
    if (prevBtn) prevBtn.addEventListener('click', (e) => { e.stopPropagation(); prev(); restart(); });
    if (nextBtn) nextBtn.addEventListener('click', (e) => { e.stopPropagation(); next(); restart(); });

    // Jeda auto-slide saat kursor berada di atas gambar
    viewport.addEventListener('mouseenter', stop);
    viewport.addEventListener('mouseleave', start);

    // Swipe kiri/kanan di layar sentuh
    let touchX = null;
    viewport.addEventListener('touchstart', (e) => {
      touchX = e.touches[0].clientX;
      stop();
    }, { passive: true });
    viewport.addEventListener('touchend', (e) => {
      if (touchX === null) return;
      const dx = e.changedTouches[0].clientX - touchX;
      if (Math.abs(dx) > 40) (dx < 0 ? next : prev)();
      touchX = null;
      start();
    }, { passive: true });

    goTo(0);
    start();
  });
})();

/* ============================================================
   GALLERY SHOWCASE - carousel coverflow + Show More + lightbox
   - 4 foto pertama menjadi slide track; sisanya disembunyikan
     dan dibuka lewat tombol "Show More" (animasi pop-in).
   - Slide aktif tampil di tengah, foto tetangga "mengintip".
   - Auto-slide, panah, titik, drag/swipe (mouse & sentuh),
     keyboard, counter, progress bar, dan lightbox pratinjau.
   ============================================================ */
(function () {
  const AUTOPLAY_MS = 3800;
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
  const lightbox = document.getElementById('gallery-lightbox');
  const pauseFns = [];
  const resumeFns = [];

  /* ---------- Lightbox: pratinjau foto besar ---------- */
  let lbList = [];
  let lbIndex = 0;
  let lbOpen = false;

  function renderLightbox() {
    const slide = lbList[lbIndex];
    if (!lightbox || !slide) return;
    const img = slide.querySelector('img');
    lightbox.querySelector('.gl-figure img').src = img.src;
    lightbox.querySelector('.gl-figure img').alt = img.alt;
    lightbox.querySelector('.gl-caption').textContent = img.alt;
    lightbox.querySelector('.gl-counter').textContent = (lbIndex + 1) + ' / ' + lbList.length;
    const fig = lightbox.querySelector('.gl-figure');
    fig.classList.remove('zoom-in');
    void fig.offsetWidth; /* paksa reflow agar animasi zoom diputar ulang */
    fig.classList.add('zoom-in');
  }

  function openLightbox(slides, i) {
    if (!lightbox || !slides.length) return;
    lbList = slides;
    lbIndex = i;
    lbOpen = true;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
    lockBodyScroll();
    pauseFns.forEach((fn) => fn());
    renderLightbox();
  }

  function closeLightbox() {
    if (!lightbox || !lbOpen) return;
    lbOpen = false;
    lightbox.classList.remove('open');
    lightbox.setAttribute('aria-hidden', 'true');
    unlockBodyScroll();
    resumeFns.forEach((fn) => fn());
  }

  function lbStep(dir) {
    if (!lbList.length) return;
    lbIndex = ((lbIndex + dir) % lbList.length + lbList.length) % lbList.length;
    renderLightbox();
  }

  if (lightbox) {
    lightbox.querySelector('.close-lightbox').addEventListener('click', closeLightbox);
    lightbox.querySelector('.gl-prev').addEventListener('click', (e) => { e.stopPropagation(); lbStep(-1); });
    lightbox.querySelector('.gl-next').addEventListener('click', (e) => { e.stopPropagation(); lbStep(1); });
    lightbox.addEventListener('click', (e) => { if (e.target === lightbox) closeLightbox(); });
    document.addEventListener('keydown', (e) => {
      if (!lbOpen) return;
      if (e.key === 'Escape') closeLightbox();
      if (e.key === 'ArrowLeft') lbStep(-1);
      if (e.key === 'ArrowRight') lbStep(1);
    });
  }

  /* ---------- Carousel per grup galeri ---------- */
  document.querySelectorAll('.gallery-group').forEach((group) => {
    const carousel = group.querySelector('.gallery-carousel');
    if (!carousel) return;

    const viewport = carousel.querySelector('.gallery-viewport');
    const track = carousel.querySelector('.gallery-track');
    const slides = Array.from(track.querySelectorAll('.gallery-slide'));
    const dotsWrap = carousel.querySelector('.gallery-dots');
    const counter = carousel.querySelector('.gallery-counter');
    const progress = carousel.querySelector('.gallery-progress span');
    if (!slides.length) return;

    const visibleCount = Math.max(1, parseInt(group.dataset.visible, 10) || 4);
    const hiddenSlides = slides.slice(visibleCount);
    const hiddenCount = hiddenSlides.length;
    let current = 0;
    let timer = null;

    /* Sembunyikan foto ke-5 dst. sampai "Show More" ditekan */
    hiddenSlides.forEach((slide) => slide.classList.add('slide-hidden'));

    function setProgress(expanded) {
      const total = expanded ? slides.length : Math.min(visibleCount, slides.length);
      if (progress) progress.style.width = ((current + 1) / total) * 100 + '%';
    }

    /* Posisi coverflow: slide aktif di tengah, tetangga "mengintip".
       Nilai dihitung dari flex-basis slide & gap track (ikut CSS mobile). */
    function slideBasisPct() {
      const b = parseFloat(getComputedStyle(slides[0]).flexBasis);
      return isNaN(b) ? 62 : b;
    }
    function gapPx() {
      return parseFloat(getComputedStyle(track).columnGap) || 0;
    }
    function offsetInner(i) {
      return ((100 - slideBasisPct()) / 2) + '% - ' + (i * slideBasisPct()) + '% - ' + (i * gapPx()) + 'px';
    }

    let moreBtn = null;

    function update(expanded) {
      track.style.transform = 'translateX(calc(' + offsetInner(current) + '))';
      slides.forEach((s, i) => s.classList.toggle('is-active', i === current));
      dots.forEach((d, di) => {
        d.classList.toggle('active', di === current);
        d.setAttribute('aria-selected', di === current ? 'true' : 'false');
        /* Dots milik foto tersembunyi ikut disembunyikan selama collapsed */
        d.style.display = (expanded || di < visibleCount) ? '' : 'none';
      });
      const total = expanded ? slides.length : Math.min(visibleCount, slides.length);
      if (counter) counter.textContent = (current + 1) + ' / ' + total;
      setProgress(expanded);
      if (moreBtn) {
        moreBtn.classList.toggle('open', expanded);
        moreBtn.innerHTML = expanded
          ? 'Show Less <span class="chev">&#9650;</span>'
          : 'Show More (' + hiddenCount + ' foto) <span class="chev">&#9660;</span>';
      }
    }

    function isExpanded() {
      return hiddenCount === 0 || !hiddenSlides[0].classList.contains('slide-hidden');
    }

    function goTo(i) {
      /* Saat collapsed, navigasi dibatasi hanya ke foto yang terlihat */
      const n = isExpanded() ? slides.length : Math.min(visibleCount, slides.length);
      current = ((i % n) + n) % n;
      update(isExpanded());
    }

    /* --- Titik indikator --- */
    const dots = slides.map((_, i) => {
      const dot = document.createElement('button');
      dot.type = 'button';
      dot.className = 'gallery-dot' + (i === 0 ? ' active' : '');
      dot.setAttribute('role', 'tab');
      dot.setAttribute('aria-label', 'Ke foto ' + (i + 1));
      dot.addEventListener('click', () => { goTo(i); restart(); });
      dotsWrap.appendChild(dot);
      return dot;
    });

    const next = () => goTo(current + 1);
    const prev = () => goTo(current - 1);

    /* --- Tombol Show More / Show Less --- */
    if (hiddenCount > 0) {
      const wrap = document.createElement('div');
      wrap.className = 'show-more-wrap';
      moreBtn = document.createElement('button');
      moreBtn.type = 'button';
      moreBtn.className = 'show-more-btn gallery-more-btn';
      moreBtn.addEventListener('click', () => {
        const willExpand = hiddenSlides[0].classList.contains('slide-hidden');
        hiddenSlides.forEach((slide, i) => {
          slide.classList.remove('pop-in');
          if (willExpand) {
            slide.classList.remove('slide-hidden');
            slide.style.animationDelay = (i * 90) + 'ms';
            void slide.offsetWidth; /* paksa reflow agar animasi diputar ulang */
            slide.classList.add('pop-in');
          } else {
            slide.classList.add('slide-hidden');
            slide.style.animationDelay = '';
          }
        });
        update(willExpand);
        if (!willExpand) {
          goTo(Math.min(current, visibleCount - 1));
          group.scrollIntoView({ behavior: reduceMotion ? 'auto' : 'smooth', block: 'nearest' });
        }
      });
      wrap.appendChild(moreBtn);
      carousel.insertAdjacentElement('afterend', wrap);
    }

    /* --- Auto-slide (jeda saat hover / fokus / lightbox terbuka) --- */
    function start() {
      if (reduceMotion || timer || lbOpen) return;
      timer = setInterval(next, AUTOPLAY_MS);
    }
    function stop() {
      clearInterval(timer);
      timer = null;
    }
    const restart = () => { stop(); start(); };
    pauseFns.push(stop);
    resumeFns.push(start);

    carousel.querySelector('.gallery-nav.prev').addEventListener('click', () => { prev(); restart(); });
    carousel.querySelector('.gallery-nav.next').addEventListener('click', () => { next(); restart(); });

    viewport.addEventListener('mouseenter', stop);
    viewport.addEventListener('mouseleave', start);
    carousel.addEventListener('focusin', stop);
    carousel.addEventListener('focusout', start);

    /* --- Drag (mouse) & swipe (sentuh) --- */
    let dragging = false;
    let dragMoved = false;
    let startX = 0;
    let lastX = null;

    function dragStart(x) {
      dragging = true;
      dragMoved = false;
      startX = x;
      lastX = x;
      stop();
      track.style.transition = 'none';
    }
    function dragMove(x) {
      if (!dragging) return;
      lastX = x;
      const dx = x - startX;
      if (Math.abs(dx) > 6) dragMoved = true;
      track.style.transform = 'translateX(calc(' + offsetInner(current) + ' + ' + dx + 'px))';
    }
    function dragEnd() {
      if (!dragging) return;
      dragging = false;
      track.style.transition = '';
      const dx = lastX !== null ? lastX - startX : 0;
      if (dx < -40) next();
      else if (dx > 40) prev();
      lastX = null;
      start();
    }

    viewport.addEventListener('mousedown', (e) => {
      if (e.button !== 0) return;
      dragStart(e.clientX);
    });
    window.addEventListener('mousemove', (e) => { if (dragging) dragMove(e.clientX); });
    window.addEventListener('mouseup', dragEnd);

    viewport.addEventListener('touchstart', (e) => dragStart(e.touches[0].clientX), { passive: true });
    viewport.addEventListener('touchmove', (e) => { if (dragging) dragMove(e.touches[0].clientX); }, { passive: true });
    viewport.addEventListener('touchend', dragEnd);

    /* Klik foto: foto aktif -> lightbox, foto lain -> jadikan aktif */
    slides.forEach((slide, i) => {
      slide.addEventListener('click', () => {
        if (dragMoved) { dragMoved = false; return; }
        if (i === current) openLightbox(slides, i);
        else { goTo(i); restart(); }
      });
    });

    /* --- Keyboard saat carousel fokus --- */
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') { e.preventDefault(); prev(); restart(); }
      if (e.key === 'ArrowRight') { e.preventDefault(); next(); restart(); }
    });

    goTo(0);
    start();
  });
})();

/* ============================================================
   FORM KONTAK - kirim pesan ke hekoding@gmail.com via FormSubmit
   Endpoint AJAX memakai kode alias (bukan email telanjang)
   agar aman dari spam-bot. Pesan tetap MASUK ke Gmail
   hekoding@gmail.com.
   ============================================================ */
(function () {
  const form = document.getElementById('contactForm');
  if (!form) return;

  const msgBox = document.getElementById('formMessage');
  const submitBtn = document.getElementById('cf-submit');
  const nameEl = document.getElementById('cf-name');
  const emailEl = document.getElementById('cf-email');
  const categoryEl = document.getElementById('cf-category');
  const waEl = document.getElementById('cf-wa');
  const messageEl = document.getElementById('cf-message');
  const ENDPOINT = 'https://formsubmit.co/ajax/8e333788af7b2de9dd4b7dab896e5252';

  function showMsg(text, type) {
    msgBox.textContent = text;
    msgBox.className = 'form-message ' + type;
    msgBox.style.display = 'block';
    clearTimeout(showMsg._t);
    showMsg._t = setTimeout(() => { msgBox.style.display = 'none'; }, 6000);
  }

  function setFieldError(input, on) {
    input.classList.toggle('error', on);
  }

  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    // Validasi sederhana
    const nameInvalid = nameEl.value.trim().length < 2;
    const emailInvalid = !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(emailEl.value.trim());
    const categoryInvalid = !categoryEl.value;
    const wordCount = messageEl.value.trim().split(/\s+/).filter(Boolean).length;
    const messageInvalid = wordCount < 5;

    setFieldError(nameEl, nameInvalid);
    setFieldError(emailEl, emailInvalid);
    setFieldError(categoryEl, categoryInvalid);
    setFieldError(messageEl, messageInvalid);

    // Peringatan khusus: pesan terlalu pendek
    if (messageInvalid) {
      showMsg(`Pesan terlalu singkat (baru ${wordCount} kata). Minimal 5 kata ya, ceritakan sedikit lebih detail! 🙏`, 'error');
      return;
    }

    if (nameInvalid || emailInvalid || categoryInvalid) {
      showMsg('Mohon lengkapi semua kolom bertanda * dengan benar ya! 🙏', 'error');
      return;
    }

    // Kirim via AJAX (tanpa pindah halaman)
    submitBtn.disabled = true;
    const originalBtnHTML = submitBtn.innerHTML;
    submitBtn.innerHTML = '<span class="spinner"></span>Mengirim...';

    try {
      const res = await fetch(ENDPOINT, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', 'Accept': 'application/json' },
        body: JSON.stringify({
          name: nameEl.value.trim(),
          email: emailEl.value.trim(),
          Kategori: categoryEl.value,
          WhatsApp_Telegram: waEl.value.trim() || '(tidak diisi)',
          message: messageEl.value.trim(),
          _subject: `📩 [${categoryEl.value}] Pesan dari ${nameEl.value.trim()}`,
          _template: 'table',
          _captcha: 'false'
        })
      });

      const data = await res.json();

      if (res.ok && String(data.success) === 'true') {
        showMsg('Pesan berhasil terkirim! Aku akan balas secepatnya 😊', 'success');
        form.reset();
        updateWordCount();
      } else {
        throw new Error(data.message || 'Gagal mengirim pesan.');
      }
    } catch (err) {
      console.error(err);
      showMsg('Maaf, pesan gagal terkirim. Coba lagi atau hubungi aku lewat Instagram ya! 🙏', 'error');
    } finally {
      submitBtn.disabled = false;
      submitBtn.innerHTML = originalBtnHTML;
    }
  });

  // Hapus tanda error saat user mulai mengisi ulang
  ['cf-name', 'cf-email', 'cf-category', 'cf-message'].forEach((id) => {
    const el = document.getElementById(id);
    el.addEventListener('input', () => setFieldError(el, false));
    el.addEventListener('change', () => setFieldError(el, false));
  });

  // Penghitung kata live pada kolom pesan (min. 5 kata)
  const wordCountEl = document.getElementById('cf-wordcount');
  function updateWordCount() {
    if (!wordCountEl) return;
    const words = messageEl.value.trim().split(/\s+/).filter(Boolean).length;
    wordCountEl.textContent = words + ' kata';
    wordCountEl.classList.toggle('ok', words >= 5);
    wordCountEl.classList.toggle('low', words > 0 && words < 5);
  }
  messageEl.addEventListener('input', updateWordCount);
  updateWordCount();
})();

