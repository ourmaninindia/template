// ==========================================
// IMAGE GALLERY SCRIPTS
// Auto-alternating layout
// ==========================================

(function() {
  'use strict';
    
  // Wait for DOM
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', initGalleries);
  } else {
    initGalleries();
  }
    
  function initGalleries() {
    initImageGallery();
    initCyclingGallery();
    initTOCToggle();
  }
    
  // ==========================================
  // Image Gallery (General)
  // ==========================================
  function initImageGallery() {
    const galleries = document.querySelectorAll('.image-gallery');
        
    galleries.forEach((container) => {
      const images = container.querySelectorAll('.post-image');
      let position = 0;
            
      images.forEach((img) => {
        if (img.classList.contains('post-image--wide')) {
          position = 0; // no images to show
          return;
        }
                
        if (position % 2 === 0) {
          img.classList.add('post-image--left');
        } else {
          img.classList.add('post-image--right');
        }
                
        position++;
      });
    });
  }
    
  // ==========================================
  // Cycling Gallery
  // ==========================================
  function initCyclingGallery() {
    const galleries = document.querySelectorAll('.cycling-gallery');
        
    galleries.forEach((container) => {
      const images = container.querySelectorAll('.post-image');
      let position = 0;
            
      images.forEach((img) => {
        if (img.classList.contains('post-image--wide')) {
          position = 0;
          return;
        }
                
        if (position % 2 === 0) {
          img.classList.add('post-image--left');
        } else {
          img.classList.add('post-image--right');
        }
                
        position++;
      });
    });
  }
    
  // ==========================================
  // Table of Contents Toggle
  // ==========================================
  function initTOCToggle() {
    const toc = document.querySelector('.toc');
    if (!toc) {
      return;
    }
        
    const tocNav = document.getElementById('tocNav');
    const toggleBtn = document.querySelector('.toc__toggle');
    const toggleIcon = document.querySelector('.toc__toggle-icon');
        
    if (!toggleBtn || !tocNav) {
      return;
    }
        
    // Store initial state
    let isExpanded = true;
        
    toggleBtn.addEventListener('click', () => {
      isExpanded = !isExpanded;
      tocNav.style.display = isExpanded ? 'block' : 'none';
      toggleIcon.textContent = isExpanded ? '−' : '+';
    });
  }
    
  // ==========================================
  // TOC Active Section Highlighting
  // ==========================================
  const observer = new IntersectionObserver(((entries) => {
    entries.forEach((entry) => {
      const id = entry.target.getAttribute('id');
      const tocLink = document.querySelector(`.toc a[href="#${id}"]`);
            
      if (tocLink) {
        if (entry.intersectionRatio > 0) {
          tocLink.classList.add('toc__link--active');
        } else {
          tocLink.classList.remove('toc__link--active');
        }
      }
    });
  }), { 
    rootMargin: '-20% 0px -80% 0px' 
  });
    
  // Observe all headings in post body
  document.querySelectorAll('.post__body h2, .post__body h3, .post__body h4').forEach((heading) => {
    observer.observe(heading);
  });
    
})();
;
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
;
// ==========================================
// READING PROGRESS BAR
// ==========================================

(function() {
  'use strict';
    
  const progressBar = document.querySelector('.reading-progress__bar');
    
  if (!progressBar) {
    return;
  }
    
  function updateProgressBar() {
    const winScroll = document.body.scrollTop || document.documentElement.scrollTop;
    const height = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrolled = (winScroll / height) * 100;
        
    progressBar.style.width = `${scrolled  }%`;
  }
    
  // Throttle scroll events for performance
  let ticking = false;
    
  window.addEventListener('scroll', () => {
    if (!ticking) {
      window.requestAnimationFrame(() => {
        updateProgressBar();
        ticking = false;
      });
      ticking = true;
    }
  }, { passive: true });
    
  // Initial update
  updateProgressBar();
    
})();
;
// ==========================================
// SEARCH FUNCTIONALITY
// Client-side search with Fuse.js
// ==========================================

