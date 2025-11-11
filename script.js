// script.js - Centralized JavaScript for Green Minds Youth Initiative

// Performance Monitoring & Loading Optimization
document.addEventListener('DOMContentLoaded', function() {
  // Log page load time
  if (performance) {
    const loadTime = performance.timing.loadEventEnd - performance.timing.navigationStart;
    console.log('Green Minds - Page load time:', loadTime + 'ms');
    
    // Track page view for analytics
    if (typeof gtag !== 'undefined') {
      gtag('event', 'page_view', {
        page_title: document.title,
        page_location: window.location.href,
        page_load_time: loadTime
      });
    }
  }
  
  // Lazy load images
  const lazyImages = document.querySelectorAll('img[data-src]');
  if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const img = entry.target;
          img.src = img.dataset.src;
          img.classList.remove('lazy-load');
          img.classList.add('loaded');
          imageObserver.unobserve(img);
        }
      });
    });
    
    lazyImages.forEach(img => imageObserver.observe(img));
  } else {
    // Fallback for older browsers
    lazyImages.forEach(img => {
      img.src = img.dataset.src;
    });
  }

  // Active navigation highlighting
  const currentPage = window.location.pathname.split('/').pop();
  const navLinks = document.querySelectorAll('.nav-menu a');
  
  navLinks.forEach(link => {
    if (link.getAttribute('href') === currentPage) {
      link.classList.add('active');
    }
  });

  // Breadcrumb functionality
  updateBreadcrumb();
  
  // Initialize search if available
  if (document.getElementById('searchInput')) {
    initSearch();
  }
  
  // Initialize cookie consent if available
  if (document.getElementById('cookieConsent')) {
    initCookieConsent();
  }
  
  // Initialize slideshow
  initSlideshow();
  
  // Initialize core values scrolling
  initCoreValuesScrolling();
});

// Breadcrumb functionality
function updateBreadcrumb() {
  const currentPage = window.location.pathname.split('/').pop();
  const pageName = currentPage.replace('.html', '').replace(/-/g, ' ');
  const breadcrumbElement = document.getElementById('currentPage');
  
  if (breadcrumbElement && pageName !== 'index') {
    breadcrumbElement.textContent = pageName;
  } else if (breadcrumbElement) {
    breadcrumbElement.textContent = 'Home';
  }
}

// Search functionality
const searchData = {
  pages: [
    {
      title: "About Us",
      description: "Learn about our mission, vision, and core values",
      url: "about.html",
      keywords: "about mission vision values team"
    },
    {
      title: "Tree Planting Projects",
      description: "Kwale Green Corridor and reforestation initiatives",
      url: "projects.html#reforestation",
      keywords: "tree planting reforestation green corridor"
    },
    {
      title: "Waste Management",
      description: "Zero waste communities and recycling programs",
      url: "projects.html#waste",
      keywords: "waste management recycling zero waste"
    },
    {
      title: "Environmental Education",
      description: "Green Schools Program and youth education",
      url: "projects.html#education",
      keywords: "education schools students training"
    },
    {
      title: "Contact Information",
      description: "Get in touch with our team",
      url: "contact.html",
      keywords: "contact email phone address"
    }
  ]
};

function initSearch() {
  const searchInput = document.getElementById('searchInput');
  const searchButton = document.getElementById('searchButton');
  const searchResults = document.getElementById('searchResults');
  const searchContainer = document.querySelector('.search-container');

  function performSearch() {
    const query = searchInput.value.toLowerCase().trim();
    
    if (query.length < 2) {
      searchResults.style.display = 'none';
      return;
    }

    const results = searchData.pages.filter(page => 
      page.title.toLowerCase().includes(query) ||
      page.description.toLowerCase().includes(query) ||
      page.keywords.toLowerCase().includes(query)
    );

    displayResults(results);
  }

  function displayResults(results) {
    searchResults.innerHTML = '';
    
    if (results.length === 0) {
      searchResults.innerHTML = '<div class="search-result-item">No results found</div>';
    } else {
      results.forEach(result => {
        const item = document.createElement('div');
        item.className = 'search-result-item';
        item.innerHTML = `
          <h4>${result.title}</h4>
          <p>${result.description}</p>
        `;
        item.addEventListener('click', () => {
          window.location.href = result.url;
        });
        searchResults.appendChild(item);
      });
    }
    
    searchResults.style.display = 'block';
  }

  searchInput.addEventListener('input', performSearch);
  searchButton.addEventListener('click', performSearch);
  
  searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') {
      performSearch();
    }
  });

  // Close results when clicking outside
  document.addEventListener('click', (e) => {
    if (!searchContainer.contains(e.target)) {
      searchResults.style.display = 'none';
    }
  });
}

