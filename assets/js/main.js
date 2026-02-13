// ==========================================
// MAIN JAVASCRIPT
// Core functionality
// ==========================================

(function() {
    'use strict';
    
    // ==========================================
    // Mobile Menu Toggle
    // ==========================================
    function initMobileMenu() {
        const menuToggle = document.querySelector('.nav__toggle');
        const menuItems = document.querySelector('.nav__menu');
        
        if (menuToggle && menuItems) {
            menuToggle.addEventListener('click', function() {
                menuItems.classList.toggle('nav__menu--open');
                const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
                menuToggle.setAttribute('aria-expanded', !isExpanded);
            });
            
            // Close menu when clicking outside
            document.addEventListener('click', function(event) {
                const isClickInside = menuToggle.contains(event.target) || menuItems.contains(event.target);
                
                if (!isClickInside && menuItems.classList.contains('nav__menu--open')) {
                    menuItems.classList.remove('nav__menu--open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
            
            // Close menu on ESC key
            document.addEventListener('keydown', function(event) {
                if (event.key === 'Escape' && menuItems.classList.contains('nav__menu--open')) {
                    menuItems.classList.remove('nav__menu--open');
                    menuToggle.setAttribute('aria-expanded', 'false');
                }
            });
        }
    }
    
    // ==========================================
    // Smart Header (Hide on scroll down)
    // ==========================================
    function initSmartHeader() {
        const header = document.querySelector('.nav');
        if (!header) return;
        
        let lastScroll = 0;
        const scrollThreshold = 100;
        
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
    // External Links
    // ==========================================
    function initExternalLinks() {
        const links = document.querySelectorAll('a[href^="http"]');
        
        links.forEach(function(link) {
            // Skip if same domain
            if (link.hostname === window.location.hostname) return;
            
            link.setAttribute('target', '_blank');
            link.setAttribute('rel', 'noopener noreferrer');
        });
    }
    
    // ==========================================
    // Smooth Scroll
    // ==========================================
    function initSmoothScroll() {
        const links = document.querySelectorAll('a[href^="#"]');
        
        links.forEach(function(link) {
            link.addEventListener('click', function(e) {
                const href = this.getAttribute('href');
                
                // Skip empty anchors
                if (href === '#') return;
                
                const target = document.querySelector(href);
                
                if (target) {
                    e.preventDefault();
                    target.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                    
                    // Update URL without jumping
                    history.pushState(null, null, href);
                }
            });
        });
    }
    
   // ==========================================
// Copy Code Button
// ==========================================
function initCopyCode() {
    const codeBlocks = document.querySelectorAll('pre code');
    
    codeBlocks.forEach(function(codeBlock) {
        const pre = codeBlock.parentElement;
        
        // Get language from class (e.g., language-javascript)
        const languageClass = codeBlock.className.match(/language-(\w+)/);
        const language = languageClass ? languageClass[1] : 'code';
        
        // Create language label
        const languageLabel = document.createElement('span');
        languageLabel.className = 'code-language-label';
        languageLabel.textContent = language;
        
        // Create copy button
        const button = document.createElement('button');
        button.className = 'code-copy-btn';
        button.textContent = 'Copy';
        button.setAttribute('aria-label', 'Copy code to clipboard');
        
        button.addEventListener('click', function() {
            navigator.clipboard.writeText(codeBlock.textContent).then(function() {
                button.textContent = 'Copied!';
                button.classList.add('code-copy-btn--success');
                
                setTimeout(function() {
                    button.textContent = 'Copy';
                    button.classList.remove('code-copy-btn--success');
                }, 2000);
            }).catch(function(err) {
                console.error('Failed to copy:', err);
                button.textContent = 'Error';
            });
        });
        
        pre.style.position = 'relative';
        pre.appendChild(languageLabel);
        pre.appendChild(button);
    });
}
    
    // ==========================================
    // Initialize All
    // ==========================================
    function init() {
        initMobileMenu();
        initSmartHeader();
        initExternalLinks();
        initSmoothScroll();
        initCopyCode();
    }
    
    // Run on DOM ready
    if (document.readyState === 'loading') {
        document.addEventListener('DOMContentLoaded', init);
    } else {
        init();
    }
    
})();