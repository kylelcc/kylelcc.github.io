document.addEventListener('DOMContentLoaded', () => {
    // Updated text content structure with separate lines for subtitle
    const textContent = [
      {
        text: "kpi-tracking market-research competitive-analysis customer-insights",
        type: "background"
      },
      {
        text: "machine learning ETL strategic insight data pipelines traffic",
        type: "background"
      },
      {
        text: "cross-functional-teams streamline innovate data storytelling Python",
        type: "background"
      },
      {
        text: "mining predictive modeling automation workflow optimization mentorship",
        type: "background"
      },
      {
        text: "empathy stakeholder-engagement project-management critical thinking",
        type: "background"
      },
      {
        text: "decision-making feedback-delivery agile-methodology scrum innovative",
        type: "background"
      },
      {
        text: "natural-language-processing **Kyle Chan** sentiment-analysis technical",
        type: "mixed"
      },
      {
        text: "a-b-testing data-governance regression scalable statistical-analysis",
        type: "background"
      },
      {
        text: "google-analytics cloud **Transforming Data Noise into** business-intelligence",
        type: "mixed"
      },
      {
        text: "backlink-building **Actionable Insights** data-storytelling",
        type: "mixed"
      },
      {
        text: "actionable visualize content-optimization semscalable insights growth mindset",
        type: "background"
      },
      {
        text: "data-driven decision making resourcefulness curiosity ahref customer-insights",
        type: "background"
      },
      {
        text: "real-time data processing self-taught visualize human-centered git docker excel",
        type: "background"
      },
      {
        text: "evaluation tuning data validation ROI data profiling hypothesis analytical-mindset",
        type: "background"
      },
      {
        text: "resilience SQL curiosity collaboration communication moz google-tag-manager",
        type: "background"
      },
      {
        text: "orchestration API integration warehousing lakes anomaly automation power-bi",
        type: "background"
      },
      {
        text: "domain-authority local-seo ux conversion-rate-optimization stakeholder-engagement",
        type: "background"
      }
    ];
  
    // Initialize text content
    initTextContent(textContent);
    
    // Mobile menu functionality
    const mobileMenuButton = document.getElementById('mobile-menu-button');
    const mobileMenu = document.getElementById('mobile-menu');
    const closeMenuButton = document.getElementById('close-menu');
  
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
  
    // Theme toggle functionality
    const themeToggle = document.getElementById('theme-toggle');
    const mobileThemeToggle = document.getElementById('mobile-theme-toggle');
    
    function toggleTheme() {
      document.body.classList.toggle('dark-mode');
      // Force refresh of hero text colors after theme change
      setTimeout(() => {
        refreshHeroTextColors();
      }, 50);
    }
    
    themeToggle.addEventListener('click', toggleTheme);
    if (mobileThemeToggle) {
      mobileThemeToggle.addEventListener('click', toggleTheme);
    }
  
    // Handle visibility change (tab switching) to fix background text visibility
    document.addEventListener('visibilitychange', () => {
      if (!document.hidden) {
        // Refresh background text visibility when tab becomes visible
        setTimeout(() => {
          refreshBackgroundTextVisibility();
        }, 100);
      }
    });
  });
  
  /**
   * Refresh hero text colors based on current theme
   */
  function refreshHeroTextColors() {
    const isDarkMode = document.body.classList.contains('dark-mode');
    const heroElements = document.querySelectorAll('.hero-name, .hero-subtitle, .hero-subtitle-part');
    
    heroElements.forEach(element => {
      if (isDarkMode) {
        element.style.color = '#ffffff';
      } else {
        element.style.color = '#000000';
      }
      element.style.opacity = '1';
    });
  }
  
  /**
   * Refresh background text visibility
   */
  function refreshBackgroundTextVisibility() {
    const bgTexts = document.querySelectorAll('.bg-text');
    bgTexts.forEach(text => {
      if (text.classList.contains('show')) {
        text.style.opacity = '0.6';
      }
    });
  }
  
  /**
   * Initialize the text content with proper formatting
   */
  function initTextContent(textContent) {
    const container = document.getElementById('text-container');
    
    textContent.forEach((line, lineIndex) => {
      const lineDiv = document.createElement('div');
      lineDiv.className = 'text-line';
      
      if (line.type === 'mixed') {
        // Parse mixed content with hero text
        const parts = line.text.split('**');
        
        // Create a wrapper for better centering
        const wrapperDiv = document.createElement('div');
        wrapperDiv.className = 'mixed-line-wrapper';
        
        parts.forEach((part, partIndex) => {
          if (part.trim() === '') return;
          
          if (partIndex % 2 === 1) {
            // This is hero text (between **)
            if (part === 'Kyle Chan') {
              const heroSpan = document.createElement('span');
              heroSpan.className = 'hero-name';
              heroSpan.id = 'hero-name';
              heroSpan.textContent = part;
              wrapperDiv.appendChild(heroSpan);
            } else if (part === 'Transforming Data Noise into') {
              const heroSpan = document.createElement('span');
              heroSpan.className = 'hero-subtitle-part';
              heroSpan.id = 'hero-subtitle-part-1';
              heroSpan.textContent = part;
              wrapperDiv.appendChild(heroSpan);
            } else if (part === 'Actionable Insights') {
              const heroSpan = document.createElement('span');
              heroSpan.className = 'hero-subtitle-part';
              heroSpan.id = 'hero-subtitle-part-2';
              heroSpan.textContent = part;
              wrapperDiv.appendChild(heroSpan);
            }
          } else {
            // This is background text
            if (part.trim()) {
              const words = part.trim().split(' ');
              words.forEach((word, wordIndex) => {
                if (word.trim()) {
                  const wordSpan = document.createElement('span');
                  wordSpan.className = 'bg-text';
                  wordSpan.textContent = word;
                  wrapperDiv.appendChild(wordSpan);
                  
                  // Add space after each word except the last
                  if (wordIndex < words.length - 1) {
                    const spaceSpan = document.createElement('span');
                    spaceSpan.className = 'bg-text';
                    spaceSpan.textContent = ' ';
                    wrapperDiv.appendChild(spaceSpan);
                  }
                }
              });
            }
          }
          
          // Add space between parts
          if (partIndex < parts.length - 1) {
            wrapperDiv.appendChild(document.createTextNode(' '));
          }
        });
        
        lineDiv.appendChild(wrapperDiv);
        container.appendChild(lineDiv);
      } else if (line.type === 'background' && line.text.trim()) {
        // Regular background text
        const words = line.text.split(' ');
        words.forEach((word, wordIndex) => {
          if (word.trim()) {
            const wordSpan = document.createElement('span');
            wordSpan.className = 'bg-text';
            wordSpan.textContent = word;
            lineDiv.appendChild(wordSpan);
            
            // Add space after each word except the last
            if (wordIndex < words.length - 1) {
              const spaceSpan = document.createElement('span');
              spaceSpan.className = 'bg-text';
              spaceSpan.textContent = ' ';
              lineDiv.appendChild(spaceSpan);
            }
          }
        });
        container.appendChild(lineDiv);
      } else {
        // Empty line
        lineDiv.innerHTML = '&nbsp;';
        container.appendChild(lineDiv);
      }
    });
    
    // Animate background text - all at once with random scrambling
    const bgTexts = document.querySelectorAll('.bg-text');
    bgTexts.forEach((text, index) => {
      text.classList.add('show');
      setTimeout(() => {
        scrambleTextRandom(text, text.textContent, 2000);
        
        // Occasional rescramble effect
        setInterval(() => {
          if (Math.random() < 0.0003) {
            scrambleTextRandomBriefly(text, text.textContent);
          }
        }, 15000);
      }, Math.random() * 500);
    });
    
    // Animate hero text with faster duration
    const heroName = document.getElementById('hero-name');
    const heroSubtitlePart1 = document.getElementById('hero-subtitle-part-1');
    const heroSubtitlePart2 = document.getElementById('hero-subtitle-part-2');
    
    if (heroName) {
      setTimeout(() => {
        heroName.classList.add('show');
        scrambleTextRandom(heroName, heroName.textContent, 800);
      }, 500);
    }
    
    if (heroSubtitlePart1) {
      setTimeout(() => {
        heroSubtitlePart1.classList.add('show');
        scrambleTextRandom(heroSubtitlePart1, heroSubtitlePart1.textContent, 1000);
      }, 700);
    }
    
    if (heroSubtitlePart2) {
      setTimeout(() => {
        heroSubtitlePart2.classList.add('show');
        scrambleTextRandom(heroSubtitlePart2, heroSubtitlePart2.textContent, 1200);
      }, 900);
    }
  }
  
  /**
   * Creates a random scrambling text effect
   */
  function scrambleTextRandom(element, finalText, duration = 1000) {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iteration = 0;
    const maxIterations = 20;
    
    // Create array to track which characters are revealed
    const revealOrder = Array.from({length: finalText.length}, (_, i) => i)
      .sort(() => Math.random() - 0.5);
    
    // Determine if this is a hero element and get proper color
    const isHeroElement = element.classList.contains('hero-name') || 
                         element.classList.contains('hero-subtitle') || 
                         element.classList.contains('hero-subtitle-part');
    
    const interval = setInterval(() => {
      const revealedCount = Math.floor((iteration / maxIterations) * finalText.length);
      const revealedIndices = new Set(revealOrder.slice(0, revealedCount));
      
      const currentText = finalText.split('')
        .map((char, index) => {
          if (char === ' ') return ' ';
          if (revealedIndices.has(index)) {
            return char;
          }
          return chars[Math.floor(Math.random() * chars.length)];
        })
        .join('');
      
      element.textContent = currentText;
      
      // Set proper colors during animation
      if (iteration < maxIterations) {
        if (isHeroElement) {
          const isDarkMode = document.body.classList.contains('dark-mode');
          element.style.color = isDarkMode ? '#ffffff' : '#000000';
        } else {
          element.style.color = '#000000';
        }
        element.style.opacity = '1';
      }
      
      if (iteration >= maxIterations) {
        clearInterval(interval);
        element.textContent = finalText;
        
        // Set final colors properly
        if (isHeroElement) {
          const isDarkMode = document.body.classList.contains('dark-mode');
          element.style.color = isDarkMode ? '#ffffff' : '#000000';
          element.style.opacity = '1';
        } else {
          // Reset background text to default styles
          element.style.color = '';
          element.style.opacity = '';
        }
      }
      
      iteration += 1;
    }, duration / maxIterations);
  }
  
  /**
   * Briefly scrambles the text randomly and then returns it to normal
   */
  function scrambleTextRandomBriefly(element, originalText) {
    const chars = '!<>-_\\/[]{}—=+*^?#________';
    let iterations = 0;
    const maxIterations = 12;
    
    // Determine if this is a hero element
    const isHeroElement = element.classList.contains('hero-name') || 
                         element.classList.contains('hero-subtitle') || 
                         element.classList.contains('hero-subtitle-part');
    
    const interval = setInterval(() => {
      if (iterations < maxIterations / 3) {
        // Full scramble phase
        const scrambledText = originalText.split('')
          .map(char => char === ' ' ? ' ' : chars[Math.floor(Math.random() * chars.length)])
          .join('');
        element.textContent = scrambledText;
        
        // Use appropriate colors during scramble
        if (isHeroElement) {
          const isDarkMode = document.body.classList.contains('dark-mode');
          element.style.color = isDarkMode ? '#cccccc' : '#666666';
          element.style.opacity = '0.8';
        } else {
          const isDarkMode = document.body.classList.contains('dark-mode');
          element.style.color = isDarkMode ? '#444444' : '#E8E8E8';
          element.style.opacity = '0.6';
        }
      } else {
        // Random reveal phase
        const revealProgress = (iterations - maxIterations/3) / (maxIterations*2/3);
        const shouldRevealCount = Math.floor(revealProgress * originalText.length);
        
        const indices = Array.from({length: originalText.length}, (_, i) => i)
          .filter(i => originalText[i] !== ' ')
          .sort(() => Math.random() - 0.5);
        
        const revealedIndices = new Set(indices.slice(0, shouldRevealCount));
        
        const currentText = originalText.split('')
          .map((char, index) => {
            if (char === ' ') return ' ';
            if (revealedIndices.has(index)) return char;
            return chars[Math.floor(Math.random() * chars.length)];
          })
          .join('');
        
        element.textContent = currentText;
        
        // Use appropriate colors during reveal
        if (isHeroElement) {
          const isDarkMode = document.body.classList.contains('dark-mode');
          element.style.color = isDarkMode ? '#cccccc' : '#666666';
          element.style.opacity = '0.8';
        } else {
          const isDarkMode = document.body.classList.contains('dark-mode');
          element.style.color = isDarkMode ? '#444444' : '#E8E8E8';
          element.style.opacity = '0.6';
        }
      }
      
      iterations++;
      
      if (iterations >= maxIterations) {
        clearInterval(interval);
        element.textContent = originalText;
        
        // Restore final colors properly
        if (isHeroElement) {
          const isDarkMode = document.body.classList.contains('dark-mode');
          element.style.color = isDarkMode ? '#ffffff' : '#000000';
          element.style.opacity = '1';
        } else {
          // Reset to CSS defaults
          element.style.color = '';
          element.style.opacity = '';
        }
      }
    }, 100);
  }