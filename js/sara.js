/**
 * SARA — Corporate Wellness Platform
 * Main JavaScript for ROI Calculators and Interactive Elements
 */

// ============================================
// ROI Calculator for B2B Page
// ============================================

let currentTierPrice = 100; // Default Pro tier

function calcROI() {
  const employees = parseInt(document.getElementById('empSlider')?.value) || 2000;
  const display = document.getElementById('empDisplay');
  
  if (display) {
    display.textContent = employees.toLocaleString('en-US');
  }
  
  // Calculations based on SARA business model
  const monthlyPEPM = currentTierPrice;
  const annualCost = employees * monthlyPEPM * 12;
  
  // ROI assumptions based on strategy doc
  const highRiskPercentage = 0.29; // 29% of workforce
  const highRiskEmployees = employees * highRiskPercentage;
  
  // Savings per high-risk employee: SAR 8,500/year
  const savingsPerEmployee = 8500;
  const totalSavings = highRiskEmployees * savingsPerEmployee;
  
  // Net gain
  const netGain = totalSavings - annualCost;
  
  // ROI percentage
  const roi = annualCost > 0 ? ((netGain / annualCost) * 100).toFixed(0) : 0;
  
  // Update display
  updateROIDisplay(annualCost, totalSavings, netGain, roi, highRiskEmployees);
}

function updateROIDisplay(annualCost, totalSavings, netGain, roi, highRiskEmployees) {
  const costEl = document.getElementById('roiCost');
  const savingsEl = document.getElementById('roiSavings');
  const netEl = document.getElementById('roiNet');
  const roiEl = document.getElementById('roiPercentage');
  
  if (costEl) {
    costEl.textContent = formatCurrency(annualCost);
  }
  if (savingsEl) {
    savingsEl.textContent = formatCurrency(totalSavings);
  }
  if (netEl) {
    netEl.textContent = formatCurrency(netGain);
    netEl.style.color = netGain >= 0 ? 'var(--teal)' : '#EF4444';
  }
  if (roiEl) {
    roiEl.textContent = roi + '%';
  }
}

function selectTier(price, btn) {
  currentTierPrice = price;
  
  // Update active state
  document.querySelectorAll('.tier-btn').forEach(b => b.classList.remove('active'));
  btn.classList.add('active');
  
  // Recalculate
  calcROI();
}

function formatCurrency(amount) {
  return 'SAR ' + Math.round(amount).toLocaleString('en-US');
}

// ============================================
// Mobile Menu Toggle
// ============================================

function initMobileMenu() {
  const toggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');
  
  if (toggle && navLinks) {
    toggle.addEventListener('click', () => {
      navLinks.classList.toggle('active');
      toggle.setAttribute('aria-expanded', 
        navLinks.classList.contains('active') ? 'true' : 'false'
      );
    });
  }
}

// ============================================
// Smooth Scroll for Anchor Links
// ============================================

function initSmoothScroll() {
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
      const href = this.getAttribute('href');
      if (href !== '#' && href.length > 1) {
        const target = document.querySelector(href);
        if (target) {
          e.preventDefault();
          target.scrollIntoView({
            behavior: 'smooth',
            block: 'start'
          });
          
          // Close mobile menu if open
          const navLinks = document.querySelector('.nav-links');
          if (navLinks && navLinks.classList.contains('active')) {
            navLinks.classList.remove('active');
          }
        }
      }
    });
  });
}

// ============================================
// Intersection Observer for Fade-in Animations
// ============================================

function initScrollAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('fade-up');
        observer.unobserve(entry.target);
      }
    });
  }, {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
  });
  
  // Observe elements with data-animate attribute
  document.querySelectorAll('[data-animate]').forEach(el => {
    el.style.opacity = '0';
    observer.observe(el);
  });
}

// ============================================
// Animated Number Counter
// ============================================

function animateNumber(element, target, duration = 2000) {
  const start = 0;
  const increment = target / (duration / 16); // 60fps
  let current = start;
  
  const timer = setInterval(() => {
    current += increment;
    if (current >= target) {
      current = target;
      clearInterval(timer);
    }
    element.textContent = Math.floor(current).toLocaleString('en-US');
  }, 16);
}

function initNumberAnimations() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const target = parseInt(entry.target.getAttribute('data-target'));
        if (target) {
          animateNumber(entry.target, target);
        }
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.5 });
  
  document.querySelectorAll('[data-target]').forEach(el => {
    observer.observe(el);
  });
}

