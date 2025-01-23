import nodemailer from 'nodemailer';

// Create a transporter for Postfix
const transporter = nodemailer.createTransport({
  host: 'postfix', // Service name matches the Docker container name
  port: 587,
  secure: false, // Postfix doesn't use SSL/TLS
  tls: {
    servername: 'postfix' // Service name matches the Docker container name
  }
});

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    await transporter.sendMail({
      from: '"Log Alert" <email-alerts@paillaugue.fr>',
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
