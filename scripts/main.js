document.addEventListener('DOMContentLoaded', () => {
  const wrapper = document.querySelector('.wrapper');

  if (!wrapper) return;

  wrapper.addEventListener('mousemove', (e) => {
    const rect = wrapper.getBoundingClientRect();

    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    wrapper.style.setProperty('--x', `${x}px`);
    wrapper.style.setProperty('--y', `${y}px`);
  });
});