// Cookie Consent functionality
function initCookieConsent() {
  const cookieConsent = document.getElementById('cookieConsent');
  const acceptCookies = document.getElementById('acceptCookies');
  
  // Check if user has already accepted cookies
  if (!localStorage.getItem('cookiesAccepted')) {
    // Show cookie consent after a short delay
    setTimeout(() => {
      cookieConsent.classList.add('show');
    }, 1000);
  }
  
  // Handle accept button click
  acceptCookies.addEventListener('click', () => {
    localStorage.setItem('cookiesAccepted', 'true');
    cookieConsent.classList.remove('show');
    
    // Enable analytics tracking
    if (typeof gtag !== 'undefined') {
      gtag('consent', 'update', {
        'analytics_storage': 'granted'
      });
    }
  });
}

// Slideshow functionality
let slideIndex = 0;
let slideInterval;

// Initialize slideshow
function initSlideshow() {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  
  if (slides.length === 0) return; // Exit if no slides found
  
  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
  }
  
  // Remove active class from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Show first slide
  slides[0].style.display = "block";
  slides[0].classList.add('active');
  if (dots[0]) dots[0].className += " active";
  
  slideIndex = 0;
  startSlideShow();
}

// Next/previous controls
function plusSlides(n) {
  showSlides(slideIndex += n);
  resetSlideShow();
}

// Thumbnail image controls
function currentSlide(n) {
  showSlides(slideIndex = n - 1);
  resetSlideShow();
}

function showSlides(n) {
  const slides = document.getElementsByClassName("slide");
  const dots = document.getElementsByClassName("dot");
  
  if (n >= slides.length) { slideIndex = 0; }
  if (n < 0) { slideIndex = slides.length - 1; }
  
  // Hide all slides
  for (let i = 0; i < slides.length; i++) {
    slides[i].style.display = "none";
    slides[i].classList.remove('active');
  }
  
  // Remove active class from all dots
  for (let i = 0; i < dots.length; i++) {
    dots[i].className = dots[i].className.replace(" active", "");
  }
  
  // Show current slide
  slides[slideIndex].style.display = "block";
  slides[slideIndex].classList.add('active');
  if (dots[slideIndex]) dots[slideIndex].className += " active";
}

// Auto slide show
function startSlideShow() {
  slideInterval = setInterval(function() {
    plusSlides(1);
  }, 5000); // Change slide every 5 seconds
}

function resetSlideShow() {
  clearInterval(slideInterval);
  startSlideShow();
}

// Pause slideshow on hover
document.addEventListener('DOMContentLoaded', function() {
  const slideshow = document.querySelector('.slideshow-container');
  if (slideshow) {
    slideshow.addEventListener('mouseenter', function() {
      clearInterval(slideInterval);
    });
    
    slideshow.addEventListener('mouseleave', function() {
      startSlideShow();
    });
  }
});

// Core Values Horizontal Scrolling - FIXED VERSION
function scrollValues(direction) {
  const scrollContainer = document.getElementById('valuesScroll');
  if (!scrollContainer) {
    console.log('Scroll container not found');
    return;
  }
  
  const scrollAmount = 350;
  console.log('Scrolling:', direction, scrollAmount);
  
  scrollContainer.scrollBy({
    left: direction * scrollAmount,
    behavior: 'smooth'
  });
}

// Touch swipe support for values scroll
let touchStartX = 0;
let touchEndX = 0;

function initCoreValuesScrolling() {
  const valuesScroll = document.getElementById('valuesScroll');
  
  if (valuesScroll) {
    console.log('Initializing core values scrolling');
    
    // Touch events for mobile swipe
    valuesScroll.addEventListener('touchstart', function(e) {
      touchStartX = e.changedTouches[0].screenX;
    });

    valuesScroll.addEventListener('touchend', function(e) {
      touchEndX = e.changedTouches[0].screenX;
      handleSwipe();
    });

    // Add click event listeners to scroll buttons
    const scrollLeftBtn = document.querySelector('.scroll-btn.left');
    const scrollRightBtn = document.querySelector('.scroll-btn.right');
    
    if (scrollLeftBtn) {
      scrollLeftBtn.addEventListener('click', function() {
        scrollValues(-1);
      });
    }
    
    if (scrollRightBtn) {
      scrollRightBtn.addEventListener('click', function() {
        scrollValues(1);
      });
    }
  } else {
    console.log('Values scroll container not found');
  }
}

function handleSwipe() {
  const swipeThreshold = 50;
  const diff = touchStartX - touchEndX;
  
  if (Math.abs(diff) > swipeThreshold) {
    if (diff > 0) {
      // Swipe left
      scrollValues(1);
    } else {
      // Swipe right
      scrollValues(-1);
    }
  }
}

// Keyboard navigation for values scroll
document.addEventListener('keydown', function(event) {
  const scrollContainer = document.getElementById('valuesScroll');
  if (scrollContainer && scrollContainer.offsetParent !== null) {
    if (event.key === 'ArrowLeft') {
      event.preventDefault();
      scrollValues(-1);
    } else if (event.key === 'ArrowRight') {
      event.preventDefault();
      scrollValues(1);
    }
  }
});

// Debug function to test if scrolling works
function testScroll() {
  console.log('Testing scroll function...');
  scrollValues(1);
}