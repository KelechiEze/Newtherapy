// Smooth Scrolling for Navigation Links
document.querySelectorAll('.nav-links a').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        if (this.getAttribute('href').startsWith('#')) {
            e.preventDefault();
            const targetID = this.getAttribute('href').slice(1); // Get the ID from the href
            const targetElement = document.getElementById(targetID); // Find the element with the corresponding ID
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 50, // Scroll to the target minus some offset for header
                    behavior: 'smooth' // Smooth scroll behavior
                });
            }
        }
    });
});

// Reveal Animations for Service Cards
document.addEventListener('DOMContentLoaded', function() {
    const serviceCards = document.querySelectorAll('.service-card'); // All service cards

    const revealOnScroll = () => {
        const windowBottom = window.innerHeight + window.scrollY; // Bottom of the visible window

        serviceCards.forEach(card => {
            const cardTop = card.offsetTop; // Top position of each card
            if (windowBottom > cardTop + 100) { // Add reveal class when the card is in the viewport
                card.classList.add('reveal');
            }
        });
    };

    window.addEventListener('scroll', revealOnScroll); // Trigger reveal on scroll
});

// Back-to-Top Button Functionality
document.addEventListener('DOMContentLoaded', function() {
    const backToTopBtn = document.getElementById('backToTopBtn'); // Get the back-to-top button

    window.addEventListener('scroll', function() {
        backToTopBtn.style.display = window.scrollY > 300 ? 'block' : 'none'; // Show or hide button based on scroll position
    });

    backToTopBtn.addEventListener('click', function(e) {
        e.preventDefault();
        window.scrollTo({
            top: 0, // Scroll to the top of the page
            behavior: 'smooth' // Smooth scroll behavior
        });
    });
});

// Landing Section: Reveal Navbar and Landing Content on Load
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('header');
    const landingContent = document.querySelector('.landing-content');

    // Make navbar visible
    navbar.style.opacity = '1'; 
    navbar.style.transition = 'opacity 0.5s ease-in-out'; 

    // Ensure landing content is revealed
    landingContent.classList.add('visible'); 
});

// Navbar Overlay: Toggle Visibility on Hamburger Click
const hamburger = document.getElementById('hamburger'); // Get hamburger icon
const navbarOverlay = document.getElementById('navbarOverlay'); // Reference to the overlay
const closeBtn = document.getElementById('closeBtn'); // Close button in overlay

// Open the full-screen overlay on hamburger click
hamburger.addEventListener('click', () => {
    navbarOverlay.classList.add('active'); // Add 'active' class to show overlay
    document.body.style.overflow = 'hidden'; // Prevent background scrolling when overlay is active
});

// Close the overlay when the close button is clicked
closeBtn.addEventListener('click', () => {
    navbarOverlay.classList.remove('active'); // Remove 'active' class to hide overlay
    document.body.style.overflow = 'auto'; // Restore background scrolling when overlay is closed
});

// Fade-in Elements on Scroll
document.addEventListener('DOMContentLoaded', function() {
    const fadeElements = document.querySelectorAll('.fade-in');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });

    fadeElements.forEach(element => {
        observer.observe(element);
    });
});

// Modal Functionality for Goal Items
document.addEventListener('DOMContentLoaded', function() {
    const goalItems = document.querySelectorAll('.goal-item');
    const modal = document.getElementById('goalModal');
    const modalContent = document.querySelector('.modal-content');
    const closeModalBtn = document.getElementById('closeModal');
    const modalTextContent = document.getElementById('modalTextContent');

    // Icons for different sections
    const icons = {
        "Our Mission": '<i class="fas fa-bullseye"></i>',  // Icon for Mission
        "Our Vision": '<i class="fas fa-eye"></i>',       // Icon for Vision
        "Our Goals": '<i class="fas fa-tasks"></i>'       // Icon for Goals
    };

    // Function to open the modal with specific content
    const openModal = (header, content) => {
        const icon = icons[header] || '';  // Default to empty if no match
        const modalHeader = `<h3>${icon} ${header}</h3>`;  // Add icon to the header

        modalTextContent.innerHTML = `${modalHeader}${content}`; // Insert header and content into modal
        modal.classList.add('active'); // Show modal background
        modalContent.classList.add('active'); // Show modal content with transition
    };

    // Add click event listeners to all goal-items
    goalItems.forEach(item => {
        item.addEventListener('click', () => {
            const header = item.querySelector('h3').innerText; // Get header (Mission, Vision, Goals)
            const content = item.innerHTML; // Get the content of the clicked goal-item
            openModal(header, content); // Pass header and content to modal
        });
    });

    // Close modal function
    const closeModal = () => {
        modal.classList.remove('active');
        modalContent.classList.remove('active');
    };

    // Close modal on clicking the close button or outside the modal content
    closeModalBtn.addEventListener('click', closeModal);
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closeModal(); // Close modal if clicked outside the modal content
        }
    });
});
