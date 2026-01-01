// Mobile Menu Toggle
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('navMenu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close menu when clicking on a link
document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// Smooth scrolling for anchor links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            const offsetTop = target.offsetTop - 70;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Rotating text in hero section
const rotatingTexts = [
    'Building Tomorrow.',
    'Engineering Excellence.',
    'Innovating Solutions.',
    'Creating Value.',
    'Delivering Quality.',
    'Shaping Futures.'
];

let currentIndex = 0;
const rotatingTextElement = document.getElementById('rotatingText');

function rotateText() {
    if (rotatingTextElement) {
        rotatingTextElement.style.opacity = '0';
        rotatingTextElement.style.transform = 'translateY(-20px)';
        
        setTimeout(() => {
            currentIndex = (currentIndex + 1) % rotatingTexts.length;
            rotatingTextElement.textContent = rotatingTexts[currentIndex];
            rotatingTextElement.style.opacity = '1';
            rotatingTextElement.style.transform = 'translateY(0)';
        }, 300);
    }
}

// Start rotating text after initial delay
if (rotatingTextElement) {
    setTimeout(() => {
        setInterval(rotateText, 3000);
    }, 2000);
}

// Navbar background on scroll
let lastScroll = 0;
const navbar = document.querySelector('.navbar');

window.addEventListener('scroll', () => {
    const currentScroll = window.pageYOffset;
    
    if (currentScroll > 100) {
        navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
    }
    
    lastScroll = currentScroll;
});

// Intersection Observer for fade-in animations
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
            if (entry.target.classList.contains('section-title')) {
                entry.target.classList.add('visible');
            }
        }
    });
}, observerOptions);

// Parallax effect for Design Excellence section
function handleDesignExcellenceParallax() {
    const section = document.querySelector('.how-we-think');
    const title = document.querySelector('.how-we-think-title');
    const subtitle = document.querySelector('.how-we-think-subtitle');
    
    if (!section || !title || !subtitle) return;
    
    const rect = section.getBoundingClientRect();
    const windowHeight = window.innerHeight;
    
    // Only apply parallax when section is in viewport
    if (rect.bottom >= 0 && rect.top <= windowHeight) {
        const scrolled = window.pageYOffset;
        const sectionTop = section.offsetTop;
        const sectionHeight = section.offsetHeight;
        const scrollProgress = (scrolled + windowHeight - sectionTop) / (sectionHeight + windowHeight);
        
        // Clamp between 0 and 1
        const progress = Math.max(0, Math.min(1, scrollProgress));
        
        // Subtle parallax movement (negative moves up, positive moves down)
        const titleOffset = (progress - 0.5) * 40; // Max 40px movement
        const subtitleOffset = (progress - 0.5) * 30; // Max 30px movement
        
        title.style.transform = `translateY(${titleOffset}px)`;
        subtitle.style.transform = `translateY(${subtitleOffset}px)`;
    }
}

// Enhanced observer for project cards with staggered animation
const cardObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            setTimeout(() => {
                entry.target.classList.add('scroll-visible');
            }, index * 100); // Stagger animation
            cardObserver.unobserve(entry.target);
        }
    });
}, cardObserverOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.news-card, .excellence-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    // Observe project cards with staggered animation
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        cardObserver.observe(card);
    });
    
    // Observe section titles
    const sectionTitles = document.querySelectorAll('.section-title');
    sectionTitles.forEach(title => {
        observer.observe(title);
    });
    
    // Set up parallax scroll listener with throttling
    let ticking = false;
    window.addEventListener('scroll', () => {
        if (!ticking) {
            window.requestAnimationFrame(() => {
                handleDesignExcellenceParallax();
                ticking = false;
            });
            ticking = true;
        }
    }, { passive: true });
    
    // Initial call
    handleDesignExcellenceParallax();
});

// Add smooth transitions to rotating text
if (rotatingTextElement) {
    rotatingTextElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
}

// Removed parallax effect to prevent overlap issues

// Add active state to navigation links based on scroll position
const sections = document.querySelectorAll('section[id]');

function highlightNavigation() {
    const scrollY = window.pageYOffset;

    sections.forEach(section => {
        const sectionHeight = section.offsetHeight;
        const sectionTop = section.offsetTop - 100;
        const sectionId = section.getAttribute('id');

        if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
            document.querySelectorAll('.nav-menu a').forEach(link => {
                link.classList.remove('active');
                if (link.getAttribute('href') === `#${sectionId}`) {
                    link.classList.add('active');
                }
            });
        }
    });
}

window.addEventListener('scroll', highlightNavigation);

