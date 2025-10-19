// Initialize AOS
AOS.init({
    duration: 1000,
    once: true,
    offset: 100
});

// Progress Bar
const progressBar = document.getElementById('progressBar');
const scrollToTopBtn = document.getElementById('scrollToTop');

function updateProgressBar() {
    const scrollTop = document.documentElement.scrollTop || document.body.scrollTop;
    const scrollHeight = document.documentElement.scrollHeight - document.documentElement.clientHeight;
    const scrollPercent = (scrollTop / scrollHeight) * 100;
    progressBar.style.width = scrollPercent + '%';
    
    // Show/hide scroll to top button
    if (scrollTop > 300) {
        scrollToTopBtn.classList.add('show');
    } else {
        scrollToTopBtn.classList.remove('show');
    }
}

window.addEventListener('scroll', updateProgressBar);

// Scroll to top functionality
scrollToTopBtn.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking on a link
document.querySelectorAll('.nav-link').forEach(n => n.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navMenu.classList.remove('active');
}));

// Smooth scrolling for navigation links
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

// Enhanced Navbar background on scroll
window.addEventListener('scroll', () => {
    const navbar = document.querySelector('.navbar');
    if (window.scrollY > 100) {
        navbar.style.background = 'rgba(15, 15, 35, 0.98)';
        navbar.style.backdropFilter = 'blur(20px)';
        navbar.style.borderBottom = '1px solid rgba(99, 102, 241, 0.2)';
    } else {
        navbar.style.background = 'rgba(15, 15, 35, 0.95)';
        navbar.style.backdropFilter = 'blur(10px)';
        navbar.style.borderBottom = '1px solid var(--border-color)';
    }
});

// Active navigation link highlighting
window.addEventListener('scroll', () => {
    let current = '';
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        if (scrollY >= (sectionTop - 200)) {
            current = section.getAttribute('id');
        }
    });

    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === `#${current}`) {
            link.classList.add('active');
        }
    });
});

// Input sanitization function
function sanitizeInput(input) {
    if (typeof input !== 'string') return '';
    
    // Remove HTML tags and dangerous characters
    return input
        .replace(/<[^>]*>/g, '') // Remove HTML tags
        .replace(/[<>"'&]/g, '') // Remove dangerous characters
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+=/gi, '') // Remove event handlers
        .trim() // Remove whitespace
        .substring(0, 500); // Limit length
}

// Email validation function
function isValidEmail(email) {
    const emailRegex = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;
    return emailRegex.test(email);
}

// Name validation function
function isValidName(name) {
    const nameRegex = /^[a-zA-Z\s\u0600-\u06FF]{2,50}$/; // Allow Arabic and English letters
    return nameRegex.test(name);
}

// Form submission
const contactForm = document.querySelector('.form');
if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Get and sanitize form data
        const rawName = this.querySelector('input[type="text"]').value;
        const rawEmail = this.querySelector('input[type="email"]').value;
        const rawService = this.querySelector('select').value;
        const rawMessage = this.querySelector('textarea').value;
        
        // Sanitize inputs
        const name = sanitizeInput(rawName);
        const email = sanitizeInput(rawEmail);
        const service = sanitizeInput(rawService);
        const message = sanitizeInput(rawMessage);
        
        // Enhanced validation
        if (!name || !email || !service || !message) {
            alert('Please fill in all fields');
            return;
        }
        
        if (!isValidName(name)) {
            alert('Please enter a valid name (letters only, 2-50 characters)');
            return;
        }
        
        if (!isValidEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }
        
        if (message.length < 10) {
            alert('Please enter a message with at least 10 characters');
            return;
        }
        
        // Create sanitized WhatsApp message
        const whatsappMessage = `Hello Yahya! I'm interested in your English teaching services.
        
Name: ${name}
Email: ${email}
Service: ${service}
Message: ${message}`;
        
        const whatsappURL = `https://wa.me/967783072080?text=${encodeURIComponent(whatsappMessage)}`;
        
        // Show success message
        alert('Thank you for your message! You will be redirected to WhatsApp to complete your inquiry.');
        
        // Redirect to WhatsApp
        window.open(whatsappURL, '_blank');
        
        // Reset form
        this.reset();
    });
}

