document.getElementById('contactForm').addEventListener('submit', async function (e) {
    e.preventDefault();

    const formData = {
        firstName: document.getElementById('firstName').value,
        lastName: document.getElementById('lastName').value,
        email: document.getElementById('email').value,
        message: document.getElementById('message').value,
    };

    try {
        const response = await fetch('https://newtherapy.onrender.com/send', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(formData),
        });

        const result = await response.json();
        if (result.success) {
            alert('Message sent successfully');
            document.getElementById('contactForm').reset();
        } else {
            alert('Error sending message');
        }
    } catch (error) {
        console.error('Error:', error);
        alert('An error occurred while sending your message. Please try again later.');
    }
});

document.getElementById('contactForm').addEventListener('submit', function(event) {
    event.preventDefault(); // Prevent default form submission

    // Show the spinner
    const spinner = document.getElementById('spinner');
    spinner.style.display = 'block';

    // Simulate form submission delay
    setTimeout(function() {
        // Hide spinner after 3 seconds (simulating server response)
        spinner.style.display = 'none';
        alert("Form submitted successfully!");

        // You can proceed with form submission here or reset the form
        document.getElementById('contactForm').reset();
    }, 3000);
});

