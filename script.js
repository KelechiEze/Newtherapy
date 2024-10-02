document.addEventListener("DOMContentLoaded", function() {
    const fadeElements = document.querySelectorAll('.fade-in');
    fadeElements.forEach((el, index) => {
        el.style.animationDelay = `${index * 0.3}s`; // Incremental delay
        el.classList.add('fade-in'); // Add the fade-in class to start the animation
    });
});

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

setInterval(nextItem, 3000); // Change item every 3 seconds


const starsContainer = document.querySelector('.stars-container');

// Function to create a star
function createStar() {
    const star = document.createElement('div');
    star.classList.add('star');

    // Randomize the position of the star
    const xPos = Math.random() * 100; // 0% to 100%
    const yPos = Math.random() * 100; // 0% to 100%
    star.style.left = `${xPos}vw`;
    star.style.top = `${yPos}vh`;

    // Randomize the color of the star
    const colors = ['#FFD700', '#FF4500', '#32CD32', '#1E90FF', '#FF69B4'];
    star.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];

    // Append the star to the stars container
    starsContainer.appendChild(star);

    // Smooth transition for disappearing and reappearing
    setTimeout(() => {
        star.classList.add('hidden'); // Fade out
    }, 2000); // Wait 2 seconds before starting to fade out

    star.addEventListener('transitionend', () => {
        star.remove(); // Remove star after it fades out
    });

    // Call the function again after a timeout
    setTimeout(() => {
        createStar(); // Create a new star
    }, 500); // Create a new star every 0.5 seconds
}

// Start creating stars
createStar();


setInterval(() => {
    const serviceItems = document.querySelectorAll('.service-item');
    serviceItems.forEach(item => {
        item.style.animation = 'none'; // Remove the animation
        item.offsetHeight; // Trigger reflow
        item.style.animation = ''; // Add the animation back
    });
}, 13000); // Adjust the interval to match the spin and pause time (1s spin + 5s pause)