(function() {
  'use strict';
    
  const searchInput = document.getElementById('search-input');
  const searchResults = document.getElementById('search-results');
  const searchStats = document.getElementById('search-stats');
  const clearButton = document.getElementById('search-clear');
    
  if (!searchInput || !searchResults) {
    return;
  }
    
  let fuse = null;
  let searchData = [];
    
  // Load search index
  fetch('/index.json')
    .then(response => response.json())
    .then(data => {
      searchData = data;
            
      // Initialize Fuse.js
      fuse = new Fuse(searchData, {
        keys: [
          { name: 'title', weight: 3 },
          { name: 'tags', weight: 2 },
          { name: 'categories', weight: 2 },
          { name: 'summary', weight: 1.5 },
          { name: 'content', weight: 1 }
        ],
        threshold: 0.4,
        includeScore: true,
        includeMatches: true,
        minMatchCharLength: 2
      });
            
      // Check URL for search query
      const urlParams = new URLSearchParams(window.location.search);
      const query = urlParams.get('q');
      if (query) {
        searchInput.value = query;
        performSearch(query);
      }
    })
    .catch(error => {
      // eslint-disable-next-line no-console
      console.log('Error loading search index',error);
      // console.error('Error loading search index:', error);
      searchResults.innerHTML = '<p class="search-error">Failed to load search index.</p>';
    });
    
  // Debounced search
  let searchTimeout;
  searchInput.addEventListener('input', function() {
    clearTimeout(searchTimeout);
    const query = this.value.trim();
        
    if (query.length === 0) {
      clearResults();
      return;
    }
        
    searchTimeout = setTimeout(() => {
      performSearch(query);
    }, 300);
  });
    
  // Clear button
  if (clearButton) {
    clearButton.addEventListener('click', () => {
      searchInput.value = '';
      clearResults();
      searchInput.focus();
    });
  }
    
  function performSearch(query) {
    if (!fuse) {
      return;
    }
        
    const startTime = performance.now();
    const results = fuse.search(query);
    const endTime = performance.now();
    const searchTime = ((endTime - startTime) / 1000).toFixed(3);
        
    displayResults(results, query, searchTime);
  }
    
  function displayResults(results, query, searchTime) {
    if (results.length === 0) {
      searchResults.innerHTML = `
                <div class="no-results">
                    <div class="no-results__icon">🔍</div>
                    <h3>No results found for "${escapeHtml(query)}"</h3>
                    <p>Try different keywords or check the spelling.</p>
                </div>
            `;
            
      if (searchStats) {
        searchStats.textContent = `No results found in ${searchTime}s`;
      }
      return;
    }
        
    if (searchStats) {
      searchStats.innerHTML = `Found <span>${results.length}</span> result${results.length !== 1 ? 's' : ''} in ${searchTime}s`;
    }
        
    const html = results.map(result => {
      const {item} = result;
      const score = Math.round((1 - result.score) * 100);
            
      return `
                <article class="search-result">
                    <div class="search-result__header">
                        <h2 class="search-result__title">
                            <a href="${item.permalink}">${highlightMatches(item.title, result.matches, 'title')}</a>
                        </h2>
                        <span class="search-result__score">${score}%</span>
                    </div>
                    <div class="search-result__meta">
                        <span>${formatDate(item.date)}</span>
                        ${item.categories ? `<span>${item.categories[0]}</span>` : ''}
                        ${item.readingTime ? `<span>${item.readingTime} min read</span>` : ''}
                    </div>
                    <p class="search-result__summary">
                        ${highlightMatches(item.summary || `${item.content.substring(0, 200)  }...`, result.matches, 'summary', 'content')}
                    </p>
                    ${item.tags && item.tags.length > 0 ? `
                        <div class="search-result__tags">
                            ${item.tags.slice(0, 5).map(tag => `<span class="tag">${tag}</span>`).join('')}
                        </div>
                    ` : ''}
                </article>
            `;
    }).join('');
        
    searchResults.innerHTML = html;
  }
    
  function highlightMatches(text, matches, ...keys) {
    if (!matches) {
      return escapeHtml(text);
    }
    
    const relevantMatches = matches.filter(m => keys.includes(m.key));
    if (relevantMatches.length === 0) {
      return escapeHtml(text);
    }
    
    let highlightedText = text;
    const ranges = [];
    
    relevantMatches.forEach(match => {
      match.indices.forEach((index) => {
        const [start, end] = index;
        ranges.push({ start, end });
      });
    });
    
    // Sort and merge overlapping ranges
    ranges.sort((a, b) => a.start - b.start);
    const mergedRanges = [];
    // eslint-disable-next-line prefer-destructuring
    let current = ranges[0];
    
    for (let i = 1; i < ranges.length; i++) {
      if (ranges[i].start <= current.end + 1) {
        current.end = Math.max(current.end, ranges[i].end);
      } else {
        mergedRanges.push(current);
        current = ranges[i];
      }
    }
    if (current) {
      mergedRanges.push(current);
    }
    
    // Apply highlights from end to start
    for (let i = mergedRanges.length - 1; i >= 0; i--) {
      const range = mergedRanges[i];
      const { start, end } = range;
      const before = escapeHtml(highlightedText.substring(0, start));
      const match = escapeHtml(highlightedText.substring(start, end + 1));
      const after = escapeHtml(highlightedText.substring(end + 1));
      highlightedText = `${before}<mark>${match}</mark>${after}`;
    }
    
    return highlightedText;
  }
    
  function clearResults() {
    searchResults.innerHTML = '';
    if (searchStats) {
      searchStats.textContent = '';
    }
  }
    
  function formatDate(dateString) {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  }
    
  function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
  }
    
})();
;
// ==========================================
// CONTACT FORM VALIDATION
// ==========================================

(function () {
  'use strict';

  const form = document.getElementById('contact-form');
  const email = document.getElementById('email');
  const error = document.getElementById('email-error');

  // Exit safely if form is not present on this page
  if (!form || !email || !error) {
    return;
  }

  form.addEventListener('submit', (e) => {
    if (!form.checkValidity()) {
      e.preventDefault();
      e.stopPropagation();

      if (email.validity.valueMissing) {
        error.textContent = 'Please fill out this field';
      } else if (email.validity.typeMismatch || email.validity.patternMismatch) {
        error.textContent = 'Please enter a valid email address (e.g., name@example.com)';
      }

      email.classList.add('is-invalid');
    } else {
      error.textContent = '';
      email.classList.remove('is-invalid');
    }
  });

  // Validate on blur
  email.addEventListener('blur', () => {
    if (email.value && !email.checkValidity()) {
      error.textContent = 'Please enter a valid email address (e.g., name@example.com)';
      email.classList.add('is-invalid');
    }
  });

  // Clear error on input
  email.addEventListener('input', () => {
    if (email.classList.contains('is-invalid')) {
      error.textContent = '';
      email.classList.remove('is-invalid');
    }
  });

})();
