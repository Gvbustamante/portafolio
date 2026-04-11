/* =========================================
   GISELLA BUSTAMANTE — PORTFOLIO JS
   ========================================= */

document.addEventListener('DOMContentLoaded', () => {

  // ── CUSTOM CURSOR ──────────────────────────
  const cursor = document.getElementById('cursor');
  const follower = document.getElementById('cursorFollower');

  if (cursor && follower && window.innerWidth > 768) {
    let mouseX = 0, mouseY = 0;
    let followerX = 0, followerY = 0;

    document.addEventListener('mousemove', e => {
      mouseX = e.clientX;
      mouseY = e.clientY;
      cursor.style.left = mouseX + 'px';
      cursor.style.top  = mouseY + 'px';
    });

    function animateFollower() {
      followerX += (mouseX - followerX) * 0.12;
      followerY += (mouseY - followerY) * 0.12;
      follower.style.left = followerX + 'px';
      follower.style.top  = followerY + 'px';
      requestAnimationFrame(animateFollower);
    }
    animateFollower();

    document.querySelectorAll('a, button, .project-card, .tab, .skill-group').forEach(el => {
      el.addEventListener('mouseenter', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(2)';
        cursor.style.background = 'var(--violet)';
      });
      el.addEventListener('mouseleave', () => {
        cursor.style.transform = 'translate(-50%,-50%) scale(1)';
        cursor.style.background = 'var(--cyan)';
      });
    });
  }

  // ── NAVBAR ─────────────────────────────────
  const navbar = document.getElementById('navbar');
  const burger = document.getElementById('burger');
  const navLinks = document.getElementById('navLinks');

  window.addEventListener('scroll', () => {
    navbar.classList.toggle('scrolled', window.scrollY > 50);
  });

  burger.addEventListener('click', () => {
    burger.classList.toggle('open');
    navLinks.classList.toggle('open');
  });

  // Close menu on link click
  navLinks.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      burger.classList.remove('open');
      navLinks.classList.remove('open');
    });
  });

  // Active nav link on scroll
  const sections = document.querySelectorAll('section[id]');
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(s => {
      if (window.scrollY >= s.offsetTop - 120) current = s.id;
    });
    navLinks.querySelectorAll('a').forEach(a => {
      a.classList.toggle('active-link', a.getAttribute('href') === '#' + current);
    });
  });

  // ── SCROLL REVEAL ──────────────────────────
  const revealEls = document.querySelectorAll('.reveal');

  const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, i) => {
      if (entry.isIntersecting) {
        // Stagger siblings
        const siblings = [...entry.target.parentElement.querySelectorAll('.reveal:not(.visible)')];
        const idx = siblings.indexOf(entry.target);
        setTimeout(() => {
          entry.target.classList.add('visible');
        }, idx * 80);
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' });

  revealEls.forEach(el => revealObserver.observe(el));

  // ── PROJECT TABS ───────────────────────────
  const tabs = document.querySelectorAll('.tab');
  const cards = document.querySelectorAll('.project-card');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      const filter = tab.dataset.filter;

      // Update active tab
      tabs.forEach(t => t.classList.remove('active'));
      tab.classList.add('active');

      // Filter cards
      cards.forEach(card => {
        const cat = card.dataset.category;
        if (filter === 'all' || cat === filter) {
          card.classList.remove('hidden');
          // Re-trigger reveal animation
          card.classList.remove('visible');
          setTimeout(() => card.classList.add('visible'), 50);
        } else {
          card.classList.add('hidden');
        }
      });
    });
  });

  // Trigger initial reveal for visible cards
  setTimeout(() => {
    cards.forEach((card, i) => {
      setTimeout(() => card.classList.add('visible'), i * 60);
    });
  }, 300);

  // ── CONTACT FORM ───────────────────────────
  const form = document.getElementById('contactForm');
  const toast = document.getElementById('toast');
  const toastMsg = document.getElementById('toastMsg');

  function showToast(msg, isError = false) {
    toastMsg.textContent = msg;
    toast.style.borderColor = isError ? 'rgba(239,68,68,0.4)' : 'rgba(34,197,94,0.4)';
    const icon = toast.querySelector('.toast-icon');
    icon.textContent = isError ? '❌' : '✅';
    toast.classList.add('show');
    setTimeout(() => toast.classList.remove('show'), 3500);
  }

  function validateField(input, errorEl, errorMsg) {
    const val = input.value.trim();
    let valid = true;

    if (!val) {
      valid = false;
    } else if (input.type === 'email' && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(val)) {
      valid = false;
    }

    if (!valid) {
      input.classList.add('error');
      errorEl.classList.add('visible');
      errorEl.textContent = errorMsg;
    } else {
      input.classList.remove('error');
      errorEl.classList.remove('visible');
    }
    return valid;
  }

  // Live validation on blur
  const nameInput  = document.getElementById('name');
  const emailInput = document.getElementById('email');
  const msgInput   = document.getElementById('message');

  nameInput.addEventListener('blur', () =>
    validateField(nameInput, document.getElementById('nameError'), 'Por favor ingresa tu nombre.'));
  emailInput.addEventListener('blur', () =>
    validateField(emailInput, document.getElementById('emailError'), 'Ingresa un email válido.'));
  msgInput.addEventListener('blur', () =>
    validateField(msgInput, document.getElementById('messageError'), 'Por favor escribe tu mensaje.'));

  form.addEventListener('submit', e => {
    e.preventDefault();

    const v1 = validateField(nameInput,  document.getElementById('nameError'),    'Por favor ingresa tu nombre.');
    const v2 = validateField(emailInput, document.getElementById('emailError'),   'Ingresa un email válido.');
    const v3 = validateField(msgInput,   document.getElementById('messageError'), 'Por favor escribe tu mensaje.');

    if (!v1 || !v2 || !v3) return;

    // Button loading state
    const btn = form.querySelector('.btn');
    const btnText = btn.querySelector('.btn-text');
    const originalText = btnText.textContent;
    btnText.textContent = 'Enviando...';
    btn.style.opacity = '0.7';
    btn.disabled = true;

    // Simulate send (replace with actual form service like Formspree)
    setTimeout(() => {
      form.reset();
      btnText.textContent = originalText;
      btn.style.opacity = '1';
      btn.disabled = false;
      showToast('¡Mensaje enviado con éxito! Te contacto pronto 🚀');
    }, 1200);
  });

  // ── SMOOTH SCROLL FOR ALL ANCHORS ──────────
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', e => {
      e.preventDefault();
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ── PARALLAX ORBS ──────────────────────────
  const orb1 = document.querySelector('.orb-1');
  const orb2 = document.querySelector('.orb-2');

  if (orb1 && orb2) {
    window.addEventListener('scroll', () => {
      const y = window.scrollY;
      orb1.style.transform = `translateY(${y * 0.15}px)`;
      orb2.style.transform = `translateY(${-y * 0.1}px)`;
    });
  }

  // ── TYPING ANIMATION (optional hero subtitle) ──
  const sub = document.querySelector('.hero-sub');
  if (sub) {
    const texts = ['Web Developer · UI/UX · Diseño Web', 'Frontend · React · WordPress · Webflow'];
    let i = 0, j = 0, isDeleting = false;

    function type() {
      const current = texts[i];
      if (isDeleting) {
        sub.textContent = current.substring(0, j--);
        if (j < 0) { isDeleting = false; i = (i + 1) % texts.length; j = 0; setTimeout(type, 600); return; }
      } else {
        sub.textContent = current.substring(0, j++);
        if (j > current.length) { isDeleting = true; setTimeout(type, 2000); return; }
      }
      setTimeout(type, isDeleting ? 40 : 80);
    }

    // Start after hero animation
    setTimeout(type, 1500);
  }

  console.log('✦ Portfolio de Gisella Bustamante — Diseño & Desarrollo: gvbustamante');
});
