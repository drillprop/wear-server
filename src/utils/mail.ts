import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
  host: process.env.MAIL_HOST,
  port: process.env.MAIL_PORT,
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS
  }
});

export const emailTemplate = (link: string) => `
  <div class="email" style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 1.5; font-size: 18px;">
  <h2>Hi there</h2>
  <p> You recently requested to reset your password for your account. Click link below if you still want reset your password. </p>
  <a href="${link}">Reset my password</p>
  </div>
`;
