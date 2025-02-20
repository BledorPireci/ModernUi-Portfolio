const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.bottom-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const viewportMiddle = window.innerHeight / 2;
        
        if (rect.top <= viewportMiddle + 100 && rect.bottom >= viewportMiddle - 100) {
            current = section.getAttribute('id');
            
            if (current === 'experience' || current === 'skills') {
                const sectionTitle = section.querySelector('h1, h2');
                if (sectionTitle) {
                    sectionTitle.style.position = 'relative';
                    sectionTitle.style.marginTop = '2rem';
                }
            }
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

const darkModeToggle = document.getElementById('darkmode-toggle');
const body = document.body;


if (!darkModeToggle) {
    console.error('Dark mode toggle element not found!');
} else {
    console.log('Dark mode toggle found:', darkModeToggle);
}

const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    darkModeToggle.checked = true;
}

darkModeToggle.addEventListener('click', function(e) {
    e.stopPropagation();
});

darkModeToggle.addEventListener('change', function() {
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

document.addEventListener('DOMContentLoaded', () => {
    AOS.init();

});

document.querySelectorAll('.bottom-nav a').forEach(link => {
    link.addEventListener('click', function(e) {
        e.preventDefault();
        const targetId = this.getAttribute('href').substring(1);
        const targetSection = document.getElementById(targetId);
        
        if (targetSection) {
            if (targetId === 'experience' || targetId === 'skills') {
                const offset = 0;
                const targetPosition = targetSection.offsetTop - offset;
                
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            } else {
                targetSection.scrollIntoView({ behavior: 'smooth' });
            }
        }
    });
});
