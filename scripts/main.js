document.addEventListener('DOMContentLoaded', () => {

  // Эффект курсора на карточке
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

  // Форма регистрации
  const form = document.getElementById('registerForm');
  const email = document.getElementById('email');
  const emailError = document.getElementById('emailError');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  if (form && email && password && confirmPassword) {

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
      }
      confirmPasswordError.textContent = '';
      confirmPassword.classList.remove('error');
      return true;
    }

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
  }

  // 1. Появление блоков при скролле
  const blocks = document.querySelectorAll('.about_block_list');
  if (blocks.length > 0) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
        }
      });
    }, { threshold: 0.1 });

    blocks.forEach(el => observer.observe(el));
  }

  // 2. Sticky header с фоном при скролле
  const header = document.querySelector('header');
  if (header) {
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 50);
    });
  }

  // 3. Параллакс на hero
  const heroInfo = document.querySelector('.hero--info');
  if (heroInfo) {
    window.addEventListener('scroll', () => {
      heroInfo.style.transform = `translateY(${window.scrollY * 0.3}px)`;
      heroInfo.style.opacity = 1 - window.scrollY / 600;
    });
  }

});

// Sidebar
document.addEventListener('DOMContentLoaded', () => {
  const sidebar = document.getElementById("sidebar");
  const overlay = document.getElementById("overlay");
  const openBtn = document.getElementById("openMenu");
  const closeBtn = document.getElementById("closeMenu");
  const menuIcon = document.getElementById("menuIcon");

  if (!sidebar || !overlay || !openBtn || !closeBtn || !menuIcon) return;

  let isOpen = false;

  function openMenu() {
    isOpen = true;
    sidebar.classList.add("active");
    overlay.classList.add("active");
    document.body.classList.add("no-scroll");
    openBtn.classList.add("morph");
    menuIcon.classList.remove("bx-menu");
    menuIcon.classList.add("bx-x");
  }

  function closeMenu() {
    isOpen = false;
    sidebar.classList.remove("active");
    overlay.classList.remove("active");
    document.body.classList.remove("no-scroll");
    openBtn.classList.remove("morph");
    menuIcon.classList.remove("bx-x");
    menuIcon.classList.add("bx-menu");
  }

  function toggleMenu() {
    isOpen ? closeMenu() : openMenu();
  }

  openBtn.addEventListener("click", toggleMenu);
  closeBtn.addEventListener("click", closeMenu);
  overlay.addEventListener("click", closeMenu);

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && isOpen) closeMenu();
  });
});