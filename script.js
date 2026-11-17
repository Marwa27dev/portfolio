document.documentElement.classList.add("js");

// ============================================
// 1. TEXTE TYPIQUE
// ============================================
const phrases = [
  "build --portfolio --theme=dark --accent=cyan",
  "deploy skill: web + mobile + ERP",
  "status => ready_for_new_challenges",
  "innovation = code + design + impact"
];

const typedLine = document.querySelector("#typed-line");
let phraseIndex = 0;
let charIndex = 0;
let isDeleting = false;

function typeEffect() {
  if (!typedLine) return;
  
  const currentPhrase = phrases[phraseIndex];
  
  if (isDeleting) {
    typedLine.textContent = currentPhrase.substring(0, charIndex - 1);
    charIndex--;
  } else {
    typedLine.textContent = currentPhrase.substring(0, charIndex + 1);
    charIndex++;
  }
  
  let speed = isDeleting ? 25 : 45;
  
  if (!isDeleting && charIndex === currentPhrase.length) {
    speed = 2000;
    isDeleting = true;
  } else if (isDeleting && charIndex === 0) {
    isDeleting = false;
    phraseIndex = (phraseIndex + 1) % phrases.length;
    speed = 500;
  }
  
  setTimeout(typeEffect, speed);
}

// ============================================
// 2. COMPTEURS ANIMÉS
// ============================================
function animateCounters() {
  const counters = document.querySelectorAll('.counter-number');
  
  counters.forEach(counter => {
    const target = parseInt(counter.dataset.target);
    const duration = 2000;
    const startTime = performance.now();
    
    function updateCounter(currentTime) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      
      const easeOutQuart = 1 - Math.pow(1 - progress, 4);
      const current = Math.floor(easeOutQuart * target);
      
      counter.textContent = current + (counter.dataset.suffix || '');
      
      if (progress < 1) {
        requestAnimationFrame(updateCounter);
      } else {
        counter.textContent = target + (counter.dataset.suffix || '');
      }
    }
    
    requestAnimationFrame(updateCounter);
  });
}

// ============================================
// 3. BARRES DE COMPÉTENCES ANIMÉES
// ============================================
function animateSkillBars() {
  const bars = document.querySelectorAll('.skill-bar-fill');
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const bar = entry.target;
        const width = bar.dataset.width || '80%';
        setTimeout(() => {
          bar.style.width = width;
        }, 300);
        observer.unobserve(bar);
      }
    });
  }, { threshold: 0.3 });
  
  bars.forEach(bar => observer.observe(bar));
}

// ============================================
// 4. EFFET 3D AU SURVOL DES CARTES - DÉSACTIVÉ
// ============================================
// function init3DCards() {
//   const cards = document.querySelectorAll('.project-card, .skill-panel, .timeline-content, .mini-card');
//   
//   cards.forEach(card => {
//     card.addEventListener('mousemove', (e) => {
//       const rect = card.getBoundingClientRect();
//       const x = e.clientX - rect.left;
//       const y = e.clientY - rect.top;
//       
//       const centerX = rect.width / 2;
//       const centerY = rect.height / 2;
//       
//       const rotateX = (y - centerY) / 20;
//       const rotateY = (centerX - x) / 20;
//       
//       card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
//       card.style.transition = 'transform 0.1s ease';
//     });
//     
//     card.addEventListener('mouseleave', () => {
//       card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) translateY(0)';
//       card.style.transition = 'transform 0.5s cubic-bezier(0.16, 1, 0.3, 1)';
//     });
//   });
// }

// ============================================
// 5. NAVIGATION STICKY
// ============================================
function initStickyNav() {
  const header = document.querySelector('.site-header');
  let lastScroll = 0;
  
  window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 50) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    if (currentScroll > lastScroll && currentScroll > 200) {
      header.style.transform = 'translateY(-100%)';
      header.style.opacity = '0';
    } else {
      header.style.transform = 'translateY(0)';
      header.style.opacity = '1';
    }
    
    lastScroll = currentScroll;
  });
}

// ============================================
// 6. SCROLL INDICATOR
// ============================================
function initScrollIndicator() {
  const indicator = document.querySelector('.scroll-indicator');
  if (!indicator) return;
  
  indicator.addEventListener('click', () => {
    const aboutSection = document.querySelector('#a-propos');
    if (aboutSection) {
      aboutSection.scrollIntoView({ behavior: 'smooth' });
    }
  });
}

