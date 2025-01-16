// Select all sections and navigation links
const sections = document.querySelectorAll('section');
const navLinks = document.querySelectorAll('.bottom-nav a');

// Add scroll event listener
window.addEventListener('scroll', () => {
    let current = '';
    
    sections.forEach(section => {
        const sectionTop = section.offsetTop;
        const sectionHeight = section.clientHeight;
        
        // Check if we've scrolled past the section's top
        if (window.scrollY >= (sectionTop - sectionHeight / 3)) {
            current = section.getAttribute('id');
        }
    });

    // Update active class in navigation
    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href').substring(1) === current) {
            link.classList.add('active');
        }
    });
});

// Get the theme toggle checkbox and body element
const darkModeToggle = document.getElementById('darkmode-toggle');
const body = document.body;

// Check for saved theme preference in localStorage
const savedTheme = localStorage.getItem('theme');
if (savedTheme === 'dark') {
    body.classList.add('dark-theme');
    darkModeToggle.checked = true;
}

// Add event listener for theme toggle
darkModeToggle.addEventListener('change', function() {
    if (this.checked) {
        body.classList.add('dark-theme');
        localStorage.setItem('theme', 'dark');
    } else {
        body.classList.remove('dark-theme');
        localStorage.setItem('theme', 'light');
    }
});

// Get the hero background element
const heroBackground = document.querySelector('.hero-background');
const heroSection = document.querySelector('#home');
const linksSection = document.querySelector('#links');

// Add scroll event listener
window.addEventListener('scroll', function() {
    // Get the hero section's bottom position
    const heroBottom = heroSection.getBoundingClientRect().bottom;
    // Get the links section's top position
    const linksTop = linksSection.getBoundingClientRect().top;
    
    // Remove blur if we're in the links section
    if (linksTop <= window.innerHeight && linksTop > 0) {
        heroBackground.style.filter = 'blur(0px)';
    }
    // Otherwise, calculate blur based on scroll position
    else if (heroBottom < window.innerHeight) {
        const blurAmount = Math.min((window.innerHeight - heroBottom) / 10, 32);
        heroBackground.style.filter = `blur(${blurAmount}px)`;
    } else {
        heroBackground.style.filter = 'blur(0px)';
    }
});
