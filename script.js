// Mario Burgard Style Landing Page - Interactive Elements
document.addEventListener('DOMContentLoaded', function() {
    
    // Smooth Scrolling for CTA buttons
    const ctaButtons = document.querySelectorAll('a[href^="#"]');
    ctaButtons.forEach(button => {
        button.addEventListener('click', function(e) {
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
    
    // Floating CTA visibility based on scroll
    const floatingCTA = document.querySelector('.floating-cta');
    const heroSection = document.querySelector('.hero-section');
    
    if (floatingCTA && heroSection) {
        window.addEventListener('scroll', function() {
            const heroBottom = heroSection.offsetTop + heroSection.offsetHeight;
            const scrollPosition = window.pageYOffset;
            
            if (scrollPosition > heroBottom) {
                floatingCTA.style.opacity = '1';
                floatingCTA.style.transform = 'translateY(0)';
            } else {
                floatingCTA.style.opacity = '0';
                floatingCTA.style.transform = 'translateY(20px)';
            }
        });
        
        // Initialize floating CTA as hidden
        floatingCTA.style.opacity = '0';
        floatingCTA.style.transform = 'translateY(20px)';
        floatingCTA.style.transition = 'all 0.3s ease';
    }
    
    // CTA Button Click Tracking (for analytics)
    const trackCTAClick = function(buttonText, section) {
        // In real implementation, you would send this to your analytics
        console.log('CTA Clicked:', {
            buttonText: buttonText,
            section: section,
            timestamp: new Date().toISOString()
        });
        
        // Example: gtag('event', 'cta_click', { ... })
    };
    
    // Add tracking to main CTA buttons
    document.querySelectorAll('.btn-primary').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            const section = this.closest('section')?.className || 'unknown';
            trackCTAClick(buttonText, section);
        });
    });
    
    // Testimonial rotation (if you want to add more testimonials later)
    const rotateTestimonials = function() {
        const testimonials = document.querySelectorAll('.testimonial-card');
        if (testimonials.length > 3) {
            // Add rotation logic here for more testimonials
            // This is prepared for future expansion
        }
    };
    
    // Price calculation animation
    const animateNumbers = function() {
        const statNumbers = document.querySelectorAll('.stat-number');
        
        const observerOptions = {
            threshold: 0.5,
            rootMargin: '0px 0px -100px 0px'
        };
        
        const observer = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const element = entry.target;
                    const finalText = element.textContent;
                    
                    // Simple number animation for stats like "2.5M+"
                    if (finalText.includes('M')) {
                        animateCounter(element, 0, 2.5, 'M+', 2000);
                    } else if (finalText.includes('#1')) {
                        element.style.opacity = '0';
                        setTimeout(() => {
                            element.textContent = '#1';
                            element.style.opacity = '1';
                        }, 500);
                    }
                    
                    observer.unobserve(element);
                }
            });
        }, observerOptions);
        
        statNumbers.forEach(stat => {
            observer.observe(stat);
        });
    };
    
    // Simple counter animation
    const animateCounter = function(element, start, end, suffix, duration) {
        const startTime = Date.now();
        const step = function() {
            const elapsed = Date.now() - startTime;
            const progress = Math.min(elapsed / duration, 1);
            const current = start + (end - start) * progress;
            
            element.textContent = current.toFixed(1) + suffix;
            
            if (progress < 1) {
                requestAnimationFrame(step);
            }
        };
        requestAnimationFrame(step);
    };
    
    // Initialize animations
    animateNumbers();
    
    // Exit intent detection (simplified)
    let exitIntentShown = false;
    document.addEventListener('mouseleave', function(e) {
        if (e.clientY <= 0 && !exitIntentShown) {
            exitIntentShown = true;
            showExitIntent();
        }
    });
    
    const showExitIntent = function() {
        // Simple exit intent: scroll to pricing
        const pricingSection = document.querySelector('#pricing');
        if (pricingSection) {
            pricingSection.scrollIntoView({
                behavior: 'smooth',
                block: 'center'
            });
            
            // Add a subtle highlight animation to the pricing card
            const pricingCard = document.querySelector('.pricing-card.recommended');
            if (pricingCard) {
                pricingCard.style.animation = 'pulse 1s ease-in-out 3 times';
            }
        }
    };
    
    // Form validation (if you add email capture later)
    const validateEmail = function(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    };
    
    // Lazy loading for future video content
    const lazyLoadVideos = function() {
        const videoPlaceholders = document.querySelectorAll('.video-placeholder');
        
        const videoObserver = new IntersectionObserver(function(entries) {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const placeholder = entry.target;
                    // Here you would replace with actual video embed
                    // placeholder.innerHTML = '<iframe src="..." ...></iframe>';
                    videoObserver.unobserve(placeholder);
                }
            });
        });
        
        videoPlaceholders.forEach(placeholder => {
            videoObserver.observe(placeholder);
        });
    };
    
    lazyLoadVideos();
    
    // Scroll progress indicator (optional enhancement)
    const addScrollProgress = function() {
        const progressBar = document.createElement('div');
        progressBar.style.cssText = `
            position: fixed;
            top: 0;
            left: 0;
            width: 0%;
            height: 3px;
            background: linear-gradient(90deg, #ff6b35, #f7931e);
            z-index: 9999;
            transition: width 0.1s ease;
        `;
        document.body.appendChild(progressBar);
        
        window.addEventListener('scroll', function() {
            const scrolled = (window.pageYOffset / (document.documentElement.scrollHeight - window.innerHeight)) * 100;
            progressBar.style.width = scrolled + '%';
        });
    };
    
    // Uncomment to add scroll progress bar
    // addScrollProgress();
    
    // Performance monitoring
    const logPerformance = function() {
        if ('performance' in window) {
            window.addEventListener('load', function() {
                setTimeout(function() {
                    const perfData = performance.getEntriesByType('navigation')[0];
                    console.log('Page Load Performance:', {
                        loadTime: perfData.loadEventEnd - perfData.loadEventStart,
                        domContentLoaded: perfData.domContentLoadedEventEnd - perfData.domContentLoadedEventStart,
                        totalTime: perfData.loadEventEnd - perfData.fetchStart
                    });
                }, 1000);
            });
        }
    };
    
    logPerformance();
    
    // Simple A/B testing framework (for future use)
    const initABTest = function() {
        const variant = Math.random() > 0.5 ? 'A' : 'B';
        document.body.setAttribute('data-variant', variant);
        
        // Store variant in localStorage for consistency
        localStorage.setItem('abVariant', variant);
        
        // Example: Different headline for variant B
        if (variant === 'B') {
            const headline = document.querySelector('.headline');
            if (headline) {
                // Alternative headline test
                // headline.innerHTML = 'Alternative headline for testing';
            }
        }
    };
    
    // Uncomment to enable A/B testing
    // initABTest();
    
    console.log('🚀 HeyGen Landing Page loaded successfully!');
    console.log('📊 Mario Burgard copywriting framework implemented');
    console.log('🎯 Direct Response elements active');
});

// Utility functions for future enhancements
const utils = {
    // Format numbers with commas
    formatNumber: function(num) {
        return num.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',');
    },
    
    // Get URL parameters
    getURLParameter: function(param) {
        const urlParams = new URLSearchParams(window.location.search);
        return urlParams.get(param);
    },
    
    // Set cookie
    setCookie: function(name, value, days) {
        const expires = new Date();
        expires.setTime(expires.getTime() + (days * 24 * 60 * 60 * 1000));
        document.cookie = name + '=' + value + ';expires=' + expires.toUTCString() + ';path=/';
    },
    
    // Get cookie
    getCookie: function(name) {
        const nameEQ = name + '=';
        const ca = document.cookie.split(';');
        for (let i = 0; i < ca.length; i++) {
            let c = ca[i];
            while (c.charAt(0) === ' ') c = c.substring(1, c.length);
            if (c.indexOf(nameEQ) === 0) return c.substring(nameEQ.length, c.length);
        }
        return null;
    }
};

// Export utils for use in other scripts
window.landingPageUtils = utils;