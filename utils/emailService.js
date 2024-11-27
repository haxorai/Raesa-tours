const nodemailer = require('nodemailer');

// Create transporter
const transporter = nodemailer.createTransport({
  service: process.env.EMAIL_SERVICE || 'gmail',
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASSWORD
  }
});

// Send email to admin
const sendAdminNotification = async (contactData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: process.env.ADMIN_EMAIL,
    subject: `New Contact Form Submission: ${contactData.subject}`,
    html: `
      <h2>New Contact Form Submission</h2>
      <p><strong>From:</strong> ${contactData.name} (${contactData.email})</p>
      <p><strong>Subject:</strong> ${contactData.subject}</p>
      <p><strong>Message:</strong></p>
      <p>${contactData.message}</p>
      <p><strong>Submitted at:</strong> ${new Date(contactData.createdAt).toLocaleString()}</p>
      <hr>
      <p>Login to the admin dashboard to respond to this message.</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Admin notification email sent successfully');
  } catch (error) {
    console.error('Error sending admin notification:', error);
  }
};

// Send auto-reply to user
const sendAutoReply = async (contactData) => {
  const mailOptions = {
    from: process.env.EMAIL_USER,
    to: contactData.email,
    subject: 'Thank you for contacting Raeesa Tours',
    html: `
      <h2>Thank you for reaching out!</h2>
      <p>Dear ${contactData.name},</p>
      <p>We have received your message regarding "${contactData.subject}". Our team will review it and get back to you as soon as possible.</p>
      <p>For your reference, here's a copy of your message:</p>
      <blockquote>${contactData.message}</blockquote>
      <p>Best regards,<br>Raeesa Tours Team</p>
    `
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log('Auto-reply email sent successfully');
  } catch (error) {
    console.error('Error sending auto-reply:', error);
  }
};

module.exports = {
  sendAdminNotification,
  sendAutoReply
};
