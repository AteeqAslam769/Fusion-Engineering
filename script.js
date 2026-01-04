// ============================================
// NAVIGATION AND MOBILE MENU
// ============================================
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

// ============================================
// ROTATING TEXT IN HERO SECTION
// ============================================
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
    rotatingTextElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
    setTimeout(() => {
        setInterval(rotateText, 3000);
    }, 2000);
}

// ============================================
// NAVBAR SCROLL EFFECTS
// ============================================
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

// ============================================
// INTERSECTION OBSERVER FOR ANIMATIONS
// ============================================
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

// ============================================
// PARALLAX EFFECT FOR DESIGN EXCELLENCE SECTION
// ============================================
function handleDesignExcellenceParallax() {
    if (window.innerWidth < 768) return; // Skip on mobile
    
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

// ============================================
// ENHANCED OBSERVER FOR PROJECT CARDS
// ============================================
const cardObserverOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -100px 0px'
};

const cardObserver = new IntersectionObserver((entries) => {
    entries.forEach((entry, index) => {
        if (entry.isIntersecting) {
            const delay = window.innerWidth < 768 ? index * 50 : index * 100;
            setTimeout(() => {
                entry.target.classList.add('scroll-visible');
            }, delay);
            cardObserver.unobserve(entry.target);
        }
    });
}, cardObserverOptions);

// ============================================
// ACTIVE NAVIGATION HIGHLIGHTING
// ============================================
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

// ============================================
// LIGHTBOX FUNCTIONALITY
// ============================================
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
const lightboxImgElement = document.getElementById('lightbox-img');
if (lightboxImgElement) {
    lightboxImgElement.addEventListener('click', (e) => {
        e.stopPropagation();
    });
}

// ============================================
// IMAGE LOADING OPTIMIZATION
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
let slideshowInterval = null;

// Detect if user is on mobile/slow connection
function isSlowConnection() {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        const slowTypes = ['slow-2g', '2g', '3g'];
        return slowTypes.includes(connection.effectiveType) || connection.saveData;
    }
    return window.innerWidth < 768;
}

// Aggressive preload for hero images
function aggressivePreloadHeroImages(imagePaths) {
    imagePaths.forEach((src, index) => {
        const link = document.createElement('link');
        link.rel = 'preload';
        link.as = 'image';
        link.href = src;
        if (index === 0) {
            link.fetchpriority = 'high';
        }
        document.head.appendChild(link);
        
        const img = new Image();
        if (index === 0) {
            img.fetchpriority = 'high';
        }
        img.src = src;
    });
}

// Initialize slideshow with aggressive mobile optimization
function initializeHeroSlideshow() {
    const slides = document.querySelectorAll('.hero-slideshow .slide');
    if (slides.length === 0) return;
    
    const heroContent = document.querySelector('.hero-content');
    if (heroContent) {
        heroContent.style.opacity = '0.7';
    }
    
    const isMobile = window.innerWidth < 768;
    const imagesToLoad = isMobile ? 2 : slides.length;
    
    slideshowImages = shuffleArray(projectImages).slice(0, slides.length);
    
    aggressivePreloadHeroImages(slideshowImages.slice(0, imagesToLoad));
    
    let loadedCount = 0;
    
    slides.forEach((slide, index) => {
        if (slideshowImages[index] && index < imagesToLoad) {
            const img = new Image();
            
            if (index === 0) {
                img.fetchpriority = 'high';
            }
            
            img.onload = () => {
                slide.style.backgroundImage = `url('${slideshowImages[index]}')`;
                slide.classList.add('loaded');
                loadedCount++;
                
                if (loadedCount === 1) {
                    if (heroContent) {
                        heroContent.style.opacity = '1';
                    }
                    startSlideshow();
                    
                    if (isMobile && imagesToLoad < slides.length) {
                        setTimeout(() => {
                            loadRemainingHeroImages(slides, imagesToLoad);
                        }, 1000);
                    }
                }
            };
            
            img.onerror = () => {
                console.error('Failed to load hero image:', slideshowImages[index]);
                loadedCount++;
                if (loadedCount === 1) {
                    if (heroContent) {
                        heroContent.style.opacity = '1';
                    }
                    startSlideshow();
                }
            };
            
            img.src = slideshowImages[index];
        }
    });
    
    setTimeout(() => {
        if (!slideshowInterval && loadedCount === 0) {
            console.log('Fallback: Starting slideshow after timeout');
            if (heroContent) {
                heroContent.style.opacity = '1';
            }
            startSlideshow();
        }
    }, 3000);
}

