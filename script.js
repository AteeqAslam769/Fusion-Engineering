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
            const offsetTop = target.offsetTop - 80;
            window.scrollTo({
                top: offsetTop,
                behavior: 'smooth'
            });
        }
    });
});

// Rotating text in hero section
const rotatingTexts = [
    'designers.',
    'architects.',
    'researchers.',
    'planners.',
    'advisors.',
    'engineers.'
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
        navbar.style.boxShadow = '0 4px 20px rgba(93, 173, 226, 0.2)';
    } else {
        navbar.style.boxShadow = '0 2px 10px rgba(93, 173, 226, 0.15)';
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
        }
    });
}, observerOptions);

// Observe elements for animation
document.addEventListener('DOMContentLoaded', () => {
    const animateElements = document.querySelectorAll('.news-card, .excellence-card, .project-card');
    animateElements.forEach(el => {
        el.style.opacity = '0';
        el.style.transform = 'translateY(30px)';
        el.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        observer.observe(el);
    });
});

// Add smooth transitions to rotating text
if (rotatingTextElement) {
    rotatingTextElement.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
}

// Parallax effect for hero section (subtle)
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const hero = document.querySelector('.hero');
    if (hero && scrolled < window.innerHeight) {
        hero.style.transform = `translateY(${scrolled * 0.5}px)`;
        hero.style.opacity = 1 - (scrolled / window.innerHeight) * 0.5;
    }
});

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

