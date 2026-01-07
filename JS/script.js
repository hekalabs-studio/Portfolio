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

// Simple contact form feedback with better validation
const sendBtn = document.getElementById('send-btn');
const formMessage = document.getElementById('form-message');
const nameInput = document.getElementById('name');
const emailInput = document.getElementById('email');
const messageInput = document.getElementById('message');

// Real-time validation
function validateField(input, regex, errorMsg) {
  const value = input.value.trim();
  if (value === '') {
    input.classList.remove('error');
    return true;
  }
  if (regex && !regex.test(value)) {
    input.classList.add('error');
    return false;
  } else {
    input.classList.remove('error');
    return true;
  }
}

nameInput.addEventListener('blur', () => validateField(nameInput));
emailInput.addEventListener('blur', () => validateField(emailInput, /^[^\s@]+@[^\s@]+\.[^\s@]+$/));
messageInput.addEventListener('blur', () => validateField(messageInput));

sendBtn.addEventListener('click', async () => {
  const name = nameInput.value.trim();
  const email = emailInput.value.trim();
  const msg = messageInput.value.trim();

  // Clear previous messages
  formMessage.style.display = 'none';
  formMessage.className = 'form-message';

  if(!name || !email || !msg){
    showMessage('Mohon isi nama, email, dan pesan terlebih dahulu.', 'error');
    return;
  }

  // Basic email validation
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(email)) {
    showMessage('Mohon masukkan alamat email yang valid.', 'error');
    emailInput.classList.add('error');
    return;
  }

  // Ganti dengan URL Apps Script deployment Anda
  const APPS_SCRIPT_URL = 'https://script.google.com/macros/s/AKfycbxnpOQkHNDK2tNA4pIA7OVjPc8ei5dXXRMnISKpMx66X6OAkxFKMj9xYwiZosqloNkx/exec'; // Contoh: 'https://script.google.com/macros/s/YOUR_SCRIPT_ID/exec'

  sendBtn.textContent = 'Mengirim...';
  sendBtn.disabled = true;

  try {
    const formData = new FormData();
      formData.append('name', name);
      formData.append('email', email);
      formData.append('message', msg);

    const response = await fetch(APPS_SCRIPT_URL, {
      method: 'POST',
      body: formData
    });


    const result = await response.json();
    if (result.status === 'success') {
      showMessage('Pesan berhasil dikirim! Terima kasih!', 'success');
      // Reset form
      nameInput.value = '';
      emailInput.value = '';
      messageInput.value = '';
      nameInput.classList.remove('error');
      emailInput.classList.remove('error');
      messageInput.classList.remove('error');
    } else {
      throw new Error('Gagal mengirim');
    }
  } catch (error) {
    console.error('Error:', error);
    showMessage('Terjadi kesalahan saat mengirim pesan. Coba lagi nanti.', 'error');
  } finally {
    sendBtn.textContent = 'Kirim';
    sendBtn.disabled = false;
  }
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