// Blog Post JavaScript Functionality

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
    
    // Save theme preference to localStorage (if available)
    try {
      const isDarkMode = document.body.classList.contains('dark-mode');
      localStorage.setItem('darkMode', isDarkMode);
    } catch (e) {
      // localStorage not available, continue without saving
    }
  }
  
  // Load saved theme preference
  try {
    const savedTheme = localStorage.getItem('darkMode');
    if (savedTheme === 'true') {
      document.body.classList.add('dark-mode');
    }
  } catch (e) {
    // localStorage not available, use default theme
  }
  
  if (themeToggle) {
    themeToggle.addEventListener('click', toggleTheme);
  }
  
  if (mobileThemeToggle) {
    mobileThemeToggle.addEventListener('click', toggleTheme);
  }

  // Reading progress indicator
  createReadingProgress();

  // Smooth scrolling for anchor links
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

  // Share button functionality
  const shareButtons = document.querySelectorAll('.share-button');
  shareButtons.forEach(button => {
    button.addEventListener('click', handleShare);
  });

  // Copy code block functionality
  addCopyCodeButtons();

  // Image lazy loading and lightbox
  setupImageHandling();

  // Table of contents generation (if needed)
  generateTableOfContents();

  // Scroll animations
  setupScrollAnimations();
});

// Reading progress indicator
function createReadingProgress() {
  const progressBar = document.createElement('div');
  progressBar.className = 'reading-progress';
  progressBar.innerHTML = '<div class="reading-progress-bar"></div>';
  
  const styles = `
    .reading-progress {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 3px;
      background: rgba(0, 0, 0, 0.1);
      z-index: 1000;
    }
    
    .reading-progress-bar {
      height: 100%;
      background: #000;
      width: 0%;
      transition: width 0.3s ease;
    }
    
    .dark-mode .reading-progress {
      background: rgba(255, 255, 255, 0.1);
    }
    
    .dark-mode .reading-progress-bar {
      background: #fff;
    }
  `;
  
  const styleSheet = document.createElement('style');
  styleSheet.textContent = styles;
  document.head.appendChild(styleSheet);
  document.body.appendChild(progressBar);

  const progressBarFill = progressBar.querySelector('.reading-progress-bar');
  
  window.addEventListener('scroll', () => {
    const article = document.querySelector('.article-content');
    if (!article) return;
    
    const articleTop = article.offsetTop;
    const articleHeight = article.offsetHeight;
    const windowHeight = window.innerHeight;
    const scrollTop = window.pageYOffset;
    
    const articleBottom = articleTop + articleHeight - windowHeight;
    const progress = Math.max(0, Math.min(100, ((scrollTop - articleTop) / (articleBottom - articleTop)) * 100));
    
    progressBarFill.style.width = progress + '%';
  });
}

// Share functionality
function handleShare(e) {
  const platform = e.currentTarget.dataset.platform;
  const url = encodeURIComponent(window.location.href);
  const title = encodeURIComponent(document.title);
  const description = encodeURIComponent(
    document.querySelector('.article-subtitle')?.textContent || 
    document.querySelector('meta[name="description"]')?.content || ''
  );

  let shareUrl = '';

  switch (platform) {
    case 'twitter':
      shareUrl = `https://twitter.com/intent/tweet?url=${url}&text=${title}`;
      break;
    case 'linkedin':
      shareUrl = `https://linkedin.com/sharing/share-offsite/?url=${url}`;
      break;
    case 'facebook':
      shareUrl = `https://facebook.com/sharer/sharer.php?u=${url}`;
      break;
    default:
      // Copy to clipboard
      if (navigator.clipboard) {
        navigator.clipboard.writeText(window.location.href);
        showToast('Link copied to clipboard!');
        return;
      }
  }

  if (shareUrl) {
    window.open(shareUrl, '_blank', 'width=600,height=400');
  }
}