// Intersection Observer for animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.service-card, .feature-card, .testimonial-card, .contact-method');
    
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(el);
    });
});

// Counter animation for stats
const animateCounters = () => {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.textContent.replace(/\D/g, ''));
        const increment = target / 100;
        let current = 0;
        
        const updateCounter = () => {
            if (current < target) {
                current += increment;
                if (counter.textContent.includes('+')) {
                    counter.textContent = Math.ceil(current) + '+';
                } else if (counter.textContent.includes('%')) {
                    counter.textContent = Math.ceil(current) + '%';
                } else {
                    counter.textContent = Math.ceil(current);
                }
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = counter.textContent; // Reset to original
            }
        };
        
        updateCounter();
    });
};

// Trigger counter animation when stats section is visible
const statsSection = document.querySelector('.stats');
if (statsSection) {
    const statsObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                animateCounters();
                statsObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });
    
    statsObserver.observe(statsSection);
}

// Floating animation for hero icons
document.addEventListener('DOMContentLoaded', () => {
    const floatingIcons = document.querySelectorAll('.floating-icon');
    
    floatingIcons.forEach((icon, index) => {
        icon.style.animationDelay = `${index * 0.5}s`;
    });
});

// Enhanced Parallax effects
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBackground = document.querySelector('.hero-bg-animation');
    const profileGlow = document.querySelector('.profile-glow');
    
    if (heroBackground) {
        heroBackground.style.transform = `translateY(${scrolled * 0.5}px)`;
    }
    
    // Remove profile glow rotation effect
    // if (profileGlow) {
    //     profileGlow.style.transform = `rotate(${scrolled * 0.1}deg)`;
    // }
    
    // Floating icons parallax
    const floatingIcons = document.querySelectorAll('.floating-icon');
    floatingIcons.forEach((icon, index) => {
        const speed = 0.02 + (index * 0.01);
        icon.style.transform += ` translateY(${scrolled * speed}px)`;
    });
});

// Social link hover effects
document.querySelectorAll('.social-link').forEach(link => {
    link.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-3px) scale(1.02)';
    });
    
    link.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Service card hover effects
document.querySelectorAll('.service-card').forEach(card => {
    card.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-15px) scale(1.02)';
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) scale(1)';
    });
});

// Testimonial card rotation effect
document.querySelectorAll('.testimonial-card').forEach((card, index) => {
    card.addEventListener('mouseenter', function() {
        const rotation = index % 2 === 0 ? '2deg' : '-2deg';
        this.style.transform = `translateY(-5px) rotate(${rotation})`;
    });
    
    card.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0) rotate(0deg)';
    });
});

// Add section transition effects
document.addEventListener('DOMContentLoaded', () => {
    const sections = document.querySelectorAll('section');
    sections.forEach((section, index) => {
        if (index > 0) { // Skip first section
            const transition = document.createElement('div');
            transition.className = 'section-transition';
            section.parentNode.insertBefore(transition, section);
        }
    });
});

let isTyping = false;
let typingTimeout = null;