// ============================================
// 7. SCROLL PROGRESS
// ============================================
function initScrollProgress() {
  const progress = document.createElement('div');
  progress.className = 'scroll-progress';
  document.body.appendChild(progress);
  
  window.addEventListener('scroll', () => {
    const scrollTop = window.pageYOffset;
    const docHeight = document.documentElement.scrollHeight - window.innerHeight;
    const progressPercent = (scrollTop / docHeight) * 100;
    progress.style.width = progressPercent + '%';
  });
}

// ============================================
// 8. REVELATION AU SCROLL
// ============================================
function revealOnScroll() {
  const revealNodes = document.querySelectorAll(".reveal");
  
  if (!revealNodes.length) return;
  
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.15, rootMargin: '0px 0px -50px 0px' }
  );
  
  revealNodes.forEach((node) => observer.observe(node));
}

// ============================================
// 9. ANNÉE DYNAMIQUE
// ============================================
function updateYear() {
  const yearNode = document.querySelector("#year");
  if (yearNode) {
    yearNode.textContent = new Date().getFullYear();
  }
}

// ============================================
// 10. PARALLAX SUR LES ORBS
// ============================================
function initParallax() {
  const orbs = document.querySelectorAll('.orb');
  if (!orbs.length) return;
  
  document.addEventListener('mousemove', (e) => {
    const x = (e.clientX / window.innerWidth - 0.5) * 20;
    const y = (e.clientY / window.innerHeight - 0.5) * 20;
    
    orbs.forEach((orb, index) => {
      const speed = 1 + index * 0.3;
      orb.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
    });
  });
}

// ============================================
// 11. EFFET GLITCH SUR LE TITRE
// ============================================
function initGlitchEffect() {
  const title = document.querySelector('.title-gradient');
  if (!title) return;
  
  setInterval(() => {
    if (Math.random() < 0.03) {
      const original = title.textContent;
      const chars = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789!@#$%^&*()';
      let glitched = '';
      for (let i = 0; i < original.length; i++) {
        if (Math.random() < 0.2) {
          glitched += chars[Math.floor(Math.random() * chars.length)];
        } else {
          glitched += original[i];
        }
      }
      title.textContent = glitched;
      
      setTimeout(() => {
        title.textContent = original;
      }, 150);
    }
  }, 4000);
}

// ============================================
// 12. SMOOTH SCROLL POUR LES ANCRES
// ============================================
function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#') return;
      
      const target = document.querySelector(targetId);
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth' });
      }
    });
  });
}

// ============================================
// 13. KEYBOARD NAVIGATION INDICATOR
// ============================================
document.addEventListener('keydown', (e) => {
  if (e.key === 'Tab') {
    document.body.classList.add('keyboard-nav');
  }
});

document.addEventListener('mousedown', () => {
  document.body.classList.remove('keyboard-nav');
});

// ============================================
// 14. OBSERVER POUR LES IMAGES (LAZY LOAD)
// ============================================
function initLazyImages() {
  if ('IntersectionObserver' in window) {
    const images = document.querySelectorAll('img[loading="lazy"]');
    const imageObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.src;
          imageObserver.unobserve(img);
        }
      });
    });
    images.forEach(img => imageObserver.observe(img));
  }
}

// ============================================
// 15. DETECTION DE LA CONNEXION INTERNET
// ============================================
function initOnlineStatus() {
  const statusBadge = document.querySelector('.status-badge');
  if (!statusBadge) return;
  
  const statusDot = statusBadge.querySelector('.status-dot');
  const statusText = statusBadge.querySelector('span:last-child');
  
  window.addEventListener('online', () => {
    statusDot.style.background = '#22c55e';
    statusText.textContent = 'Disponible';
  });
  
  window.addEventListener('offline', () => {
    statusDot.style.background = '#ef4444';
    statusText.textContent = 'Hors ligne';
  });
}

