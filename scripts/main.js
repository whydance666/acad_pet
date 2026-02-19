document.addEventListener('DOMContentLoaded', () => {

  // GLOW EFFECT
  const wrapper = document.querySelector('.wrapper');
  if (wrapper) {
    wrapper.addEventListener('mousemove', (e) => {
      const rect = wrapper.getBoundingClientRect();
      const x = e.clientX - rect.left;
      const y = e.clientY - rect.top;
      wrapper.style.setProperty('--x', `${x}px`);
      wrapper.style.setProperty('--y', `${y}px`);
    });
  }

  // FORM ELEMENTS
  const form = document.getElementById('registerForm');
  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  if (!form || !email || !password || !confirmPassword) return;

  // VALIDATION FUNCTIONS
  function validateEmail() {
    const emailValue = email.value.trim();
    if (emailValue === '') {
      emailError.textContent = 'Email is required';
      email.classList.add('error');
      return false;
    }
    const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailPattern.test(emailValue)) {
      emailError.textContent = 'Invalid email format';
      email.classList.add('error');
      return false;
    }
    emailError.textContent = '';
    email.classList.remove('error');
    return true;
  }

  function validatePasswords() {
    if (confirmPassword.value === '') {
      confirmPasswordError.textContent = '';
      confirmPassword.classList.remove('error');
      return false;
    }
    if (password.value !== confirmPassword.value) {
      confirmPasswordError.textContent = 'Passwords do not match';
      confirmPassword.classList.add('error');
      return false;
    } else {
      confirmPasswordError.textContent = '';
      confirmPassword.classList.remove('error');
      return true;
    }
  }

  // EVENT LISTENERS
  email.addEventListener('input', validateEmail);
  password.addEventListener('input', validatePasswords);
  confirmPassword.addEventListener('input', validatePasswords);

  form.addEventListener('submit', (e) => {
    const isEmailValid = validateEmail();
    const arePasswordsValid = validatePasswords();

    if (!isEmailValid || !arePasswordsValid) {
      e.preventDefault();
    }
  });

});
