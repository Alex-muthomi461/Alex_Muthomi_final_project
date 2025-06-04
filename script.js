// script.js

document.addEventListener('DOMContentLoaded', () => {
  // 1. Smooth scroll behavior (CSS fallback)
  document.documentElement.style.scrollBehavior = 'smooth';

  // 2. Highlight active nav link on scroll
  const sections = document.querySelectorAll('main.page-section');
  const navLinks = document.querySelectorAll('.nav-link');

  function activateNavLinkOnScroll() {
    let scrollPos = window.scrollY || window.pageYOffset;
    let offset = 120; // adjust if you have a fixed header

    sections.forEach(section => {
      const top = section.offsetTop - offset;
      const bottom = top + section.offsetHeight;
      const id = section.getAttribute('id');
      if (scrollPos >= top && scrollPos < bottom) {
        navLinks.forEach(link => {
          link.classList.toggle('active', link.getAttribute('href') === `#${id}`);
          link.setAttribute('aria-current', link.getAttribute('href') === `#${id}` ? 'page' : 'false');
        });
      }
    });
  }

  window.addEventListener('scroll', activateNavLinkOnScroll);
  activateNavLinkOnScroll(); // run on page load

  // 3. Optional: Smooth scroll for browsers that don't support CSS scroll-behavior
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href && href.startsWith('#')) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({ behavior: 'smooth', block: 'start' });
          // Optionally, set focus for accessibility
          target.setAttribute('tabindex', '-1');
          target.focus();
        }
      }
    });
  });

  // 4. FAQ Accordion
  document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function () {
      const item = this.closest('.faq-item');
      const isExpanded = item.classList.toggle('open');
      btn.setAttribute('aria-expanded', isExpanded);
      const answer = item.querySelector('.faq-answer');
      if (answer) answer.setAttribute('aria-hidden', !isExpanded);
    });
    btn.addEventListener('keydown', function (e) {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        this.click();
      }
    });
  });

  // 5. Contact Form Handling
  const contactForm = document.getElementById('contactForm');
  if (contactForm) {
    contactForm.addEventListener('submit', async e => {
      e.preventDefault();
      const name = contactForm.elements.name.value.trim();
      const email = contactForm.elements.email.value.trim();
      if (!name || !validateEmail(email)) {
        showFormError('Please fill in all required fields correctly');
        return;
      }
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      submitBtn.disabled = true;
      submitBtn.textContent = 'Sending...';
      try {
        await new Promise(resolve => setTimeout(resolve, 1000));
        alert('Thank you for your message! We will respond shortly.');
        contactForm.reset();
      } catch (error) {
        showFormError('Message failed to send. Please try again.');
      } finally {
        submitBtn.disabled = false;
        submitBtn.textContent = 'Send Message';
      }
    });
  }

  function validateEmail(email) {
    return /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email);
  }
  function showFormError(message) {
    const errorDiv = document.createElement('div');
    errorDiv.className = 'form-error';
    errorDiv.textContent = message;
    errorDiv.setAttribute('role', 'alert');
    contactForm.prepend(errorDiv);
    setTimeout(() => errorDiv.remove(), 5000);
  }
});
