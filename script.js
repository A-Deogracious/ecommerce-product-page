
window.addEventListener('scroll', () => {
  const navbar = document.querySelector('.navbar');

  if (!navbar) return; // Prevent errors if element doesn't exist

  if (window.scrollY > 50) {
    navbar.classList.add('solid');
  } else {
    navbar.classList.remove('solid');
  }
});



const menuToggle = document.querySelector('.menu-toggle');
const navMenu = document.querySelector('.nav-menu');

if (menuToggle && navMenu) {
  menuToggle.addEventListener('click', () => {
    navMenu.classList.toggle('open');
  });
}



const navLinks = document.querySelectorAll('.nav-menu a');

navLinks.forEach(link => {
  link.addEventListener('click', () => {
    navMenu.classList.remove('open');
  });
});



const modal = document.querySelector('.modal-overlay');
const openBtns = document.querySelectorAll('[data-open-modal]');
const closeBtn = document.querySelector('.close-btn');

if (modal) {

  // Open modal
  openBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      modal.classList.add('active');
      document.body.style.overflow = 'hidden'; 
      // Prevent background scroll
    });
  });

  // Close modal via button
  if (closeBtn) {
    closeBtn.addEventListener('click', () => {
      closeModal();
    });
  }

  // Close modal when clicking outside
  modal.addEventListener('click', (e) => {
    if (e.target === modal) {
      closeModal();
    }
  });
}



function closeModal() {
  modal.classList.remove('active');
  document.body.style.overflow = 'auto';
}



const buttons = document.querySelectorAll('.cta-button, .auth-btn');

buttons.forEach(button => {
  button.addEventListener('mousedown', () => {
    button.style.transform = 'scale(0.97)';
  });

  button.addEventListener('mouseup', () => {
    button.style.transform = 'scale(1)';
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = 'scale(1)';
  });
});



const images = document.querySelectorAll('img');

const imageObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const img = entry.target;

      if (img.dataset.src) {
        img.src = img.dataset.src;
      }

      observer.unobserve(img);
    }
  });
});

images.forEach(img => {
  imageObserver.observe(img);
});



const revealElements = document.querySelectorAll('.product-card, .hero-image');

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

revealElements.forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(40px)';
  el.style.transition = 'all 0.6s ease';

  revealObserver.observe(el);
});



try {
  console.log("UI enhancements loaded successfully");
} catch (error) {
  console.error("Error initializing UI enhancements:", error);
}
