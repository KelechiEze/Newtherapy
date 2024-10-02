require('dotenv').config();
const express = require('express');
const nodemailer = require('nodemailer');
const bodyParser = require('body-parser');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors());

// Nodemailer Configuration
const transporter = nodemailer.createTransport({
    service: 'gmail', // You can use other email services too
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_PASS
    }
});

// POST route to handle form submission
app.post('/send', (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    const mailOptions = {
        from: email,
        to: process.env.RECIPIENT_EMAIL,
        subject: `Contact Request from ${firstName} ${lastName}`,
        text: `Name: ${firstName} ${lastName}\nEmail: ${email}\nMessage: ${message}`
    };

    transporter.sendMail(mailOptions, (error, info) => {
        if (error) {
            console.error('Error sending email:', error);
            res.status(500).send({ success: false, error: 'Error sending email' });
        } else {
            console.log('Email sent:', info.response);
            res.status(200).send({ success: true, message: 'Email sent successfully' });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
