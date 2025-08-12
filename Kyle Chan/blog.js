// Blog-specific JavaScript
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
      // Save theme preference
      const isDark = document.body.classList.contains('dark-mode');
      localStorage.setItem('theme', isDark ? 'dark' : 'light');
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
  
    // Blog post animations
    const blogPosts = document.querySelectorAll('.blog-post');
    const observer = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('animate-in');
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -50px 0px'
    });
  
    blogPosts.forEach((post) => {
      observer.observe(post);
    });
  
    // Header animation
    const blogHeader = document.querySelector('.blog-header-content');
    if (blogHeader) {
      setTimeout(() => {
        blogHeader.classList.add('animate-in');
      }, 200);
    }
  
    // Smooth scrolling for internal links (if any)
    const internalLinks = document.querySelectorAll('a[href^="#"]');
    internalLinks.forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const target = document.querySelector(link.getAttribute('href'));
        if (target) {
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
        }
      });
    });
  });