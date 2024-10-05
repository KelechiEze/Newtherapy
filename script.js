document.addEventListener("DOMContentLoaded", function() {
    // Handling fade-in elements with incremental delays
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.3}s`; // Incremental delay
        el.classList.add('fade-in'); // Add the fade-in class to start the animation
    });

    // Carousel logic
    const carouselItems = document.querySelectorAll('.carousel-item');
    let currentItem = 0;

    function showItem(index) {
        carouselItems.forEach((item, i) => {
            item.style.transform = `translateX(${(i - index) * 100}%)`;
        });
    }

    function nextItem() {
        currentItem = (currentItem + 1) % carouselItems.length;
        showItem(currentItem);
    }

    setInterval(nextItem, 3000); // Change carousel item every 3 seconds

    // Star creation logic
    const starsContainer = document.querySelector('.stars-container');

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');

        // Randomize position and color of the star
        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        star.style.left = `${xPos}vw`;
        star.style.top = `${yPos}vh`;

        const colors = ['#FFD700', '#FF4500', '#32CD32', '#1E90FF', '#FF69B4'];
        star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        starsContainer.appendChild(star);

        // Star fade-out after 2 seconds
        setTimeout(() => {
            star.classList.add('hidden');
        }, 2000);

        // Remove star after fade-out completes
        star.addEventListener('transitionend', () => {
            star.remove();
        });

        // Create a new star after 0.5 seconds
        setTimeout(createStar, 500);
    }

    // Start star creation
    createStar();

    // Reset service-item animations every 13 seconds
    setInterval(() => {
        const serviceItems = document.querySelectorAll('.service-item');
        serviceItems.forEach(item => {
            item.style.animation = 'none'; // Remove the animation
            item.offsetHeight; // Trigger reflow
            item.style.animation = ''; // Add the animation back
        });
    }, 13000);

    // Modal functionality
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('appointmentModal');
    const closeModalBtn = document.querySelector('.close-btn');

    // Open modal on click
    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    // Close modal on click
    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

    // Close modal if clicking outside the modal content
    window.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.style.display = 'none';
        }
    });

    // Booking appointment form submission with spinner
    const appointmentForm = document.getElementById('appointmentForm');
    const submitButton = document.querySelector('.submit-btn');
    const loadingSpinner = document.getElementById('loadingSpinner');

    if (appointmentForm) {
        appointmentForm.addEventListener('submit', function(event) {
            event.preventDefault(); // Prevent default form submission

            // Show spinner and disable submit button
            submitButton.disabled = true;
            loadingSpinner.style.display = 'block';

            const formData = {
                firstName: document.getElementById('firstName').value,
                lastName: document.getElementById('lastName').value,
                email: document.getElementById('email').value,
                preferredDate: document.getElementById('preferredDate').value,
                service: document.getElementById('service').value,
                notes: document.getElementById('notes').value
            };

            // Fetch call to your Node.js backend
            fetch('http://localhost:5000/book-appointment', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(formData)
            })
            .then(response => response.json())
            .then(data => {
                if (data.success) {
                    alert('Appointment booked successfully!');
                    appointmentForm.reset(); // Reset the form after submission
                } else {
                    alert('There was an issue with your booking. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            })
            .finally(() => {
                // Hide spinner and enable submit button
                submitButton.disabled = false;
                loadingSpinner.style.display = 'none';
            });
        });
    } else {
        console.error("The appointment form does not exist in the DOM.");
    }

    // Intersection Observer for resource items
    const resourceItems = document.querySelectorAll('.resource-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('fade-in');
            }
        });
    }, { threshold: 0.1 });

    resourceItems.forEach(item => {
        observer.observe(item);
    });
});

document.addEventListener("DOMContentLoaded", function() {
    const heroContent = document.querySelector('.hero-content');
    const heroImage = document.querySelector('.hero-image');

    // Function to handle the fade-in and fade-out loop
    function toggleFade() {
        // Start by fading out
        heroContent.classList.remove('fade-in');
        heroImage.classList.remove('fade-in');
        heroContent.classList.add('fade-out');
        heroImage.classList.add('fade-out');

        // After fade-out completes, wait for 10 seconds and fade in again
        setTimeout(() => {
            heroContent.classList.remove('fade-out');
            heroImage.classList.remove('fade-out');
            heroContent.classList.add('fade-in');
            heroImage.classList.add('fade-in');
        }, 4000); // Adjust the timing based on the fade-out duration

        // Call this function again after 10 seconds for continuous loop
        setTimeout(toggleFade, 14000); // Full cycle: 4s fade-out + 10s pause
    }

    // Start the fade in/out loop
    toggleFade();
});
