const root = document.documentElement;
const themeToggle = document.querySelector('.theme-toggle');
const savedTheme = localStorage.getItem('plutonode-theme');

if (savedTheme === 'dark') {
  root.dataset.theme = 'dark';
  themeToggle.setAttribute('aria-pressed', 'true');
  themeToggle.setAttribute('aria-label', 'Aktifkan mode terang');
}

themeToggle.addEventListener('click', () => {
  const isDark = root.dataset.theme === 'dark';
  root.dataset.theme = isDark ? 'light' : 'dark';
  themeToggle.setAttribute('aria-pressed', String(!isDark));
  themeToggle.setAttribute('aria-label', isDark ? 'Aktifkan mode gelap' : 'Aktifkan mode terang');
  localStorage.setItem('plutonode-theme', isDark ? 'light' : 'dark');
});

const revealObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll('.reveal').forEach((element) => revealObserver.observe(element));

const counterObserver = new IntersectionObserver((entries, observer) => {
  entries.forEach((entry) => {
    if (!entry.isIntersecting) return;
    const counter = entry.target;
    const target = Number(counter.dataset.target);
    const duration = 1300;
    const start = performance.now();

    const updateCounter = (time) => {
      const progress = Math.min((time - start) / duration, 1);
      const easedProgress = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.floor(easedProgress * target).toLocaleString('id-ID');
      if (progress < 1) requestAnimationFrame(updateCounter);
    };

    requestAnimationFrame(updateCounter);
    observer.unobserve(counter);
  });
}, { threshold: 0.6 });

document.querySelectorAll('.counter').forEach((counter) => counterObserver.observe(counter));

const joinForm = document.querySelector('#join-form');
const formNote = document.querySelector('#form-note');
joinForm.addEventListener('submit', (event) => {
  event.preventDefault();
  const name = document.querySelector('#name').value.trim();
  formNote.textContent = `Nice, ${name}! Cek inbox kamu untuk langkah berikutnya.`;
  formNote.style.color = '#f5dc72';
  joinForm.querySelector('.form-button').innerHTML = 'Pendaftaran terkirim <span>✓</span>';
});
