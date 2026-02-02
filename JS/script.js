// Toggle mobile menu
const btnMenu = document.getElementById('btn-menu');
const nav = document.getElementById('main-nav');

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
document.querySelectorAll('.section, .hero-left, .hero-right, .portfolio-item, .card, .test-card, .contact-form').forEach(el => {
  observer.observe(el);
});


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

// Dark mode toggle
const darkModeToggle = document.getElementById('dark-mode-toggle');
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

const sertifikat = document.getElementsByClassName('certificate-item');
for(let i = 0; i < sertifikat.length; i++){
  sertifikat[i].addEventListener('click', function(){
    const linkSertifikat = document.getElementsByClassName('certificate-img');
    for(let  j = 0; j < linkSertifikat.length; j++){
      linkSertifikat[j].style.display = 'none';
    }
  });
}