function typeWriter(element, text, speed = 100) {
    if (isTyping) return; // Prevent multiple instances
    
    isTyping = true;
    element.innerHTML = '';
    
    // Create array of characters with their styling info
    const textParts = [
        { text: 'Master English with ', isColored: false },
        { text: 'Yahya Al-Hajj', isColored: true }
    ];
    
    let currentPartIndex = 0;
    let currentCharIndex = 0;
    
    function type() {
        if (currentPartIndex < textParts.length) {
            const currentPart = textParts[currentPartIndex];
            
            if (currentCharIndex < currentPart.text.length) {
                // Add character with proper styling
                const char = currentPart.text.charAt(currentCharIndex);
                
                if (currentPart.isColored) {
                    // Add colored character
                    if (currentCharIndex === 0) {
                        // Start the colored span
                        element.innerHTML += '<span style="color: #6366f1 !important; font-weight: bold !important;">';
                    }
                    element.innerHTML += char;
                    if (currentCharIndex === currentPart.text.length - 1) {
                        // Close the colored span
                        element.innerHTML += '</span>';
                    }
                } else {
                    // Add normal character
                    element.innerHTML += char;
                }
                
                currentCharIndex++;
            } else {
                // Move to next part
                currentPartIndex++;
                currentCharIndex = 0;
            }
            
            typingTimeout = setTimeout(type, speed);
        } else {
            isTyping = false;
        }
    }
    type();
}

function stopTyping() {
    if (typingTimeout) {
        clearTimeout(typingTimeout);
        typingTimeout = null;
    }
    isTyping = false;
}

// Initialize typing effect
document.addEventListener('DOMContentLoaded', () => {
    setTimeout(() => {
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            const originalText = heroTitle.textContent;
            typeWriter(heroTitle, originalText, 50);
            setInterval(() => {
                stopTyping(); // Stop any ongoing typing
                setTimeout(() => {
                    typeWriter(heroTitle, originalText, 50);
                }, 100); // Small delay to ensure clean start
            }, 10000); // Reduced interval to 10 seconds
        }
    }, 2000);
});

// ...

// Enhanced Loading animation
window.addEventListener('load', () => {
    // ...
    // Create loading screen
    const loadingScreen = document.createElement('div');
    loadingScreen.innerHTML = `
        <div style="
            position: fixed;
            top: 0;
            left: 0;
            width: 100%;
            height: 100%;
            background: var(--bg-primary);
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: 10000;
            transition: opacity 0.5s ease;
        ">
            <div style="
                text-align: center;
                color: var(--text-primary);
            ">
                <div style="
                    width: 60px;
                    height: 60px;
                    border: 3px solid var(--primary-color);
                    border-top: 3px solid transparent;
                    border-radius: 50%;
                    animation: spin 1s linear infinite;
                    margin: 0 auto 1rem;
                "></div>
                <h3 style="background: var(--gradient-primary); -webkit-background-clip: text; -webkit-text-fill-color: transparent; background-clip: text;">Loading...</h3>
            </div>
        </div>
    `;
    
    document.body.appendChild(loadingScreen);
    
    // Add spin animation
    const style = document.createElement('style');
    style.textContent = `
        @keyframes spin {
            0% { transform: rotate(0deg); }
            100% { transform: rotate(360deg); }
        }
    `;
    document.head.appendChild(style);
    
    setTimeout(() => {
        loadingScreen.style.opacity = '0';
        setTimeout(() => {
            document.body.removeChild(loadingScreen);
        }, 500);
    }, 1500);
});

// Keyboard navigation support
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    }
});

// Contact method click handlers
document.addEventListener('DOMContentLoaded', () => {
    // WhatsApp click handler
    const whatsappLinks = document.querySelectorAll('.social-link.whatsapp, a[href*="wa.me"]');
    whatsappLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const message = "Hello Yahya! I'm interested in your English teaching services. Could you please provide more information?";
            const whatsappURL = `https://wa.me/967783072080?text=${encodeURIComponent(message)}`;
            window.open(whatsappURL, '_blank');
        });
    });
    
    // Phone click handler
    const phoneLinks = document.querySelectorAll('.social-link.phone, a[href^="tel:"]');
    phoneLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Let the default behavior handle the tel: link
            console.log('Initiating phone call...');
        });
    });
    
    // Email click handler
    const emailLinks = document.querySelectorAll('.social-link.email, a[href^="mailto:"]');
    emailLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const subject = "English Teaching Services Inquiry";
            const body = "Hello Yahya,\n\nI'm interested in your English teaching services. Could you please provide more information about your courses and availability?\n\nThank you!";
            const mailtoURL = `mailto:yahyazacoo@gmail.com?subject=${encodeURIComponent(sanitizeInput(subject))}&body=${encodeURIComponent(sanitizeInput(body))}`;
            window.location.href = mailtoURL;
        });
    });
});