// ============================================
// 16. CARROUSEL HORIZONTAL AVEC SCROLL - SANS AUTO-PLAY
// ============================================
function initHorizontalCarousel() {
  const carousels = document.querySelectorAll('.project-carousel-horizontal');
  
  carousels.forEach(carousel => {
    const track = carousel.querySelector('.project-carousel-track-horizontal');
    const slides = carousel.querySelectorAll('.project-carousel-slide');
    const prevBtn = carousel.querySelector('.carousel-btn-horizontal.prev');
    const nextBtn = carousel.querySelector('.carousel-btn-horizontal.next');
    const counter = carousel.querySelector('.carousel-counter-horizontal');
    const scrollbar = carousel.querySelector('.carousel-scrollbar-thumb');
    
    if (!track || !slides.length) return;
    
    const totalSlides = slides.length;
    let currentIndex = 0;
    let isScrolling = false;
    
    const slideWidthPercent = 100 / totalSlides;
    
    function scrollToIndex(index) {
      if (index < 0) index = 0;
      if (index >= totalSlides) index = totalSlides - 1;
      
      currentIndex = index;
      const slideWidth = track.querySelector('.project-carousel-slide').offsetWidth;
      track.scrollTo({
        left: index * slideWidth,
        behavior: 'smooth'
      });
      
      if (counter) {
        counter.textContent = `${index + 1} / ${totalSlides}`;
      }
      
      if (scrollbar) {
        scrollbar.style.width = `${slideWidthPercent}%`;
        const maxIndex = totalSlides - 1;
        const progressPercent = maxIndex > 0 ? (index / maxIndex) * 100 : 0;
        scrollbar.style.transform = `translateX(${progressPercent}%)`;
      }
    }
    
    function goToPrev() {
      if (currentIndex > 0) {
        scrollToIndex(currentIndex - 1);
      }
    }
    
    function goToNext() {
      if (currentIndex < totalSlides - 1) {
        scrollToIndex(currentIndex + 1);
      }
    }
    
    if (prevBtn) {
      prevBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToPrev();
      });
    }
    
    if (nextBtn) {
      nextBtn.addEventListener('click', (e) => {
        e.stopPropagation();
        goToNext();
      });
    }
    
    track.addEventListener('scroll', () => {
      if (isScrolling) return;
      
      const slideWidth = track.querySelector('.project-carousel-slide').offsetWidth;
      const scrollPosition = track.scrollLeft;
      const newIndex = Math.round(scrollPosition / slideWidth);
      
      if (newIndex !== currentIndex && newIndex >= 0 && newIndex < totalSlides) {
        currentIndex = newIndex;
        
        if (counter) {
          counter.textContent = `${currentIndex + 1} / ${totalSlides}`;
        }
        
        if (scrollbar) {
          const maxIndex = totalSlides - 1;
          const progressPercent = maxIndex > 0 ? (currentIndex / maxIndex) * 100 : 0;
          scrollbar.style.width = `${slideWidthPercent}%`;
          scrollbar.style.transform = `translateX(${progressPercent}%)`;
        }
      }
    });
    
    carousel.addEventListener('keydown', (e) => {
      if (e.key === 'ArrowLeft') goToPrev();
      if (e.key === 'ArrowRight') goToNext();
    });
    
    setTimeout(() => {
      scrollToIndex(0);
    }, 100);
    
    let resizeTimer;
    window.addEventListener('resize', () => {
      clearTimeout(resizeTimer);
      resizeTimer = setTimeout(() => {
        const slideWidth = track.querySelector('.project-carousel-slide').offsetWidth;
        if (slideWidth > 0) {
          track.scrollTo({
            left: currentIndex * slideWidth,
            behavior: 'auto'
          });
        }
      }, 200);
    });
  });
}
function toggleVideo(btn) {
  const slide = btn.closest('.project-carousel-slide');
  const wrapper = slide.querySelector('.mini-carousel-wrapper');
  const idx = parseInt(wrapper.dataset.miniIndex || '0', 10);
  const video = wrapper.querySelectorAll('.mini-video-item video')[idx];
 
  if (video.paused) {
    video.play();
    btn.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><rect x="6" y="5" width="4" height="14"/><rect x="14" y="5" width="4" height="14"/></svg>';
  } else {
    video.pause();
    btn.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
  }
}
 
function miniGoTo(wrapper, newIndex) {
  const track = wrapper.querySelector('.mini-carousel-track');
  const items = wrapper.querySelectorAll('.mini-video-item');
  const total = items.length;
  const clamped = (newIndex + total) % total;
 
  const currentIdx = parseInt(wrapper.dataset.miniIndex || '0', 10);
  const currentVideo = items[currentIdx].querySelector('video');
  currentVideo.pause();
  currentVideo.currentTime = 0;
  const slide = wrapper.closest('.project-carousel-slide');
  const playBtn = slide.querySelector('.video-play-btn');
  if (playBtn) playBtn.innerHTML = '<svg width="32" height="32" viewBox="0 0 24 24" fill="currentColor"><polygon points="5,3 19,12 5,21"/></svg>';
 
  wrapper.dataset.miniIndex = clamped;
  track.style.transform = `translateX(-${clamped * 100}%)`;
 
  const counter = wrapper.querySelector('.mini-counter');
  if (counter) counter.textContent = `${clamped + 1} / ${total}`;
}
 
