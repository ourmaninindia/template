// ==========================================
// CONTACT FORM VALIDATION
// ==========================================

(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  const email = document.getElementById('email');
  const error = document.getElementById('email-error');

  // Exit safely if form is not present on this page
  if (!form || !email || !error) {
    return;
  }

  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();

      if (email.validity.valueMissing) {
        error.textContent = 'Please fill out this field';
      } else if (email.validity.typeMismatch || email.validity.patternMismatch) {
        error.textContent = 'Please enter a valid email address (e.g., name@example.com)';
      }

      email.classList.add('is-invalid');
    } else {
      error.textContent = '';
      email.classList.remove('is-invalid');
    }
  });

  // Validate on blur
  email.addEventListener('blur', () => {
    if (email.value && !email.checkValidity()) {
      error.textContent = 'Please enter a valid email address (e.g., name@example.com)';
      email.classList.add('is-invalid');
    }
  });

  // Clear error on input
  email.addEventListener('input', () => {
    if (email.classList.contains('is-invalid')) {
      error.textContent = '';
      email.classList.remove('is-invalid');
    }
  });

})();