// Load remaining hero images in background
function loadRemainingHeroImages(slides, startIndex) {
    slides.forEach((slide, index) => {
        if (index >= startIndex && slideshowImages[index]) {
            const img = new Image();
            img.onload = () => {
                slide.style.backgroundImage = `url('${slideshowImages[index]}')`;
                slide.classList.add('loaded');
            };
            img.src = slideshowImages[index];
        }
    });
}

function startSlideshow() {
    if (slideshowInterval) return;
    
    const interval = window.innerWidth < 768 ? 4000 : 3000;
    
    slideshowInterval = setInterval(() => {
        changeSlide(1);
    }, interval);
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

// ============================================
// LAZY LOADING FOR PROJECT CARDS
// ============================================
function setupLazyLoadingForProjects() {
    const projectCards = document.querySelectorAll('.project-card');
    
    if ('IntersectionObserver' in window) {
        const rootMargin = window.innerWidth < 768 ? '200px 0px' : '100px 0px';
        
        const imageObserver = new IntersectionObserver((entries, observer) => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    const card = entry.target;
                    const projectImage = card.querySelector('.project-image');
                    
                    if (projectImage && !projectImage.classList.contains('loading')) {
                        projectImage.classList.add('loading');
                        
                        const bgImage = projectImage.style.backgroundImage;
                        const imageUrl = bgImage.replace(/url\(['"]?(.+?)['"]?\)/i, '$1');
                        
                        projectImage.style.backgroundColor = '#f0f0f0';
                        
                        const img = new Image();
                        img.onload = () => {
                            projectImage.style.backgroundColor = '';
                            projectImage.classList.add('loaded');
                            projectImage.classList.remove('loading');
                        };
                        img.onerror = () => {
                            projectImage.style.backgroundColor = '#e0e0e0';
                            projectImage.classList.remove('loading');
                        };
                        img.src = imageUrl;
                    }
                    
                    observer.unobserve(card);
                }
            });
        }, {
            rootMargin: rootMargin,
            threshold: 0.01
        });
        
        projectCards.forEach(card => {
            imageObserver.observe(card);
        });
    } else {
        projectCards.forEach(card => {
            const projectImage = card.querySelector('.project-image');
            if (projectImage) {
                const bgImage = projectImage.style.backgroundImage;
                const imageUrl = bgImage.replace(/url\(['"]?(.+?)['"]?\)/i, '$1');
                
                const img = new Image();
                img.onload = () => {
                    projectImage.classList.add('loaded');
                };
                img.src = imageUrl;
            }
        });
    }
}

// ============================================
// VIDEO OPTIMIZATION
// ============================================
function optimizeVideo() {
    const video = document.querySelector('.how-we-think-video');
    if (video) {
        if (isSlowConnection()) {
            video.removeAttribute('autoplay');
            video.pause();
            video.poster = 'data:image/svg+xml,%3Csvg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 1920 1080"%3E%3Crect fill="%23333" width="1920" height="1080"/%3E%3C/svg%3E';
        }
        
        video.addEventListener('loadeddata', () => {
            video.classList.add('loaded');
        });
        
        setTimeout(() => {
            if (!video.classList.contains('loaded')) {
                video.classList.add('loaded');
            }
        }, 2000);
    }
}

// ============================================
// CONTACT FORM HANDLING
// ============================================
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

// ============================================
// MAIN INITIALIZATION
// ============================================
document.addEventListener('DOMContentLoaded', () => {
    const connection = navigator.connection || navigator.mozConnection || navigator.webkitConnection;
    if (connection) {
        console.log('Connection type:', connection.effectiveType);
    }
    
    // Initialize hero slideshow
    initializeHeroSlideshow();
    
    // Setup lazy loading for project cards
    const projectLoadDelay = window.innerWidth < 768 ? 500 : 0;
    setTimeout(() => {
        setupLazyLoadingForProjects();
    }, projectLoadDelay);
    
    // Optimize video loading
    optimizeVideo();
    
    // Setup contact form
    setupContactForm();
    
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
    
    // Set up parallax scroll listener (desktop only)
    if (window.innerWidth >= 768) {
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
    }
});