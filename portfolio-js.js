// Wait for DOM to fully load
document.addEventListener('DOMContentLoaded', function() {
    // Navigation smooth scroll
    setupSmoothScroll();
    
    // Mobile menu toggle
    setupMobileMenu();
    
    // Initialize animations
    initializeAnimations();
    
    // Setup contact form
    setupContactForm();
});

// Smooth scrolling for navigation links
function setupSmoothScroll() {
    const navLinks = document.querySelectorAll('header .nav-links a');
    
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            
            // Get target section id from href
            const targetId = this.getAttribute('href');
            const targetSection = document.querySelector(targetId);
            
            if (targetSection) {
                // Add smooth scroll with slight offset for header
                window.scrollTo({
                    top: targetSection.offsetTop - 80,
                    behavior: 'smooth'
                });
                
                // If mobile menu is open, close it
                const navLinks = document.querySelector('.nav-links');
                if (navLinks.classList.contains('active')) {
                    navLinks.classList.remove('active');
                }
            }
        });
    });
}

// Mobile menu toggle
function setupMobileMenu() {
    const menuBtn = document.querySelector('.menu-btn');
    const navLinks = document.querySelector('.nav-links');
    
    if (menuBtn) {
        menuBtn.addEventListener('click', function() {
            navLinks.classList.toggle('active');
        });
    }
}

// Initialize scroll-based animations
function initializeAnimations() {
    // Add intersection observer for fade-in animations
    const fadeElements = document.querySelectorAll('.fade-in');
    
    const appearOptions = {
        threshold: 0.15,
        rootMargin: "0px 0px -100px 0px"
    };
    
    const appearOnScroll = new IntersectionObserver(function(entries, appearOnScroll) {
        entries.forEach(entry => {
            if (!entry.isIntersecting) return;
            entry.target.classList.add('appear');
            appearOnScroll.unobserve(entry.target);
        });
    }, appearOptions);
    
    fadeElements.forEach(element => {
        appearOnScroll.observe(element);
    });
    
    // Add cursor animation to name highlight
    animateNameCursor();
    
    // Add parallax effect to hero section
    window.addEventListener('scroll', function() {
        const heroSection = document.querySelector('#hero');
        const scrollPosition = window.scrollY;
        
        if (heroSection && scrollPosition < heroSection.offsetHeight) {
            const yPos = -scrollPosition * 0.2;
            heroSection.style.backgroundPositionY = yPos + 'px';
        }
    });
    
    // Add hover effects to project cards
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.classList.add('hovered');
        });
        
        card.addEventListener('mouseleave', function() {
            this.classList.remove('hovered');
        });
    });
    
    // Add skill animation
    animateSkills();
}

// Animated typing cursor effect
function animateNameCursor() {
    const cursor = document.querySelector('.animated-cursor');
    if (cursor) {
        setInterval(() => {
            cursor.classList.toggle('blink');
        }, 500);
    }
}

// Animate skills on scroll
function animateSkills() {
    const skills = document.querySelectorAll('.skill');
    let delay = 0;
    
    skills.forEach((skill, index) => {
        // Reset the delay every 3 skills
        if (index % 3 === 0) delay = 0;
        
        skill.style.transitionDelay = `${delay}s`;
        delay += 0.1;
    });
}

// Handle contact form submission to WhatsApp
function setupContactForm() {
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('name').value;
            const email = document.getElementById('email').value;
            const subject = document.getElementById('subject').value;
            const message = document.getElementById('message').value;
            
            // Format message for WhatsApp
            const whatsappMessage = `*New Contact Form Submission*%0A%0A*Name:* ${name}%0A*Email:* ${email}%0A*Subject:* ${subject}%0A*Message:* ${message}`;
            
            // Create WhatsApp URL
            const whatsappURL = `https://wa.me/201229816772?text=${whatsappMessage}`;
            
            // Show success animation
            const sendBtn = document.querySelector('.send-btn');
            sendBtn.classList.add('success');
            
            // Open WhatsApp in new tab after short delay
            setTimeout(() => {
                window.open(whatsappURL, '_blank');
                
                // Reset form
                contactForm.reset();
                
                // Reset button state after 2 seconds
                setTimeout(() => {
                    sendBtn.classList.remove('success');
                }, 2000);
                
            }, 1000);
        });
    }
}

// Handle fixed header on scroll
window.addEventListener('scroll', function() {
    const header = document.querySelector('header');
    if (window.scrollY > 100) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }
});

// Add ripple effect to buttons
const buttons = document.querySelectorAll('.btn');
buttons.forEach(button => {
    button.addEventListener('click', function(e) {
        const rect = this.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const ripple = document.createElement('span');
        ripple.classList.add('ripple');
        ripple.style.left = `${x}px`;
        ripple.style.top = `${y}px`;
        
        this.appendChild(ripple);
        
        setTimeout(() => {
            ripple.remove();
        }, 600);
    });
});

// Function to animate on load
window.addEventListener('load', function() {
    // Add initial animations to hero section elements
    const heroElements = document.querySelectorAll('#hero .fade-in');
    
    let delay = 0;
    heroElements.forEach(el => {
        setTimeout(() => {
            el.classList.add('appear');
        }, delay);
        delay += 200;
    });
});
