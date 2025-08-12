// Contact page JavaScript
document.addEventListener('DOMContentLoaded', () => {
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuButton = document.getElementById('close-menu');
  
    if (mobileMenuButton && mobileMenu && closeMenuButton) {
      mobileMenuButton.addEventListener('click', () => {
        mobileMenu.classList.add('open');
      });
  
      closeMenuButton.addEventListener('click', () => {
        mobileMenu.classList.remove('open');
      });
  
      // Close mobile menu when clicking outside
      document.addEventListener('click', (e) => {
        if (!mobileMenu.contains(e.target) && !mobileMenuButton.contains(e.target)) {
          mobileMenu.classList.remove('open');
        }
      });
    }
  
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    function toggleTheme() {
      document.body.classList.toggle('dark-mode');
      
      // Store theme preference
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDarkMode ? 'dark' : 'light');
    }
    
    // Load saved theme
    const savedTheme = localStorage.getItem('theme');
    if (savedTheme === 'dark') {
      document.body.classList.add('dark-mode');
    }
    
    if (themeToggle) {
      themeToggle.addEventListener('click', toggleTheme);
    }
    
    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener('click', toggleTheme);
    }
  
    // Contact card animation
    const contactCard = document.querySelector('.contact-card');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -20px 0px'
    });
  
    if (contactCard) {
      observer.observe(contactCard);
    }
  
    // Header animation
    const contactHeader = document.querySelector('.contact-header-content');
    if (contactHeader) {
      setTimeout(() => {
        contactHeader.classList.add('animate-in');
      }, 100);
    }
  
    // Contact method click handlers
    const contactMethods = document.querySelectorAll('.contact-method');
    contactMethods.forEach(method => {
      method.addEventListener('click', (e) => {
        const link = method.querySelector('a');
        if (link && !e.target.closest('a')) {
          // Trigger the link click if clicking on the method but not directly on the link
          link.click();
        }
      });
  
      // Add hover effect for icons
      method.addEventListener('mouseenter', () => {
        const icon = method.querySelector('.contact-icon');
        if (icon) {
          icon.style.transform = 'scale(1.05)';
        }
      });
  
      method.addEventListener('mouseleave', () => {
        const icon = method.querySelector('.contact-icon');
        if (icon) {
          icon.style.transform = 'scale(1)';
        }
      });
    });
  
    // Email click tracking (optional analytics)
    const emailLink = document.querySelector('a[href^="mailto:"]');
    if (emailLink) {
      emailLink.addEventListener('click', () => {
        // You can add analytics tracking here if needed
        console.log('Email contact initiated');
      });
    }
  
    // Add subtle animation to availability dot
    const availabilityDot = document.querySelector('.availability-dot');
    if (availabilityDot) {
      // Add extra glow effect on hover
      const availabilityStatus = document.querySelector('.availability-status');
      if (availabilityStatus) {
        availabilityStatus.addEventListener('mouseenter', () => {
          availabilityDot.style.boxShadow = '0 0 0 4px rgba(34, 197, 94, 0.2)';
        });
        
        availabilityStatus.addEventListener('mouseleave', () => {
          availabilityDot.style.boxShadow = '';
        });
      }
    }
  
    // Smooth scroll for any internal links (if added later)
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
      anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  });