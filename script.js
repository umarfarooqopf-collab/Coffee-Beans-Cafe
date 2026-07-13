document.addEventListener('DOMContentLoaded', () => {

  // --- Scroll Animations (Intersection Observer) ---
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('active');
        observer.unobserve(entry.target); // Only animate once
      }
    });
  }, observerOptions);

  const revealElements = document.querySelectorAll('.reveal');
  revealElements.forEach(el => observer.observe(el));


  // --- Menu Tabs Logic ---
  const tabs = document.querySelectorAll('.menu-tab');
  const menuItems = document.querySelectorAll('.menu-item');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs
      tabs.forEach(t => t.classList.remove('active'));
      // Add active class to clicked tab
      tab.classList.add('active');

      const targetCategory = tab.getAttribute('data-target');

      // Filter items with smooth fade out/in
      menuItems.forEach(item => {
        // Reset animation
        item.classList.remove('active');

        if (targetCategory === 'all' || item.getAttribute('data-category') === targetCategory) {
          item.style.display = 'block';
          // Trigger reflow/short delay to allow transition
          setTimeout(() => {
            item.classList.add('active');
          }, 50);
        } else {
          item.style.display = 'none';
        }
      });
    });
  });


  // --- Mobile Menu Toggle ---
  const hamburger = document.getElementById('hamburger');
  const navMenu = document.querySelector('.nav-menu');

  if (hamburger && navMenu) {
    hamburger.addEventListener('click', () => {
      navMenu.classList.toggle('active');
      hamburger.classList.toggle('active');
    });

    // Close menu when a link is clicked
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        navMenu.classList.remove('active');
        hamburger.classList.remove('active');
      });
    });
  }

  // --- Stats Counter Logic ---
  const statsSection = document.getElementById('stats');
  const counters = document.querySelectorAll('.stat-number');
  let started = false; // Flag to ensure animation runs only once

  if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
      if (entries[0].isIntersecting && !started) {
        started = true;
        counters.forEach(counter => {
          const target = +counter.getAttribute('data-target');
          const duration = 2000; // Animation duration in ms
          const increment = target / (duration / 16); // 60fps

          let current = 0;
          const updateCounter = () => {
            current += increment;
            if (current < target) {
              counter.innerText = Math.ceil(current) + "+"; // Use Math.ceil for cleaner integers
              requestAnimationFrame(updateCounter);
            } else {
              counter.innerText = target + "+";
            }
          };
          updateCounter();
        });
      }
    }, { threshold: 0.5 }); // Trigger when 50% visible

    statsObserver.observe(statsSection);
  }

  // --- Surprise Me AI Button ---
  const surpriseBtn = document.getElementById('surpriseMeBtn');

  if (surpriseBtn) {
    surpriseBtn.addEventListener('click', () => {
      // Scroll to menu
      const menuSection = document.getElementById('menu');
      menuSection.scrollIntoView({ behavior: 'smooth' });

      // Pick a random visible item after scroll finishes (approx)
      setTimeout(() => {
        const visibleItems = Array.from(menuItems).filter(item => item.style.display !== 'none');
        if (visibleItems.length > 0) {
          const randomItem = visibleItems[Math.floor(Math.random() * visibleItems.length)];

          // Add a temporary highlight effect
          randomItem.style.transform = 'scale(1.05)';
          randomItem.style.boxShadow = '0 0 20px var(--color-caramel)';

          // Flash effect
          setTimeout(() => {
            randomItem.style.transform = '';
            randomItem.style.boxShadow = '';
          }, 1500);
        }
      }, 800);
    });
  }

});