// Add ripple effect to buttons
document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.classList.add('ripple');
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Add dynamic background particles
function createParticles() {
    const particleContainer = document.createElement('div');
    particleContainer.style.cssText = `
        position: fixed;
        top: 0;
        left: 0;
        width: 100%;
        height: 100%;
        pointer-events: none;
        z-index: 1;
        overflow: hidden;
    `;
    
    for (let i = 0; i < 20; i++) {
        const particle = document.createElement('div');
        particle.style.cssText = `
            position: absolute;
            width: ${Math.random() * 4 + 2}px;
            height: ${Math.random() * 4 + 2}px;
            background: rgba(99, 102, 241, ${Math.random() * 0.3 + 0.1});
            border-radius: 50%;
            left: ${Math.random() * 100}%;
            top: ${Math.random() * 100}%;
            animation: float ${Math.random() * 10 + 5}s ease-in-out infinite;
            animation-delay: ${Math.random() * 5}s;
        `;
        particleContainer.appendChild(particle);
    }
    
    document.body.appendChild(particleContainer);
}

// Initialize particles
document.addEventListener('DOMContentLoaded', createParticles);

// Enhanced CSS for ripple effect and other animations
const style = document.createElement('style');
style.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.3);
        transform: scale(0);
        animation: ripple-animation 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes ripple-animation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    /* Enhanced hover effects */
    .service-card:hover {
        transform: translateY(-15px) scale(1.02) !important;
        box-shadow: 0 25px 50px rgba(99, 102, 241, 0.2) !important;
    }
    
    .testimonial-card:hover {
        transform: translateY(-10px) scale(1.02) !important;
        box-shadow: 0 20px 40px rgba(0, 0, 0, 0.3) !important;
    }
    
    /* Glowing text effect */
    .gradient-text {
        text-shadow: 0 0 30px rgba(99, 102, 241, 0.5);
    }
`;
document.head.appendChild(style);

// Enhanced mouse cursor trail effect for entire page
let mouseTrail = [];
let trailCount = 0;
const maxTrails = 3; // Limit trails for performance

document.addEventListener('mousemove', (e) => {
    mouseTrail.push({x: e.clientX, y: e.clientY, time: Date.now()});
    
    // Keep only recent trail points
    mouseTrail = mouseTrail.filter(point => Date.now() - point.time < 1000);
    
    // Throttle trail creation for better performance
    if (trailCount < maxTrails) {
        trailCount++;
        
        // Create enhanced trail effect on entire page
        const trail = document.createElement('div');
        trail.style.cssText = `
            position: fixed;
            width: 10px;
            height: 10px;
            background: radial-gradient(circle, rgba(99, 102, 241, 0.8) 0%, rgba(139, 92, 246, 0.4) 50%, transparent 100%);
            border-radius: 50%;
            pointer-events: none;
            z-index: 9998;
            left: ${e.clientX - 5}px;
            top: ${e.clientY - 5}px;
            opacity: 0.7;
            animation: trailFade 2s ease-out forwards;
            box-shadow: 0 0 15px rgba(99, 102, 241, 0.3);
            mix-blend-mode: screen;
        `;
        
        document.body.appendChild(trail);
        
        setTimeout(() => {
            if (document.body.contains(trail)) {
                document.body.removeChild(trail);
                trailCount--;
            }
        }, 2000);
    }
});

// Add trail fade animation
const trailStyle = document.createElement('style');
trailStyle.textContent = `
    @keyframes trailFade {
        0% {
            opacity: 0.7;
            transform: scale(1);
        }
        100% {
            opacity: 0;
            transform: scale(0);
        }
    }
`;
document.head.appendChild(trailStyle);
