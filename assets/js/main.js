// ==========================================
// MAIN JAVASCRIPT
// Menu toggle, smooth scroll, utilities
// ==========================================

(function() {
  'use strict';
    
  // ==========================================
// Mobile Menu Toggle
// ==========================================
const menuToggle = document.querySelector('.nav__toggle');
const menuItems = document.querySelector('.nav__menu');

if (menuToggle && menuItems) {
    menuToggle.addEventListener('click', function() {
        menuItems.classList.toggle('nav__menu--open');
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
    });
}

// ==========================================
// Smart Header (Hide on scroll down)
// ==========================================
const header = document.querySelector('.nav');
let lastScroll = 0;
const scrollThreshold = 100;

if (header) {
    window.addEventListener('scroll', function() {
        const currentScroll = window.pageYOffset;
        
        // Don't hide at top of page
        if (currentScroll <= scrollThreshold) {
            header.classList.remove('nav--hidden');
            return;
        }
        
        // Scrolling down - hide header
        if (currentScroll > lastScroll && !header.classList.contains('nav--hidden')) {
            header.classList.add('nav--hidden');
        } 
        // Scrolling up - show header
        else if (currentScroll < lastScroll && header.classList.contains('nav--hidden')) {
            header.classList.remove('nav--hidden');
        }
        
        lastScroll = currentScroll;
    }, { passive: true });
}
    
  // ==========================================
  // Smooth Scroll for Anchor Links
  // ==========================================
  const anchorLinks = document.querySelectorAll('a[href^="#"]');
    
  anchorLinks.forEach((link) => {
    link.addEventListener('click', function(e) {
      const target = document.querySelector(this.getAttribute('href'));
            
      if (target) {
        e.preventDefault();
        target.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });
    
  // ==========================================
  // External Links (Open in new tab)
  // ==========================================
  const externalLinks = document.querySelectorAll('a[href^="http"]');
    
  externalLinks.forEach((link) => {
    // Skip if it's an internal link
    if (link.hostname === window.location.hostname) {
      return;
    }
        
    link.setAttribute('target', '_blank');
    link.setAttribute('rel', 'noopener noreferrer');
  });
    
  // ==========================================
  // Copy Code Button
  // ==========================================
  const codeBlocks = document.querySelectorAll('pre code');
    
  codeBlocks.forEach((codeBlock) => {
    const pre = codeBlock.parentElement;
    const button = document.createElement('button');
    button.className = 'code-copy-btn';
    button.textContent = 'Copy';
    button.setAttribute('aria-label', 'Copy code to clipboard');
        
    button.addEventListener('click', () => {
      navigator.clipboard.writeText(codeBlock.textContent).then(() => {
        button.textContent = 'Copied!';
        button.classList.add('code-copy-btn--success');
                
        setTimeout(() => {
          button.textContent = 'Copy';
          button.classList.remove('code-copy-btn--success');
        }, 2000);
      }).catch((err) => {
        // eslint-disable-next-line no-console
        console.error('Failed to copy:', err);
        button.textContent = 'Error';
      });
    });
        
    pre.style.position = 'relative';
    pre.appendChild(button);
  });
    
})();