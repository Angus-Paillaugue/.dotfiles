import { get } from 'http';
import nodemailer from 'nodemailer';

const config = get

// Create a transporter for Postfix
const transporter = nodemailer.createTransport({
  host: 'postfix', // Service name matches the Docker container name
  port: 587,
  secure: false, // Postfix doesn't use SSL/TLS
});

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    await transporter.sendMail({
      from: '"Log Alert" <angus.paillaugue40@gmail.com>',
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
