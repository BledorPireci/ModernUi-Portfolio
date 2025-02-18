import './style.scss'

const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.bottom-nav a');

window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const rect = section.getBoundingClientRect();
        const viewportMiddle = window.innerHeight / 2;
        
        if (rect.top <= viewportMiddle && rect.bottom >= viewportMiddle) {
            current = section.getAttribute('id');
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

// Add console log to check if element is found
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

// Add click event listener in addition to change
darkModeToggle.addEventListener('click', function(e) {
    e.stopPropagation(); // Prevent event bubbling
});

darkModeToggle.addEventListener('change', function() {
    console.log('Toggle changed:', this.checked); // Debug log
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
