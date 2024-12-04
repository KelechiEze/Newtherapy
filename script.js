// Flutterwave Payment Logic - Defined outside of DOMContentLoaded for global scope
function triggerFlutterwavePayment() {
    const servicePrice = document.getElementById('servicePrice').value;

    FlutterwaveCheckout({
        public_key: "FLWPUBK_TEST-bb3802d6b13b255f4740653c0b2c75bc-X",
        tx_ref: "tx_ref_" + new Date().getTime(),
        amount: servicePrice, 
        currency: "USD",
        payment_options: "card,banktransfer",
        redirect_url: "file:///C:/Users/user/Desktop/Clonedsite/index.html",
        customer: {
            email: "user@example.com",
            phonenumber: "08012345678",
            name: "User Name",
        },
        customizations: {
            title: "Therapy Payment",
            description: "Payment for therapy services",
            logo: "https://your-logo-url.com/logo.png",
        },
    });
}

document.addEventListener("DOMContentLoaded", function() {
    // Handle fade-in elements with incremental delays
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.3}s`; 
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

    setInterval(nextItem, 3000); 

    // Star creation logic
    const starsContainer = document.querySelector('.stars-container');

    function createStar() {
        const star = document.createElement('div');
        star.classList.add('star');

        const xPos = Math.random() * 100;
        const yPos = Math.random() * 100;
        star.style.left = `${xPos}vw`;
        star.style.top = `${yPos}vh`;

        const colors = ['#FFD700', '#FF4500', '#32CD32', '#1E90FF', '#FF69B4'];
        star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

        starsContainer.appendChild(star);

        setTimeout(() => {
            star.classList.add('hidden');
        }, 2000);

        star.addEventListener('transitionend', () => {
            star.remove();
        });

        setTimeout(createStar, 500);
    }

    createStar();

    // Modal functionality for the appointment modal
    const openModalBtn = document.getElementById('openModalBtn');
    const modal = document.getElementById('appointmentModal');
    const closeModalBtn = document.querySelector('.close-btn');

    openModalBtn.addEventListener('click', (e) => {
        e.preventDefault();
        modal.style.display = 'block';
    });

    closeModalBtn.addEventListener('click', () => {
        modal.style.display = 'none';
    });

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
            event.preventDefault();

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
                    appointmentForm.reset();
                    showPricingLocationModal(); // Show the pricing and location modal after booking
                } else {
                    alert('There was an issue with your booking. Please try again.');
                }
            })
            .catch(error => {
                console.error('Error:', error);
                alert('An error occurred. Please try again.');
            })
            .finally(() => {
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

    // Pricing and Location modal functionality
    const pricingLocationModal = document.getElementById('pricingLocationModal');
    const closePricingLocationBtn = document.querySelector('.close-btn-pricing-location');

    function showPricingLocationModal() {
        pricingLocationModal.style.display = 'block';
    }

    closePricingLocationBtn.addEventListener('click', () => {
        pricingLocationModal.style.display = 'none';
    });

    window.addEventListener('click', (e) => {
        if (e.target === pricingLocationModal) {
            pricingLocationModal.style.display = 'none';
        }
    });

    const serviceLocationSelect = document.getElementById('serviceLocation');
    const homeServiceAddressContainer = document.querySelector('.home-sub-question');
    const officeLocationContainer = document.querySelector('.office-sub-question');
    const virtualServiceContainer = document.querySelector('.virtual-sub-question');

    serviceLocationSelect.addEventListener('change', function() {
        homeServiceAddressContainer.style.display = 'none';
        officeLocationContainer.style.display = 'none';
        virtualServiceContainer.style.display = 'none';

        switch (serviceLocationSelect.value) {
            case 'home-service':
                homeServiceAddressContainer.style.display = 'block';
                break;
            case 'office-location':
                officeLocationContainer.style.display = 'block';
                break;
            case 'virtual-service':
                virtualServiceContainer.style.display = 'block';
                break;
        }
    });
});