// Add copy buttons to code blocks
function addCopyCodeButtons() {
  const codeBlocks = document.querySelectorAll('.code-block');
  
  codeBlocks.forEach(block => {
    const button = document.createElement('button');
    button.className = 'copy-code-button';
    button.innerHTML = `
      <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
        <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
        <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
      </svg>
      Copy
    `;
    
    const styles = `
      .copy-code-button {
        position: absolute;
        top: 1rem;
        right: 1rem;
        background: rgba(255, 255, 255, 0.1);
        border: 1px solid rgba(255, 255, 255, 0.2);
        color: #fff;
        padding: 0.5rem 0.75rem;
        border-radius: 6px;
        font-size: 0.75rem;
        font-family: 'Fragment Mono', monospace;
        cursor: pointer;
        display: flex;
        align-items: center;
        gap: 0.25rem;
        transition: all 0.3s ease;
        opacity: 0.7;
      }
      
      .copy-code-button:hover {
        opacity: 1;
        background: rgba(255, 255, 255, 0.2);
      }
      
      .code-block {
        position: relative;
      }
    `;
    
    if (!document.querySelector('#copy-code-styles')) {
      const styleSheet = document.createElement('style');
      styleSheet.id = 'copy-code-styles';
      styleSheet.textContent = styles;
      document.head.appendChild(styleSheet);
    }
    
    button.addEventListener('click', async () => {
      const code = block.querySelector('code').textContent;
      
      try {
        await navigator.clipboard.writeText(code);
        button.innerHTML = `
          <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <polyline points="20,6 9,17 4,12"></polyline>
          </svg>
          Copied!
        `;
        
        setTimeout(() => {
          button.innerHTML = `
            <svg width="16" height="16" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <rect x="9" y="9" width="13" height="13" rx="2" ry="2"></rect>
              <path d="M5 15H4a2 2 0 01-2-2V4a2 2 0 012-2h9a2 2 0 012 2v1"></path>
            </svg>
            Copy
          `;
        }, 2000);
        
      } catch (err) {
        showToast('Failed to copy code');
      }
    });
    
    block.appendChild(button);
  });
}

// Image handling
function setupImageHandling() {
  const images = document.querySelectorAll('.article-content img');
  
  images.forEach(img => {
    // Add loading animation
    img.addEventListener('load', () => {
      img.style.opacity = '1';
    });
    
    // Add click handler for lightbox
    img.addEventListener('click', () => {
      openImageLightbox(img.src, img.alt);
    });
    
    img.style.cursor = 'pointer';
    img.style.transition = 'opacity 0.3s ease';
  });
}

