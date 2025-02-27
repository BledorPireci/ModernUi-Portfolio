const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.bottom-nav a');

function handleSpecialSections(sectionId, element, isScrolling = false) {
    if (sectionId === 'experience' || sectionId === 'skills') {
        if (isScrolling) {
            const sectionTitle = element.querySelector('h1, h2');
            if (sectionTitle) {
                sectionTitle.style.position = 'relative';
                sectionTitle.style.marginTop = '2rem';
            }
        } else {
            const offset = 80;
            return element.offsetTop - offset;
        }
    }
    return null;
}

document.addEventListener('DOMContentLoaded', () => {
    AOS.init({
        disable: window.innerWidth < 768, 
        once: true, 
        offset: 100,
        duration: 600, 
        delay: 0 
    });
});

let isScrolling;
window.addEventListener('scroll', () => {
    window.clearTimeout(isScrolling);

    isScrolling = setTimeout(() => {
        let current = '';
        sections.forEach(section => {
            const rect = section.getBoundingClientRect();
            const viewportMiddle = window.innerHeight / 2;
            
            if (rect.top <= viewportMiddle + 100 && rect.bottom >= viewportMiddle - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href').substring(1) === current) {
                link.classList.add('active');
            }
        });
    }, 50);
}, { passive: true });

const darkModeToggle = document.getElementById('darkmode-toggle');
const body = document.body;


const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('click', function(e) {
    e.stopPropagation();
});

darkModeToggle.addEventListener('change', function() {
    console.log('Toggle changed:', this.checked); 
    if (this.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
});

const heroBackground = document.querySelector('.hero-background');
const heroSection = document.querySelector('#home');

window.addEventListener('scroll', function() {
    const heroRect = heroSection.getBoundingClientRect();
    
    if (heroRect.top >= 0) {
        heroBackground.style.filter = 'blur(0px)';
    } 
    else {
        const scrolledPastHero = Math.abs(heroRect.top);
        const blurAmount = Math.min(scrolledPastHero / 10, 32);
        heroBackground.style.filter = `blur(${blurAmount}px)`;
    }
});

document.querySelectorAll('.bottom-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            const specialOffset = handleSpecialSections(targetId, targetSection);
            if (specialOffset !== null) {
                window.scrollTo({
                    top: specialOffset,
                    behavior: 'smooth'
                });
            } else {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
