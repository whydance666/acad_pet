document.addEventListener('DOMContentLoaded', () => {

  const resetForm = document.getElementById('resetForm');
  const password = document.getElementById('password');
  const confirmPassword = document.getElementById('confirmPassword');
  const confirmPasswordError = document.getElementById('confirmPasswordError');

  if (!resetForm || !password || !confirmPassword) return;

  function validatePasswords() {
    if (password.value !== confirmPassword.value) {
      confirmPasswordError.textContent = "Passwords do not match";
      confirmPassword.classList.add("error");
      return false;
    } else {
      confirmPasswordError.textContent = "";
      confirmPassword.classList.remove("error");
      return true;
    }
  }

  password.addEventListener("input", validatePasswords);
  confirmPassword.addEventListener("input", validatePasswords);

  resetForm.addEventListener("submit", (e) => {
    if (!validatePasswords()) {
      e.preventDefault();
    }
  });

});