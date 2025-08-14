import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  host: "smtp.zoho.com",
  port: 465,
  secure: true,
  auth: {
    user: process.env.ANNE_CONTACT_EMAIL,
    pass: process.env.ZOHO_MAIL_SECRET_APP_SPECIFIED_KEY,
  },
});

/**
 * Send contact form emails:
 * - One to the admin/brand with user message
 * - One to user as confirmation
 */
export async function sendContactEmails({
  name,
  email,
  message,
}: {
  name: string;
  email: string;
  message: string;
}) {
  // Email to brand/admin
  const adminHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border: 1px solid #eee; border-radius: 8px; }
      .header { font-size: 22px; font-weight: bold; margin-bottom: 20px; color: #2c3e50; }
      .section { margin-bottom: 15px; }
      .label { font-weight: bold; display: inline-block; width: 80px; }
      .message { white-space: pre-wrap; background-color: #f4f4f4; padding: 10px; border-radius: 4px; border: 1px solid #ddd; }
      .footer { font-size: 12px; color: #777; margin-top: 30px; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">New Contact Form Submission</div>
      <div class="section"><span class="label">Name:</span> ${name}</div>
      <div class="section"><span class="label">Email:</span> ${email}</div>
      <div class="section">
        <span class="label">Message:</span>
        <div class="message">${message}</div>
      </div>
      <div class="footer">
        This message was submitted through the contact form on FinanceWithAnne.com.
      </div>
    </div>
  </body>
  </html>
  `;

  // Confirmation email to user
  const userHtml = `
  <!DOCTYPE html>
  <html>
  <head>
    <style>
      body { font-family: Arial, sans-serif; line-height: 1.6; color: #333; background-color: #f9f9f9; padding: 20px; }
      .container { max-width: 600px; margin: 0 auto; background: #fff; padding: 30px; border: 1px solid #eee; border-radius: 8px; }
      .header { font-size: 22px; font-weight: bold; margin-bottom: 20px; color: #2c3e50; }
      .section { margin-bottom: 15px; }
      .label { font-weight: bold; display: inline-block; width: 80px; }
      .message { white-space: pre-wrap; background-color: #f4f4f4; padding: 10px; border-radius: 4px; border: 1px solid #ddd; }
      .footer { font-size: 12px; color: #777; margin-top: 30px; text-align: center; }
    </style>
  </head>
  <body>
    <div class="container">
      <div class="header">Thank You for Contacting Finance With Anne</div>
      <p>Hi ${name},</p>
      <p>We have received your message and will get back to you as soon as possible. Here is a copy of your message for your reference:</p>
      <div class="section"><span class="label">Name:</span> ${name}</div>
      <div class="section"><span class="label">Email:</span> ${email}</div>
      <div class="section">
        <span class="label">Message:</span>
        <div class="message">${message}</div>
      </div>
      <div class="footer">
        This is an automated confirmation from FinanceWithAnne.com. Please do not reply to this email.
      </div>
    </div>
  </body>
  </html>
  `;

  // Send email to admin
  await transporter.sendMail({
    from: `"Finance With Anne - Contact" <${process.env.ANNE_CONTACT_EMAIL}>`,
    to: process.env.ANNE_CONTACT_EMAIL,
    subject: `New Contact Form Message from ${name}`,
    html: adminHtml,
    replyTo: email,
  });

  // Send confirmation email to user
  await transporter.sendMail({
    from: `"Finance With Anne" <${process.env.ANNE_CONTACT_EMAIL}>`,
    to: email,
    subject: "Thank you for contacting Finance With Anne",
    html: userHtml,
  });
}
