// Toggle mobile menu
const btnMenu = document.getElementById('btn-menu');
const nav = document.getElementById('main-nav');
const showCertificates = document.getElementById("showCertificates");
showCertificates.style.display = "none";
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

// Smooth scroll for in-page links
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function(e){
    const target = document.querySelector(this.getAttribute('href'));
    if(target){
      e.preventDefault();
      window.scrollTo({
        top: target.offsetTop - 60,
        behavior: 'smooth'
      });
    }
  });
});

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
document.querySelectorAll('.section, .hero-left, .hero-right, .portfolio-item, .certificate-item, .gallery-item, .card, .test-card, .contact-form').forEach(el => {
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
initRevealGrids('.certificates-container');
initRevealGrids('.portfolio-grid');
initRevealGrids('.gallery-grid');

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

// Dark mode toggle (button is currently commented out in the HTML —
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
  hplife: ['img/certificateCoding/HP-Life_critical thingking.webp'],
  course: ['img/certificateCoding/revou_course.webp'],
  course2: ['img/certificateCoding/PelatihanLatika.webp'],
  course3: ['img/certificateCoding/CourseACodeorg.webp'],
  other1: ['img/moreCertificate/PiagamWebinarPeringatanDiniBencana.webp'],
  other2: ['img/moreCertificate/Sertifikat_antiperundungan.webp'],
  other3: ['img/moreCertificate/sertifikatOlimIPS.webp'],
};

function certificate(i) {
  const images = certificateData[i];
  showCertificates.innerHTML = '';

  if (!images) {
    showCertificates.style.display = 'none';
    return;
  }

  const certificateImage = document.createElement('div');
  certificateImage.classList.add('showImages');
  certificateImage.innerHTML =
    images.map((src) => `<img src="${src}" alt="Sertifikat" loading="lazy" />`).join('') +
    `<button type="button" class="close-lightbox" aria-label="Tutup">&times;</button>`;

  showCertificates.appendChild(certificateImage);
  showCertificates.style.display = 'flex';

  // Prevent clicks on the image/card from bubbling to the overlay's own
  // onclick (which would immediately close it), but let the close button work.
  certificateImage.addEventListener('click', (e) => {
    if (e.target.closest('.close-lightbox')) {
      certificate('0');
    } else {
      e.stopPropagation();
    }
  });
}

// Close the certificate lightbox with Esc
document.addEventListener('keydown', (e) => {
  if (e.key === 'Escape' && showCertificates.style.display === 'flex') {
    certificate('0');
  }
});

// Allow opening a certificate card with Enter/Space (keyboard accessibility)
document.querySelectorAll('.certificate-item[role="button"]').forEach((item) => {
  item.addEventListener('keydown', (e) => {
    if (e.key === 'Enter' || e.key === ' ') {
      e.preventDefault();
      item.click();
    }
  });
});