function miniNext(btn) {
  const wrapper = btn.closest('.mini-carousel-wrapper');
  const idx = parseInt(wrapper.dataset.miniIndex || '0', 10);
  miniGoTo(wrapper, idx + 1);
}
 
function miniPrev(btn) {
  const wrapper = btn.closest('.mini-carousel-wrapper');
  const idx = parseInt(wrapper.dataset.miniIndex || '0', 10);
  miniGoTo(wrapper, idx - 1);
}
// ============================================
// 17. ANIMATION AU SURVOL DU TERMINAL
// ============================================
function initTerminalHover() {
  const terminal = document.querySelector('.terminal-card');
  if (!terminal) return;
  
  terminal.addEventListener('mouseenter', () => {
    const caret = terminal.querySelector('.caret');
    if (caret) {
      caret.style.animation = 'blink 0.5s steps(1) infinite';
    }
  });
  
  terminal.addEventListener('mouseleave', () => {
    const caret = terminal.querySelector('.caret');
    if (caret) {
      caret.style.animation = 'blink 1s steps(1) infinite';
    }
  });
}

// ============================================
// 18. GESTION DU THEME SYSTEME
// ============================================
function initSystemTheme() {
  const prefersDark = window.matchMedia('(prefers-color-scheme: dark)');
  console.log('Theme préféré:', prefersDark.matches ? 'dark' : 'light');
}

// ============================================
// 19. EFFET DE TYPAGE SUR LE TERMINAL
// ============================================
function initTerminalTypingEffect() {
  const commands = document.querySelectorAll('.terminal-body .command-highlight');
  commands.forEach(cmd => {
    cmd.style.color = '#a3e635';
    cmd.style.fontWeight = '600';
  });
}

// ============================================
// 20. NAVIGATION ACTIVE AU SCROLL
// ============================================
function initActiveNav() {
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.site-nav a');
  
  window.addEventListener('scroll', () => {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 120;
      if (window.pageYOffset >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    
    navLinks.forEach(link => {
      link.style.color = 'var(--text-secondary)';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = 'var(--text-primary)';
      }
    });
  });
}

// ============================================
// INITIALISATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
  setTimeout(typeEffect, 800);
  updateYear();
  revealOnScroll();
  initActiveNav();
  
  if (window.innerWidth > 768) {
    // init3DCards(); ← DÉSACTIVÉ
    initParallax();
    initTerminalHover();
  }
  
  initStickyNav();
  initScrollIndicator();
  initScrollProgress();
  initGlitchEffect();
  initSmoothScroll();
  initTerminalTypingEffect();
  initLazyImages();
  initOnlineStatus();
  initSystemTheme();
  initHorizontalCarousel();
  
  setTimeout(() => {
    animateSkillBars();
    animateCounters();
  }, 1000);
});

// ============================================
// GESTION DU REDIMENSIONNEMENT
// ============================================
let resizeTimer;
window.addEventListener('resize', () => {
  clearTimeout(resizeTimer);
  resizeTimer = setTimeout(() => {
    if (window.innerWidth <= 768) {
      document.querySelectorAll('.project-card, .skill-panel, .timeline-content, .mini-card')
        .forEach(card => {
          card.style.transform = 'none';
          card.style.transition = 'transform 0.3s ease';
        });
    }
  }, 250);
});

// ============================================
// PERFORMANCE - DÉSACTIVER LES ANIMATIONS 
// SI L'UTILISATEUR A UNE CONNEXION LENTE
// ============================================
if ('connection' in navigator) {
  const connection = navigator.connection;
  if (connection.saveData || connection.effectiveType === 'slow-2g') {
    document.documentElement.classList.add('reduce-motion');
    const style = document.createElement('style');
    style.textContent = `
      .orb, .profile-frame, .frame-ornament {
        animation: none !important;
      }
      .title-gradient {
        animation: none !important;
      }
    `;
    document.head.appendChild(style);
  }
}

console.log('🚀 Portfolio Bassissa Marwa chargé avec succès !');
console.log('💻 Développeuse Web Full Stack - React, Laravel, ERP');
console.log('📧 bassissa.marwa1@gmail.com');