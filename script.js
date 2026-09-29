const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('.site-nav');
const themeToggle = document.querySelector('.theme-toggle');

menuToggle?.addEventListener('click', () => {
  const open = nav.classList.toggle('open');
  document.body.classList.toggle('menu-open', open);
  menuToggle.setAttribute('aria-expanded', String(open));
});

document.querySelectorAll('.site-nav a').forEach(link => {
  link.addEventListener('click', () => {
    nav.classList.remove('open');
    document.body.classList.remove('menu-open');
    menuToggle?.setAttribute('aria-expanded', 'false');
  });
});

themeToggle?.addEventListener('click', () => {
  document.body.classList.toggle('light-theme');
  const light = document.body.classList.contains('light-theme');
  themeToggle.textContent = light ? '☀' : '☾';
  localStorage.setItem('ivan-theme', light ? 'light' : 'dark');
});
if (localStorage.getItem('ivan-theme') === 'light') {
  document.body.classList.add('light-theme');
  if (themeToggle) themeToggle.textContent = '☀';
}

const sections = [...document.querySelectorAll('main section[id]')];
const navLinks = [...document.querySelectorAll('.site-nav a')];
const updateActiveNav = () => {
  const y = window.scrollY + 110;
  let current = 'top';
  for (const section of sections) if (section.offsetTop <= y) current = section.id;
  navLinks.forEach(link => link.classList.toggle('active', link.getAttribute('href') === `#${current}` || (current === 'top' && link.getAttribute('href') === '#top')));
};
window.addEventListener('scroll', updateActiveNav, {passive:true});
updateActiveNav();

const lightbox = document.querySelector('.lightbox');
const lightboxImage = lightbox?.querySelector('img');
const closeLightbox = () => {
  lightbox?.classList.remove('open');
  lightbox?.setAttribute('aria-hidden', 'true');
  if (lightboxImage) lightboxImage.src = '';
  document.body.classList.remove('menu-open');
};

document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('click', () => {
    if (!lightbox || !lightboxImage) return;
    lightboxImage.src = item.dataset.full;
    lightbox.classList.add('open');
    lightbox.setAttribute('aria-hidden', 'false');
  });
});

document.querySelector('.lightbox-close')?.addEventListener('click', closeLightbox);
lightbox?.addEventListener('click', e => { if (e.target === lightbox) closeLightbox(); });
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });
