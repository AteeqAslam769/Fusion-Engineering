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

// ============================================
// OPTIMIZED IMAGE LOADING STRATEGY
// ============================================

// 1. PRELOAD HERO IMAGES (High Priority)
// ============================================
const projectImages = [
    'Projects/1004-17 Bay St. Louis/RENDER 1_1 - Photo-min.webp',
    'Projects/6036 Yakima - Renders/Yakima_1 - Photo-min.webp',
    'Projects/6099-01 Heavy Truck Pitt - Renders/01-min.webp',
    'Projects/6120-01 Kitchen - Renders/kitchen-cam01copy-min.webp',
    'Projects/7002-22 Saffron Oncology - Interior Renders/Chemotherapy_1-min.webp',
    'Projects/7003-01 Salon - Interior Renders/008-min.webp',
    'Projects/Aurora Residence - Renders/1.webp',
    'Projects/1004-17 Bay St. Louis/RENDER 1_5 - Photo-min.webp',
    'Projects/6036 Yakima - Renders/Yakima_3 - Photo-min.webp',
    'Projects/6099-01 Heavy Truck Pitt - Renders/03-min.webp',
    'Projects/6120-01 Kitchen - Renders/kitchen-cam03 copy-min.webp',
    'Projects/7002-22 Saffron Oncology - Interior Renders/Chemotherapy_5-min.webp',
    'Projects/Aurora Residence - Renders/3.webp',
    'Projects/1004-17 Bay St. Louis/RENDER 1_10 - Photo-min.webp',
    'Projects/6036 Yakima - Renders/Yakima_5 - Photo-min.webp'
];

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

// Preload hero slideshow images with high priority
function preloadHeroImages(imagePaths) {
    imagePaths.forEach((src, index) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        // First image gets highest priority
        if (index === 0) {
            link.fetchpriority = 'high';
        }
        document.head.appendChild(link);
    });
}

// Initialize slideshow with preloading
function initializeHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length === 0) return;
    
    // Shuffle and select images
    slideshowImages = shuffleArray(projectImages).slice(0, slides.length);
    
    // Preload these images immediately
    preloadHeroImages(slideshowImages);
    
    // Set background images
    slides.forEach((slide, index) => {
        if (slideshowImages[index]) {
            const img = new Image();
            img.src = slideshowImages[index];
            img.onload = () => {
                slide.style.backgroundImage = `url('${slideshowImages[index]}')`;
                slide.classList.add('loaded');
            };
        }
    });
    
    // Start auto-slideshow after first image loads
    setTimeout(() => {
        setInterval(() => {
            changeSlide(1);
        }, 3000);
    }, 500);
}

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

// 2. LAZY LOAD PROJECT CARDS (Lower Priority)
// ============================================
function setupLazyLoadingForProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    // Check if browser supports Intersection Observer
    if ('IntersectionObserver' in window) {
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const projectImage = card.querySelector('.project-image');
                    
                    if (projectImage) {
                        const bgImage = projectImage.style.backgroundImage;
                        const imageUrl = bgImage.replace(/url\(['"]?(.+?)['"]?\)/i, '$1');
                        
                        // Create a new image to preload
                        const img = new Image();
                        img.onload = () => {
                            projectImage.classList.add('loaded');
                        };
                        img.src = imageUrl;
                    }
                    
                    // Stop observing this card
                    observer.unobserve(card);
                }
            });
        }, {
            rootMargin: '50px 0px', // Start loading 50px before card enters viewport
            threshold: 0.01
        });
        
        // Observe all project cards
        projectCards.forEach(card => {
            imageObserver.observe(card);
        });
    } else {
        // Fallback: load all images immediately if Intersection Observer not supported
        projectCards.forEach(card => {
            const projectImage = card.querySelector('.project-image');
            if (projectImage) {
                projectImage.classList.add('loaded');
            }
        });
    }
}

// 3. OPTIMIZE DESIGN EXCELLENCE VIDEO
// ============================================
function optimizeVideo() {
    const video = document.querySelector('.how-we-think-video');
    if (video) {
        // Set loading attribute
        video.setAttribute('loading', 'lazy');
        
        video.addEventListener('loadeddata', () => {
            video.classList.add('loaded');
        });
        
        // Fallback
        setTimeout(() => {
            if (!video.classList.contains('loaded')) {
                video.classList.add('loaded');
            }
        }, 2000);
    }
}

// ============================================
// MAIN INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    // 1. Initialize hero slideshow immediately (highest priority)
    initializeHeroSlideshow();
    
    // 2. Setup lazy loading for project cards
    setupLazyLoadingForProjects();
    
    // 3. Optimize video loading
    optimizeVideo();
    
    // Rest of your existing code...
    setupNavigationAndAnimations();
    setupContactForm();
});

// ============================================
// EXISTING FUNCTIONALITY (Consolidated)
// ============================================
function setupNavigationAndAnimations() {
    // Mobile Menu Toggle
    const hamburger = document.getElementById('hamburger');
    const navMenu = document.getElementById('navMenu');

    if (hamburger && navMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
    }

    // Close menu when clicking on a link
    document.querySelectorAll('.nav-menu a').forEach(link => {
        link.addEventListener('click', () => {
            if (hamburger && navMenu) {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            }
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

    if (rotatingTextElement) {
        rotatingTextElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
        setTimeout(() => {
            setInterval(rotateText, 3000);
        }, 2000);
    }

    // Navbar background on scroll
    let lastScroll = 0;
    const navbar = document.querySelector('.navbar');

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;
        
        if (navbar) {
            if (currentScroll > 100) {
                navbar.style.boxShadow = '0 4px 20px rgba(0, 0, 0, 0.1)';
            } else {
                navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.08)';
            }
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
        
        if (rect.bottom >= 0 && rect.top <= windowHeight) {
            const scrolled = window.pageYOffset;
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const scrollProgress = (scrolled + windowHeight - sectionTop) / (sectionHeight + windowHeight);
            
            const progress = Math.max(0, Math.min(1, scrollProgress));
            
            const titleOffset = (progress - 0.5) * 40;
            const subtitleOffset = (progress - 0.5) * 30;
            
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
                }, index * 100);
                cardObserver.unobserve(entry.target);
            }
        });
    }, cardObserverOptions);

    // Observe elements for animation
    const animateElements = document.querySelectorAll('.news-card, .excellence-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
    
    const projectCards = document.querySelectorAll('.project-card');
    projectCards.forEach(card => {
        cardObserver.observe(card);
    });
    
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
    
    handleDesignExcellenceParallax();

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
}

// Lightbox functionality
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

document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape') {
        closeLightbox();
    }
});

lightboxImg = document.getElementById('lightbox-img');
if (lightboxImg) {
    lightboxImg.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// Contact Form Handling
function setupContactForm() {
    const contactForm = document.getElementById('contactForm');
    const formMessage = document.getElementById('formMessage');
    
    function initializeEmailJS() {
        if (typeof emailjs !== 'undefined') {
            emailjs.init('YOUR_PUBLIC_KEY');
        } else {
            setTimeout(initializeEmailJS, 100);
        }
    }
    
    initializeEmailJS();
    
    if (contactForm && formMessage) {
        contactForm.addEventListener('submit', async (e) => {
            e.preventDefault();
            
            if (typeof emailjs === 'undefined') {
                formMessage.textContent = 'Email service is not configured. Please contact us directly at ateeqaslam769@gmail.com';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                return;
            }
            
            const firstName = document.getElementById('firstName').value.trim();
            const lastName = document.getElementById('lastName').value.trim();
            const email = document.getElementById('email').value.trim();
            const message = document.getElementById('message').value.trim();
            
            formMessage.style.display = 'none';
            formMessage.className = 'form-message';
            
            const submitBtn = contactForm.querySelector('button[type="submit"]');
            const originalBtnText = submitBtn.textContent;
            submitBtn.disabled = true;
            submitBtn.textContent = 'Sending...';
            
            try {
                await emailjs.send('YOUR_SERVICE_ID', 'YOUR_TEMPLATE_ID', {
                    from_name: `${firstName} ${lastName}`,
                    first_name: firstName,
                    last_name: lastName,
                    from_email: email,
                    message: message,
                    to_email: 'ateeqaslam769@gmail.com',
                    reply_to: email
                });
                
                formMessage.textContent = 'Thank you! Your message has been sent successfully. We will get back to you soon.';
                formMessage.className = 'form-message success';
                formMessage.style.display = 'block';
                
                contactForm.reset();
                
                setTimeout(() => {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
                
            } catch (error) {
                console.error('EmailJS Error:', error);
                
                formMessage.textContent = 'Sorry, there was an error sending your message. Please try again or contact us directly at ateeqaslam769@gmail.com';
                formMessage.className = 'form-message error';
                formMessage.style.display = 'block';
                
                setTimeout(() => {
                    formMessage.scrollIntoView({ behavior: 'smooth', block: 'nearest' });
                }, 100);
            } finally {
                submitBtn.disabled = false;
                submitBtn.textContent = originalBtnText;
            }
        });
    }
}