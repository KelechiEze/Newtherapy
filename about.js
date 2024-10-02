// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetID = this.getAttribute('href').slice(1);
            const targetElement = document.getElementById(targetID);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50,
                    behavior: 'smooth'
                });
            }
        }
    });
});

// Reveal Animations for Service Cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card');

    const revealOnScroll = () => {
        const windowBottom = window.innerHeight + window.scrollY;

        serviceCards.forEach(card => {
            const cardTop = card.offsetTop;

            if (windowBottom > cardTop + 100) {
                card.classList.add('reveal');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll);
});

// Back-to-Top Button
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTopBtn');

    window.addEventListener('scroll', function() {
        if (window.scrollY > 300) {
            backToTopBtn.style.display = 'block';
        } else {
            backToTopBtn.style.display = 'none';
        }
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });
});

document.addEventListener('DOMContentLoaded', function () {
    // Get navbar and landing content elements
    const navbar = document.querySelector('header');
    const landingContent = document.querySelector('.landing-content');

    // Trigger transition by adding visible class
    navbar.style.opacity = '1'; // Make navbar visible
    landingContent.classList.add('visible'); // Add visible class to landing content
});