// ============================================
// Form Handling (Contact/Demo Request)
// ============================================

function initFormHandling() {
  const forms = document.querySelectorAll('form[data-form-type]');
  
  forms.forEach(form => {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();
      
      const formData = new FormData(form);
      const data = Object.fromEntries(formData);
      
      // Add timestamp
      data.timestamp = new Date().toISOString();
      data.formType = form.getAttribute('data-form-type');
      
      // For now, log to console and send to WhatsApp
      console.log('Form submission:', data);
      
      // Send to WhatsApp (temporary solution)
      const message = `New Lead from SARA Website\n\nName: ${data.name}\nEmail: ${data.email}\nCompany: ${data.company}\nEmployees: ${data.employees}\nMessage: ${data.message}`;
      const whatsappUrl = `https://wa.me/966555056545?text=${encodeURIComponent(message)}`;
      
      // Show success message
      showNotification('Thank you! Redirecting to WhatsApp...', 'success');
      
      // Redirect to WhatsApp after short delay
      setTimeout(() => {
        window.open(whatsappUrl, '_blank');
        form.reset();
      }, 1500);
    });
  });
}

// ============================================
// Notification System
// ============================================

function showNotification(message, type = 'info') {
  // Remove existing notifications
  const existing = document.querySelector('.sara-notification');
  if (existing) existing.remove();
  
  const notification = document.createElement('div');
  notification.className = `sara-notification notification-${type}`;
  notification.textContent = message;
  notification.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    background: ${type === 'success' ? 'var(--teal)' : 'var(--navy)'};
    color: ${type === 'success' ? 'var(--navy-deep)' : 'var(--white)'};
    padding: 1rem 2rem;
    border-radius: 12px;
    box-shadow: 0 8px 30px rgba(0,0,0,0.3);
    z-index: 1000;
    animation: slideIn 0.3s ease;
    font-family: 'Noto Naskh Arabic', serif;
    font-size: 0.95rem;
  `;
  
  document.body.appendChild(notification);
  
  // Auto-remove after 4 seconds
  setTimeout(() => {
    notification.style.animation = 'slideOut 0.3s ease';
    setTimeout(() => notification.remove(), 300);
  }, 4000);
}

// Add notification animations to CSS dynamically
const style = document.createElement('style');
style.textContent = `
  @keyframes slideIn {
    from { transform: translateX(100%); opacity: 0; }
    to { transform: translateX(0); opacity: 1; }
  }
  @keyframes slideOut {
    from { transform: translateX(0); opacity: 1; }
    to { transform: translateX(100%); opacity: 0; }
  }
`;
document.head.appendChild(style);

// ============================================
// Analytics Tracking (Placeholder)
// ============================================

function trackEvent(eventName, eventData = {}) {
  // Google Analytics
  if (typeof gtag !== 'undefined') {
    gtag('event', eventName, eventData);
  }
  
  // Custom analytics endpoint (to be implemented)
  console.log('Analytics event:', eventName, eventData);
}

function initAnalytics() {
  // Track page views
  trackEvent('page_view', {
    page_path: window.location.pathname,
    page_title: document.title
  });
  
  // Track CTA clicks
  document.querySelectorAll('[data-track-cta]').forEach(el => {
    el.addEventListener('click', () => {
      trackEvent('cta_click', {
        cta_name: el.getAttribute('data-track-cta'),
        cta_location: el.getAttribute('data-track-location') || 'unknown'
      });
    });
  });
}

// ============================================
// Initialize Everything on DOM Ready
// ============================================

document.addEventListener('DOMContentLoaded', () => {
  initMobileMenu();
  initSmoothScroll();
  initScrollAnimations();
  initNumberAnimations();
  initFormHandling();
  initAnalytics();
  
  // Initial ROI calculation if on B2B page
  if (document.getElementById('empSlider')) {
    calcROI();
  }
  
  console.log('SARA platform initialized');
});

// ============================================
// Utility Functions
// ============================================

// Debounce function for performance
function debounce(func, wait) {
  let timeout;
  return function executedFunction(...args) {
    const later = () => {
      clearTimeout(timeout);
      func(...args);
    };
    clearTimeout(timeout);
    timeout = setTimeout(later, wait);
  };
}

// Format numbers with Arabic numerals if RTL
function formatNumber(num, locale = 'ar-SA') {
  return new Intl.NumberFormat(locale).format(num);
}

// Export for use in other scripts
window.SARA = {
  calcROI,
  selectTier,
  showNotification,
  trackEvent,
  formatNumber
};
