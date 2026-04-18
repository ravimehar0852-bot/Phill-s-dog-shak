// ===== PHIL'S DOG SHAK — JAVASCRIPT =====

document.addEventListener('DOMContentLoaded', () => {

  // ===== PAGE NAVIGATION =====
  const pages   = document.querySelectorAll('.page');
  const navLinks = document.querySelectorAll('[data-page]');

  function showPage(id) {
    pages.forEach(p => {
      p.classList.toggle('active', p.id === 'page-' + id);
    });
    navLinks.forEach(a => {
      a.classList.toggle('active', a.dataset.page === id);
    });

    // Scroll back to top on page change
    window.scrollTo({ top: 0, behavior: 'smooth' });

    // Close mobile menu
    closeMobileMenu();
  }

  navLinks.forEach(a => {
    a.addEventListener('click', () => showPage(a.dataset.page));
  });

  // ===== MOBILE HAMBURGER =====
  const hamburger  = document.getElementById('hamburger');
  const mobileMenu = document.getElementById('mobile-menu');

  function closeMobileMenu() {
    hamburger.classList.remove('open');
    mobileMenu.classList.remove('open');
  }

  hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('open');
    mobileMenu.classList.toggle('open');
  });

  // ===== STICKY NAV SHADOW =====
  window.addEventListener('scroll', () => {
    document.querySelector('nav').classList.toggle('scrolled', window.scrollY > 20);
  });

  // ===== MENU TABS =====
  const menuTabs = document.querySelectorAll('.menu-tab');
  const menuSections = document.querySelectorAll('.menu-section');

  menuTabs.forEach(tab => {
    tab.addEventListener('click', () => {
      menuTabs.forEach(t => t.classList.remove('active'));
      menuSections.forEach(s => s.classList.remove('active'));
      tab.classList.add('active');
      const target = document.getElementById('menu-' + tab.dataset.menu);
      if (target) target.classList.add('active');
    });
  });

  // ===== GALLERY FILTER =====
  const filterBtns   = document.querySelectorAll('.filter-btn');
  const galleryItems = document.querySelectorAll('.gallery-item');

  filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
      filterBtns.forEach(b => b.classList.remove('active'));
      btn.classList.add('active');

      const filter = btn.dataset.filter;
      galleryItems.forEach(item => {
        const show = filter === 'all' || item.dataset.category === filter;
        item.style.display = show ? 'block' : 'none';
        if (show) {
          item.style.animation = 'none';
          requestAnimationFrame(() => {
            item.style.animation = 'fadeUp 0.4s ease forwards';
          });
        }
      });
    });
  });

  // ===== CONTACT FORM =====
  const form = document.getElementById('contact-form');
  if (form) {
    form.addEventListener('submit', e => {
      e.preventDefault();
      const btn = form.querySelector('.form-submit');
      btn.textContent = 'Sending…';
      btn.disabled = true;

      setTimeout(() => {
        form.style.display = 'none';
        document.getElementById('form-success').style.display = 'block';
      }, 1200);
    });
  }

  // ===== MAP DIRECTIONS BUTTON =====
  const dirBtn = document.getElementById('directions-btn');
  if (dirBtn) {
    dirBtn.addEventListener('click', () => {
      window.open(
        'https://www.google.com/maps/place/Phil\'s+Dog+Shak,+N+7th+St+%26,+E+Main+St,+Riverton,+WY+82501',
        '_blank'
      );
    });
  }

  // ===== HERO CTA SHORTCUTS =====
  const menuCta = document.getElementById('hero-menu-cta');
  if (menuCta) menuCta.addEventListener('click', () => showPage('menu'));

  const contactCta = document.getElementById('hero-contact-cta');
  if (contactCta) contactCta.addEventListener('click', () => showPage('contact'));

  // Footer link shortcuts
  document.querySelectorAll('[data-page]').forEach(el => {
    el.addEventListener('click', () => showPage(el.dataset.page));
  });

  // Initialize first page
  showPage('home');
});
