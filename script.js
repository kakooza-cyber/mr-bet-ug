// Mobile Navigation Toggle
const hamburger = document.querySelector('.hamburger');
const navMenu = document.querySelector('.nav-menu');

hamburger.addEventListener('click', () => {
    hamburger.classList.toggle('active');
    navMenu.classList.toggle('active');
});

// Close mobile menu when clicking a link
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        hamburger.classList.remove('active');
        navMenu.classList.remove('active');
    });
});

// League Filter Functionality
const leagueFilter = document.getElementById('league-filter');
const predictionCards = document.querySelectorAll('.prediction-card');

leagueFilter.addEventListener('change', () => {
    const selectedLeague = leagueFilter.value;
    
    predictionCards.forEach(card => {
        const league = card.querySelector('.league').textContent.toLowerCase().replace(' ', '-');
        
        if (selectedLeague === 'all' || league === selectedLeague) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Prediction Type Filter
const predictionTypeFilter = document.getElementById('prediction-type');

predictionTypeFilter.addEventListener('change', () => {
    const selectedType = predictionTypeFilter.value;
    
    predictionCards.forEach(card => {
        const prediction = card.querySelector('.prediction strong').textContent.toLowerCase();
        let predictionType = '';
        
        if (prediction === '1' || prediction === 'x' || prediction === '2' || 
            prediction.includes('home') || prediction.includes('away') || prediction.includes('draw')) {
            predictionType = '1x2';
        } else if (prediction.includes('yes') || prediction.includes('no') || 
                  prediction.toLowerCase().includes('both teams')) {
            predictionType = 'btts';
        } else if (prediction.includes('over') || prediction.includes('under')) {
            predictionType = 'over-under';
        }
        
        if (selectedType === 'all' || predictionType === selectedType) {
            card.style.display = 'block';
        } else {
            card.style.display = 'none';
        }
    });
});

// Smooth Scrolling for Anchor Links
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        
        const targetElement = document.querySelector(targetId);
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
        }
    });
});

// Sticky Header on Scroll
window.addEventListener('scroll', () => {
    const header = document.querySelector('.header');
    header.classList.toggle('sticky', window.scrollY > 0);
});

// Animation on Scroll
function animateOnScroll() {
    const elements = document.querySelectorAll('.stat-card, .pricing-card, .prediction-card');
    
    elements.forEach(element => {
        const elementPosition = element.getBoundingClientRect().top;
        const screenPosition = window.innerHeight / 1.2;
        
        if (elementPosition < screenPosition) {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }
    });
}

// Set initial state for animation
document.querySelectorAll('.stat-card, .pricing-card, .prediction-card').forEach(element => {
    element.style.opacity = '0';
    element.style.transform = 'translateY(20px)';
    element.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
});

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('load', animateOnScroll);

// Current Year for Footer
document.getElementById('current-year').textContent = new Date().getFullYear();