// Simple lightbox for images
function openImageLightbox(src, alt) {
  const lightbox = document.createElement('div');
  lightbox.className = 'image-lightbox';
  lightbox.innerHTML = `
    <div class="lightbox-backdrop">
      <div class="lightbox-content">
        <img src="${src}" alt="${alt}">
        <button class="lightbox-close">
          <svg width="24" height="24" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>
      </div>
    </div>
  `;
  
  const styles = `
    .image-lightbox {
      position: fixed;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      z-index: 10000;
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .lightbox-backdrop {
      position: absolute;
      top: 0;
      left: 0;
      width: 100%;
      height: 100%;
      background: rgba(0, 0, 0, 0.9);
      display: flex;
      align-items: center;
      justify-content: center;
    }
    
    .lightbox-content {
      position: relative;
      max-width: 90%;
      max-height: 90%;
    }
    
    .lightbox-content img {
      max-width: 100%;
      max-height: 100%;
      object-fit: contain;
    }
    
    .lightbox-close {
      position: absolute;
      top: -3rem;
      right: 0;
      background: none;
      border: none;
      color: white;
      cursor: pointer;
      padding: 0.5rem;
    }
  `;
  
  if (!document.querySelector('#lightbox-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'lightbox-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
  
  document.body.appendChild(lightbox);
  
  // Close handlers
  lightbox.querySelector('.lightbox-close').addEventListener('click', () => {
    document.body.removeChild(lightbox);
  });
  
  lightbox.querySelector('.lightbox-backdrop').addEventListener('click', (e) => {
    if (e.target === e.currentTarget) {
      document.body.removeChild(lightbox);
    }
  });
  
  // Escape key handler
  const escapeHandler = (e) => {
    if (e.key === 'Escape') {
      document.body.removeChild(lightbox);
      document.removeEventListener('keydown', escapeHandler);
    }
  };
  
  document.addEventListener('keydown', escapeHandler);
}

// Generate table of contents
function generateTableOfContents() {
  const headings = document.querySelectorAll('.article-content h2, .article-content h3');
  if (headings.length < 3) return; // Only generate TOC if there are enough headings
  
  const toc = document.createElement('div');
  toc.className = 'table-of-contents';
  toc.innerHTML = '<h4>Table of Contents</h4><ul class="toc-list"></ul>';
  
  const tocList = toc.querySelector('.toc-list');
  
  headings.forEach((heading, index) => {
    const id = `heading-${index}`;
    heading.id = id;
    
    const li = document.createElement('li');
    li.className = `toc-item toc-${heading.tagName.toLowerCase()}`;
    
    const a = document.createElement('a');
    a.href = `#${id}`;
    a.textContent = heading.textContent;
    a.className = 'toc-link';
    
    li.appendChild(a);
    tocList.appendChild(li);
  });
  
  const styles = `
    .table-of-contents {
      background: rgba(0, 0, 0, 0.02);
      border: 1px solid rgba(0, 0, 0, 0.08);
      border-radius: 12px;
      padding: 1.5rem;
      margin: 2rem 0;
      font-family: 'Inter', sans-serif;
    }
    
    .table-of-contents h4 {
      margin: 0 0 1rem 0;
      font-size: 1rem;
      font-weight: 600;
      color: #000;
    }
    
    .toc-list {
      list-style: none;
      padding: 0;
      margin: 0;
    }
    
    .toc-item {
      margin-bottom: 0.5rem;
    }
    
    .toc-h3 {
      margin-left: 1rem;
    }
    
    .toc-link {
      color: #666;
      text-decoration: none;
      font-size: 0.875rem;
      line-height: 1.5;
      transition: color 0.3s ease;
    }
    
    .toc-link:hover {
      color: #000;
    }
    
    .dark-mode .table-of-contents {
      background: rgba(255, 255, 255, 0.02);
      border-color: rgba(255, 255, 255, 0.08);
    }
    
    .dark-mode .table-of-contents h4 {
      color: #fff;
    }
    
    .dark-mode .toc-link {
      color: #aaa;
    }
    
    .dark-mode .toc-link:hover {
      color: #fff;
    }
  `;
  
  if (!document.querySelector('#toc-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'toc-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
  
  // Insert TOC after the first section
  const firstSection = document.querySelector('.article-section');
  if (firstSection) {
    firstSection.parentNode.insertBefore(toc, firstSection.nextSibling);
  }
}

// Scroll animations
function setupScrollAnimations() {
  const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in');
      }
    });
  }, observerOptions);

  // Observe sections for animation
  const sections = document.querySelectorAll('.article-section');
  sections.forEach((section) => {
    section.style.opacity = '0';
    section.style.transform = 'translateY(20px)';
    section.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(section);
  });

  // Add animate-in class styles
  const animationStyles = `
    .animate-in {
      opacity: 1 !important;
      transform: translateY(0) !important;
    }
  `;
  
  if (!document.querySelector('#animation-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'animation-styles';
    styleSheet.textContent = animationStyles;
    document.head.appendChild(styleSheet);
  }
}

// Toast notification helper
function showToast(message, duration = 3000) {
  const toast = document.createElement('div');
  toast.className = 'toast-notification';
  toast.textContent = message;
  
  const styles = `
    .toast-notification {
      position: fixed;
      bottom: 2rem;
      right: 2rem;
      background: #000;
      color: #fff;
      padding: 1rem 1.5rem;
      border-radius: 8px;
      font-family: 'Fragment Mono', monospace;
      font-size: 0.875rem;
      z-index: 10000;
      animation: slideInUp 0.3s ease, slideOutDown 0.3s ease ${duration - 300}ms forwards;
    }
    
    @keyframes slideInUp {
      from {
        transform: translateY(100%);
        opacity: 0;
      }
      to {
        transform: translateY(0);
        opacity: 1;
      }
    }
    
    @keyframes slideOutDown {
      from {
        transform: translateY(0);
        opacity: 1;
      }
      to {
        transform: translateY(100%);
        opacity: 0;
      }
    }
    
    .dark-mode .toast-notification {
      background: #fff;
      color: #000;
    }
  `;
  
  if (!document.querySelector('#toast-styles')) {
    const styleSheet = document.createElement('style');
    styleSheet.id = 'toast-styles';
    styleSheet.textContent = styles;
    document.head.appendChild(styleSheet);
  }
  
  document.body.appendChild(toast);
  
  setTimeout(() => {
    if (document.body.contains(toast)) {
      document.body.removeChild(toast);
    }
  }, duration);
}