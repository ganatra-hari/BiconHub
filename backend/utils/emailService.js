const nodemailer = require('nodemailer');

const sendEmail = async (to, subject, text) => {
    try {
        // Configure your email service (Use Gmail for testing)
        // To get a password: Go to Google Account -> Security -> App Passwords
        const transporter = nodemailer.createTransport({
            service: 'gmail',
            auth: {
                user: 'YOUR_EMAIL@gmail.com', // Replace with your email
                pass: 'YOUR_APP_PASSWORD'     // Replace with your App Password
            }
        });

        const mailOptions = {
            from: 'BiconHub <no-reply@biconhub.com>',
            to,
            subject,
            text
        };

        await transporter.sendMail(mailOptions);
        console.log("📧 Email Sent Successfully to " + to);
    } catch (error) {
        console.log("⚠️ Email skipped (Configure credentials in utils/emailService.js)");
    }
};

const sendWhatsApp = async (phone, message) => {
    // NOTE: Real WhatsApp requires a paid API like Twilio.
    // For now, we simulate it.
    console.log(`📱 [WHATSAPP to ${phone}]: ${message}`);
};

module.exports = { sendEmail, sendWhatsApp };