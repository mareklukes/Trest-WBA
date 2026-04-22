document.addEventListener('DOMContentLoaded', () => {
  // --- 1. Dynamic Year in Footer ---
  const yearEl = document.getElementById('year');
  if (yearEl) yearEl.textContent = new Date().getFullYear();

  // --- 2. Mobile Menu Toggle ---
  const mobileMenuBtn = document.getElementById('mobile-menu-btn');
  const mobileMenu = document.getElementById('mobile-menu');
  if (mobileMenuBtn && mobileMenu) {
    mobileMenuBtn.addEventListener('click', () => {
      mobileMenu.classList.toggle('hidden');
    });
  }

  // --- 3. Dark Mode Toggle ---
  const themeToggleBtn = document.getElementById('theme-toggle');
  const darkIcon = document.getElementById('theme-toggle-dark-icon');
  const lightIcon = document.getElementById('theme-toggle-light-icon');

  if (themeToggleBtn) {
    // Check initial state
    if (localStorage.getItem('color-theme') === 'dark' || (!('color-theme' in localStorage) && window.matchMedia('(prefers-color-scheme: dark)').matches)) {
      document.documentElement.classList.add('dark');
      lightIcon.classList.remove('hidden');
    } else {
      document.documentElement.classList.remove('dark');
      darkIcon.classList.remove('hidden');
    }

    themeToggleBtn.addEventListener('click', () => {
      darkIcon.classList.toggle('hidden');
      lightIcon.classList.toggle('hidden');

      if (localStorage.getItem('color-theme')) {
        if (localStorage.getItem('color-theme') === 'light') {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        } else {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        }
      } else {
        if (document.documentElement.classList.contains('dark')) {
          document.documentElement.classList.remove('dark');
          localStorage.setItem('color-theme', 'light');
        } else {
          document.documentElement.classList.add('dark');
          localStorage.setItem('color-theme', 'dark');
        }
      }
    });
  }

  // --- 4. Hero Carousel (Homepage) ---
  const slides = document.querySelectorAll('.carousel-slide');
  const dots = document.querySelectorAll('.carousel-dot');
  if (slides.length > 0) {
    let currentSlide = 0;
    const totalSlides = slides.length;

    const goToSlide = (index) => {
      slides[currentSlide].classList.replace('opacity-100', 'opacity-0');
      slides[currentSlide].classList.replace('z-10', 'z-0');
      dots[currentSlide].classList.replace('bg-secondary', 'bg-white/50');
      dots[currentSlide].classList.remove('scale-125');

      currentSlide = index;

      slides[currentSlide].classList.replace('opacity-0', 'opacity-100');
      slides[currentSlide].classList.replace('z-0', 'z-10');
      dots[currentSlide].classList.replace('bg-white/50', 'bg-secondary');
      dots[currentSlide].classList.add('scale-125');
    };

    dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const target = parseInt(e.target.getAttribute('data-target'));
        goToSlide(target);
      });
    });

    // Auto Advance
    setInterval(() => {
      let next = (currentSlide + 1) % totalSlides;
      goToSlide(next);
    }, 5000);
  }

  // --- 5. Athletics Season Switcher ---
  const seasonBtns = document.querySelectorAll('.season-btn');
  const seasonPanels = document.querySelectorAll('.season-panel');
  
  if (seasonBtns.length > 0) {
    seasonBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Reset all
        seasonBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-white');
          b.classList.add('bg-white', 'text-gray-700', 'dark:bg-gray-800', 'dark:text-gray-300');
        });
        seasonPanels.forEach(p => p.classList.add('hidden'));

        // Activate selected
        btn.classList.add('bg-primary', 'text-white');
        btn.classList.remove('bg-white', 'text-gray-700', 'dark:bg-gray-800', 'dark:text-gray-300');
        
        const targetPanel = document.getElementById(btn.getAttribute('data-target'));
        if (targetPanel) {
          targetPanel.classList.remove('hidden');
          // Add a small fade animation
          targetPanel.classList.add('animate-fade-in');
        }
      });
    });
  }

  // --- 6. FAQ Accordion ---
  const faqButtons = document.querySelectorAll('.faq-btn');
  if (faqButtons.length > 0) {
    faqButtons.forEach(btn => {
      btn.addEventListener('click', () => {
        const faqContent = btn.nextElementSibling;
        const arrow = btn.querySelector('.arrow');
        const isExpanded = btn.getAttribute('aria-expanded') === 'true';

        faqButtons.forEach(otherBtn => {
          if (otherBtn !== btn) {
            otherBtn.setAttribute('aria-expanded', 'false');
            otherBtn.nextElementSibling.classList.add('hidden');
            if(otherBtn.querySelector('.arrow')) otherBtn.querySelector('.arrow').classList.remove('rotate-180');
          }
        });

        if (isExpanded) {
          btn.setAttribute('aria-expanded', 'false');
          faqContent.classList.add('hidden');
          if(arrow) arrow.classList.remove('rotate-180');
        } else {
          btn.setAttribute('aria-expanded', 'true');
          faqContent.classList.remove('hidden');
          if(arrow) arrow.classList.add('rotate-180');
        }
      });
    });
  }

  // --- 7. Contact Form Mock ---
  const contactForm = document.getElementById('contact-form');
  const formSuccessMessage = document.getElementById('form-success-msg');
  if (contactForm && formSuccessMessage) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      contactForm.reset();
      formSuccessMessage.classList.remove('hidden');
      setTimeout(() => {
        formSuccessMessage.classList.add('hidden');
      }, 5000);
    });
  }
  // --- 8. Counter Animation (Pride of TR) ---
  const counters = document.querySelectorAll('.counter');
  if (counters.length > 0) {
    const observerOptions = {
      root: null,
      rootMargin: '0px',
      threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = +entry.target.getAttribute('data-target');
          const duration = 2000; // ms
          const increment = target / (duration / 16); // 60fps
          
          let current = 0;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              entry.target.innerText = Math.ceil(current);
              requestAnimationFrame(updateCounter);
            } else {
              entry.target.innerText = target;
            }
          };
          updateCounter();
          observer.unobserve(entry.target);
        }
      });
    }, observerOptions);

    counters.forEach(counter => {
      observer.observe(counter);
    });
  }

  // --- 9. Student Voice Slider ---
  const studSlides = document.querySelectorAll('.student-slide');
  const studDots = document.querySelectorAll('.stud-dot');
  if (studSlides.length > 0) {
    let currentStudSlide = 0;
    const totalStudSlides = studSlides.length;

    const goToStudSlide = (index) => {
      studSlides[currentStudSlide].classList.replace('opacity-100', 'opacity-0');
      studSlides[currentStudSlide].classList.replace('z-10', 'z-0');
      studDots[currentStudSlide].classList.replace('bg-primary', 'bg-gray-300');
      studDots[currentStudSlide].classList.remove('dark:bg-gray-600');

      currentStudSlide = index;

      studSlides[currentStudSlide].classList.replace('opacity-0', 'opacity-100');
      studSlides[currentStudSlide].classList.replace('z-0', 'z-10');
      studDots[currentStudSlide].classList.replace('bg-gray-300', 'bg-primary');
      studDots[currentStudSlide].classList.remove('dark:bg-gray-600');
    };

    studDots.forEach(dot => {
      dot.addEventListener('click', (e) => {
        const target = parseInt(e.target.getAttribute('data-target'));
        goToStudSlide(target);
      });
    });

    // Auto Advance
    setInterval(() => {
      let next = (currentStudSlide + 1) % totalStudSlides;
      goToStudSlide(next);
    }, 6000);
  }

  // --- 10. Live Clock ---
  const clockElement = document.getElementById('live-clock');
  if (clockElement) {
    const updateClock = () => {
      const now = new Date();
      let hours = now.getHours();
      let minutes = now.getMinutes();
      let seconds = now.getSeconds();
      const ampm = hours >= 12 ? 'PM' : 'AM';
      
      hours = hours % 12;
      hours = hours ? hours : 12; // the hour '0' should be '12'
      minutes = minutes < 10 ? '0' + minutes : minutes;
      seconds = seconds < 10 ? '0' + seconds : seconds;
      
      const strTime = hours + ':' + minutes + ':' + seconds + ' ' + ampm;
      clockElement.textContent = strTime;
    };
    updateClock(); // Initial call
    setInterval(updateClock, 1000);
  }

  // --- 11. Interactive Academic Calendar Tabs ---
  const calBtns = document.querySelectorAll('.calendar-btn');
  const calPanels = document.querySelectorAll('.calendar-pane');
  if (calBtns.length > 0) {
    calBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Reset all buttons
        calBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-white', 'border-primary');
          b.classList.add('bg-gray-100', 'text-gray-700', 'dark:bg-gray-800', 'dark:text-gray-300', 'border-transparent');
        });
        // Hide all panels
        calPanels.forEach(p => p.classList.add('hidden'));

        // Activate clicked button
        btn.classList.add('bg-primary', 'text-white', 'border-primary');
        btn.classList.remove('bg-gray-100', 'text-gray-700', 'dark:bg-gray-800', 'dark:text-gray-300', 'border-transparent');
        
        // Show target panel
        const targetId = btn.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.remove('hidden');
          targetPanel.classList.add('animate-fade-in');
        }
      });
    });
  }
  // --- 12. Interactive Bell Schedule Tabs ---
  const bellBtns = document.querySelectorAll('.bell-btn');
  const bellPanels = document.querySelectorAll('.bell-pane');
  if (bellBtns.length > 0) {
    bellBtns.forEach(btn => {
      btn.addEventListener('click', () => {
        // Reset all buttons
        bellBtns.forEach(b => {
          b.classList.remove('bg-primary', 'text-white', 'border-primary');
          b.classList.add('bg-gray-200', 'text-gray-700', 'dark:bg-gray-800', 'dark:text-gray-300', 'border-transparent');
        });
        // Hide all panels
        bellPanels.forEach(p => p.classList.add('hidden'));

        // Activate clicked button
        btn.classList.add('bg-primary', 'text-white', 'border-primary');
        btn.classList.remove('bg-gray-200', 'text-gray-700', 'dark:bg-gray-800', 'dark:text-gray-300', 'border-transparent');
        
        // Show target panel
        const targetId = btn.getAttribute('data-target');
        const targetPanel = document.getElementById(targetId);
        if (targetPanel) {
          targetPanel.classList.remove('hidden');
          targetPanel.classList.add('animate-fade-in');
        }
      });
    });
  }

  // --- 13. Interactive Club Finder ---
  const clubSearch = document.getElementById('club-search');
  const clubCards = document.querySelectorAll('.club-card');
  const emptyState = document.getElementById('club-empty-state');
  
  if (clubSearch && clubCards.length > 0) {
    clubSearch.addEventListener('input', (e) => {
      const query = e.target.value.toLowerCase();
      let visibleCount = 0;
      
      clubCards.forEach(card => {
        const clubData = card.getAttribute('data-club').toLowerCase();
        if (clubData.includes(query)) {
          card.classList.remove('hidden');
          visibleCount++;
        } else {
          card.classList.add('hidden');
        }
      });
      
      if (visibleCount === 0) {
        emptyState.classList.remove('hidden');
      } else {
        emptyState.classList.add('hidden');
      }
    });
  }
});
