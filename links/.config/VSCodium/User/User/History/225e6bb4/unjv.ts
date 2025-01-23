import nodemailer from 'nodemailer';
import { getBackendConfig } from '../../shared/configs';

const config = getBackendConfig();

// Create a transporter for Postfix
const transporter = nodemailer.createTransport(config.SMTP);

export async function sendEmail(to: string, subject: string, text: string) {
  try {
    await transporter.sendMail({
      from: `"Log Alert" <${config.SMTP.sendigFrom}>`,
      to,
      subject,
      text
    });
    console.log('Email sent successfully');
  } catch (error) {
    console.error('Failed to send email:', error);
  }
}
