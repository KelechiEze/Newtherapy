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

// POST route to handle contact form submission (/send)
app.post('/send', (req, res) => {
    const { firstName, lastName, email, message } = req.body;

    // Email to the admin (confirmation email to the company)
    const adminEmailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 20px;
                color: #333;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                background-color: #007bff;
                color: #fff;
                padding: 20px;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
            }
            .email-body {
                padding: 30px;
                color: #333;
            }
            .email-body h2 {
                color: #007bff;
                margin-bottom: 20px;
                font-size: 22px;
            }
            .message-details {
                background-color: #f4f4f4;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .message-details h3 {
                color: #333;
                margin-bottom: 10px;
                font-size: 18px;
            }
            .message-details p {
                margin: 5px 0;
                font-size: 16px;
            }
            .email-footer {
                background-color: #f1f1f1;
                color: #777;
                text-align: center;
                padding: 20px;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                New Contact Form Submission
            </div>
            <div class="email-body">
                <h2>Dear Admin,</h2>
                <p>You have received a new message through the contact form:</p>
                <div class="message-details">
                    <h3>Message Details</h3>
                    <p><strong>Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Message:</strong> ${message}</p>
                </div>
            </div>
            <div class="email-footer">
                &copy; 2024 Shabach Therapy Clinic. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;

    const mailOptionsAdmin = {
        from: email,
        to: process.env.RECIPIENT_EMAIL,
        subject: `Contact Request from ${firstName} ${lastName}`,
        html: adminEmailBody
    };

    // Email to the client
    const clientEmailBody = `
    <h2>Thank you for contacting Shabach Therapy Clinic!</h2>
    <p>Dear ${firstName},</p>
    <p>Thank you for reaching out. We’ve received your message and will respond to you as soon as possible.</p>
    <p>Best regards,</p>
    <p><strong>Shabach Therapy Clinic</strong></p>
    `;

    const mailOptionsClient = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Thank you for contacting Shabach Therapy Clinic!',
        html: clientEmailBody
    };

    // Send emails to both admin and client
    transporter.sendMail(mailOptionsAdmin, (error, info) => {
        if (error) {
            console.error('Error sending email to admin:', error);
            return res.status(500).send({ success: false, error: 'Error sending email to admin' });
        } else {
            console.log('Admin email sent:', info.response);

            // Send confirmation email to the client
            transporter.sendMail(mailOptionsClient, (error, info) => {
                if (error) {
                    console.error('Error sending email to client:', error);
                    res.status(500).send({ success: false, error: 'Error sending email to client' });
                } else {
                    console.log('Client email sent:', info.response);
                    res.status(200).send({ success: true, message: 'Emails sent successfully' });
                }
            });
        }
    });
});

// POST route to handle book appointment form submission (/book-appointment)
app.post('/book-appointment', (req, res) => {
    const { firstName, lastName, email, service, preferredDate, notes } = req.body;

    // Email to the admin (confirmation email to the company)
    const adminEmailBody = `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset="UTF-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <style>
            body {
                font-family: 'Arial', sans-serif;
                background-color: #f9f9f9;
                margin: 0;
                padding: 20px;
                color: #333;
            }
            .email-container {
                max-width: 600px;
                margin: 0 auto;
                background-color: #ffffff;
                border-radius: 8px;
                overflow: hidden;
                box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
            }
            .email-header {
                background-color: #007bff;
                color: #fff;
                padding: 20px;
                text-align: center;
                font-size: 24px;
                font-weight: bold;
            }
            .email-body {
                padding: 30px;
                color: #333;
            }
            .email-body h2 {
                color: #007bff;
                margin-bottom: 20px;
                font-size: 22px;
            }
            .appointment-details {
                background-color: #f4f4f4;
                padding: 20px;
                border-radius: 8px;
                margin-bottom: 20px;
            }
            .appointment-details h3 {
                color: #333;
                margin-bottom: 10px;
                font-size: 18px;
            }
            .appointment-details p {
                margin: 5px 0;
                font-size: 16px;
            }
            .email-footer {
                background-color: #f1f1f1;
                color: #777;
                text-align: center;
                padding: 20px;
                font-size: 12px;
            }
        </style>
    </head>
    <body>
        <div class="email-container">
            <div class="email-header">
                New Appointment Request
            </div>
            <div class="email-body">
                <h2>Dear Admin,</h2>
                <p>A new appointment request has been submitted. Below are the details of the request:</p>
                <div class="appointment-details">
                    <h3>Appointment Details</h3>
                    <p><strong>Client Name:</strong> ${firstName} ${lastName}</p>
                    <p><strong>Email:</strong> ${email}</p>
                    <p><strong>Service Requested:</strong> ${service}</p>
                    <p><strong>Preferred Date:</strong> ${preferredDate}</p>
                    <p><strong>Additional Notes:</strong> ${notes || 'No additional notes provided'}</p>
                </div>
            </div>
            <div class="email-footer">
                &copy; 2024 Shabach Therapy Clinic. All rights reserved.
            </div>
        </div>
    </body>
    </html>
    `;

    const mailOptionsAdmin = {
        from: email,
        to: process.env.RECIPIENT_EMAIL,
        subject: `Appointment Request from ${firstName} ${lastName}`,
        html: adminEmailBody
    };

    // Email to the client
    const clientEmailBody = `
    <h2>Thank you for booking an appointment with Shabach Therapy Clinic!</h2>
    <p>Dear ${firstName},</p>
    <p>Your appointment request has been received. We will contact you shortly to confirm the details.</p>
    <p>Best regards,</p>
    <p><strong>Shabach Therapy Clinic</strong></p>
    `;

    const mailOptionsClient = {
        from: process.env.EMAIL_USER,
        to: email,
        subject: 'Appointment Request Confirmation',
        html: clientEmailBody
    };

    // Send emails to both admin and client
    transporter.sendMail(mailOptionsAdmin, (error, info) => {
        if (error) {
            console.error('Error sending email to admin:', error);
            return res.status(500).send({ success: false, error: 'Error sending email to admin' });
        } else {
            console.log('Admin email sent:', info.response);

            // Send confirmation email to the client
            transporter.sendMail(mailOptionsClient, (error, info) => {
                if (error) {
                    console.error('Error sending email to client:', error);
                    res.status(500).send({ success: false, error: 'Error sending email to client' });
                } else {
                    console.log('Client email sent:', info.response);
                    res.status(200).send({ success: true, message: 'Emails sent successfully' });
                }
            });
        }
    });
});

// Start the server
app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