// Lightbox functionality for project galleries
function openLightbox(element) {
    const lightbox = document.getElementById('lightbox');
    const lightboxImg = document.getElementById('lightbox-img');
    
    if (lightbox && lightboxImg) {
        const bgImage = element.style.backgroundImage;
        const imageUrl = bgImage.replace(/url\(['"]?(.+?)['"]?\)/i, '$1');
        lightboxImg.src = imageUrl;
        lightbox.classList.add('active');
        document.body.style.overflow = 'hidden';
    }
}

function closeLightbox() {
    const lightbox = document.getElementById('lightbox');
    if (lightbox) {
        lightbox.classList.remove('active');
        document.body.style.overflow = '';
    }
}

// Close lightbox on Escape key
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

// Prevent lightbox from closing when clicking on the image
const lightboxImg = document.getElementById('lightbox-img');
if (lightboxImg) {
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Slideshow functionality
const projectImages = [
    'Projects/1004-17 Bay St. Louis/RENDER 1_1 - Photo.jpg',
    'Projects/6036 Yakima - Renders/Yakima_1 - Photo.jpg',
    'Projects/6099-01 Heavy Truck Pitt - Renders/01.jpg',
    'Projects/6120-01 Kitchen - Renders/kitchen-cam01copy.jpg',
    'Projects/7002-22 Saffron Oncology - Interior Renders/Chemotherapy (1).jpg',
    'Projects/7003-01 Salon - Interior Renders/008.jpg',
    'Projects/Aurora Residence - Renders/1.jpg',
    'Projects/1004-17 Bay St. Louis/RENDER 1_5 - Photo.jpg',
    'Projects/6036 Yakima - Renders/Yakima_3 - Photo.jpg',
    'Projects/6099-01 Heavy Truck Pitt - Renders/03.jpg',
    'Projects/6120-01 Kitchen - Renders/kitchen-cam03 copy.jpg',
    'Projects/7002-22 Saffron Oncology - Interior Renders/Chemotherapy (5).jpg',
    'Projects/Aurora Residence - Renders/3.jpg',
    'Projects/1004-17 Bay St. Louis/RENDER 1_10 - Photo.jpg',
    'Projects/6036 Yakima - Renders/Yakima_5 - Photo.jpg'
];

// Shuffle array for random order
function shuffleArray(array) {
    const shuffled = [...array];
    for (let i = shuffled.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [shuffled[i], shuffled[j]] = [shuffled[j], shuffled[i]];
    }
    return shuffled;
}

let currentSlideIndex = 0;
let slideshowImages = [];

// Initialize slideshow
document.addEventListener('DOMContentLoaded', () => {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length > 0) {
        // Get random images
        slideshowImages = shuffleArray(projectImages).slice(0, slides.length);
        
        // Set background images
        slides.forEach((slide, index) => {
            if (slideshowImages[index]) {
                slide.style.backgroundImage = `url('${slideshowImages[index]}')`;
            }
        });
        
        // Start auto-slideshow
        setInterval(() => {
            changeSlide(1);
        }, 5000);
    }
});

function changeSlide(direction) {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    const dots = document.querySelectorAll('.slideshow-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentSlideIndex].classList.remove('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.remove('active');
    }
    
    currentSlideIndex += direction;
    
    if (currentSlideIndex >= slides.length) {
        currentSlideIndex = 0;
    } else if (currentSlideIndex < 0) {
        currentSlideIndex = slides.length - 1;
    }
    
    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

function currentSlide(index) {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    const dots = document.querySelectorAll('.slideshow-dots .dot');
    
    if (slides.length === 0) return;
    
    slides[currentSlideIndex].classList.remove('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.remove('active');
    }
    
    currentSlideIndex = index - 1;
    
    slides[currentSlideIndex].classList.add('active');
    if (dots[currentSlideIndex]) {
        dots[currentSlideIndex].classList.add('active');
    }
}

// Video loading handler for Design Excellence section
document.addEventListener('DOMContentLoaded', () => {
    const video = document.querySelector('.how-we-think-video');
    if (video) {
        video.addEventListener('loadeddata', () => {
            video.classList.add('loaded');
        });
        
        // Fallback: if video doesn't load, show after timeout
        setTimeout(() => {
            if (!video.classList.contains('loaded')) {
                video.classList.add('loaded');
            }
        }, 2000);
    }
});

// Contact Form Handling
document.addEventListener('DOMContentLoaded', () => {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    // Wait for EmailJS to load
    function initializeEmailJS() {
        if (typeof emailjs !== 'undefined') {
            // Initialize EmailJS with your public key
            // Get your public key from: https://dashboard.emailjs.com/admin/integration
            emailjs.init('YOUR_PUBLIC_KEY'); // Replace with your EmailJS Public Key
        } else {
            // Retry after a short delay if EmailJS hasn't loaded yet
            setTimeout(initializeEmailJS, 100);
        }
    }
    
    // Initialize EmailJS
    initializeEmailJS();
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            // Check if EmailJS is configured
            if (typeof emailjs === 'undefined') {
                formMessage.textContent = 'Email service is not configured. Please contact us directly at ateeqaslam769@gmail.com';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }
            
            // Get form data
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            // Hide previous messages
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
            
            // Disable submit button
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                // Send email using EmailJS
                // Replace 'YOUR_SERVICE_ID' and 'YOUR_TEMPLATE_ID' with your actual IDs from EmailJS dashboard
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    from_name: `${firstName} ${lastName}`,
                    first_name: firstName,
                    last_name: lastName,
                    from_email: email,
                    message: message,
                    to_email: 'ateeqaslam769@gmail.com',
                    reply_to: email
                });
                
                // Show success message
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                // Reset form
                contactForm.reset();
                
                // Scroll to message
                setTimeout(() => {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
                
            } catch (error) {
                console.error('EmailJS Error:', error);
                
                // Show error message
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly at ateeqaslam769@gmail.com';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                
                // Scroll to message
                setTimeout(() => {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } finally {
                // Re-enable submit button
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
});

