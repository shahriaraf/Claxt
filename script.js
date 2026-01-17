// --- DOM ELEMENTS ---
const cursorDot = document.querySelector('.cursor-dot');
const cursorOutline = document.querySelector('.cursor-outline');
const navbar = document.querySelector('nav');
const toast = document.getElementById('toast');
const cartCountEl = document.querySelector('.cart-count');

// --- 1. CUSTOM CURSOR LOGIC ---
const isTouchDevice = 'ontouchstart' in document.documentElement;

if (!isTouchDevice) {
    window.addEventListener('mousemove', (e) => {
        const posX = e.clientX;
        const posY = e.clientY;

        // cursor position
        cursorDot.style.left = `${posX}px`;
        cursorDot.style.top = `${posY}px`;

        // Outline
        cursorOutline.animate({
            left: `${posX}px`,
            top: `${posY}px`
        }, { duration: 500, fill: "forwards" });
    });

    // Hover Effect for Clickable Elements
    document.querySelectorAll('.hover-target').forEach(el => {
        el.addEventListener('mouseenter', () => {
            document.body.classList.add('hovered');
        });
        el.addEventListener('mouseleave', () => {
            document.body.classList.remove('hovered');
        });
    });
}

// --- 3D TILT EFFECT 
if (window.innerWidth > 768) {
    const tiltElements = document.querySelectorAll('.tilt-element');

    tiltElements.forEach(el => {
        el.addEventListener('mousemove', (e) => {
            const rect = el.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const xPct = x / rect.width;
            const yPct = y / rect.height;
            
            const rotateX = (0.5 - yPct) * 20; 
            const rotateY = (xPct - 0.5) * 20;

            el.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.02)`;
            el.style.zIndex = '50'; 
        });

        el.addEventListener('mouseleave', () => {
            el.style.transform = `perspective(1000px) rotateX(0) rotateY(0) scale(1)`;
            el.style.zIndex = ''; 
        });
    });
}

// --- SCROLL REVEAL ANIMATION ---
const revealElements = document.querySelectorAll('.reveal');

const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
        if (entry.isIntersecting) {
            entry.target.classList.add('active');
        }
    });
}, { threshold: 0.1 });

revealElements.forEach(el => observer.observe(el));

// ---NAVBAR SCROLL EFFECT ---
window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// ---INTERACTION & TOAST ---
let cartCount = 0;

function actionTrigger(msg) {
    if(msg.includes('Selected') || msg.includes('Added')) {
        cartCount++;
        cartCountEl.innerText = cartCount;
        
        // Add a bump animation to cart icon
        const btn = document.getElementById('cartBtn');
        btn.style.transform = 'scale(1.2)';
        setTimeout(() => btn.style.transform = 'scale(1)', 200);
    }

    // Show Toast
    toast.innerText = msg;
    toast.classList.add('show');
    
    // Hide Toast after 3 seconds
    setTimeout(() => {
        toast.classList.remove('show');
    }, 3000);
}