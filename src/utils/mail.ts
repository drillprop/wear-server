import nodemailer from 'nodemailer';

export const transport = nodemailer.createTransport({
  service: 'gmail',
  auth: {
    user: process.env.MAIL_USER,
    pass: process.env.MAIL_PASS,
  },
});

export const emailTemplate = (link: string) => `
  <div class="email" style="border: 1px solid black; padding: 20px; font-family: sans-serif; line-height: 1.5; font-size: 18px;">
  <h2>Hi there,</h2>
  <p> You recently requested to reset your password for your account. Click link below if you still want reset your password. </p>
  <a href="${link}">Reset my password</p>
  </div>
`;

export const sendMail = async (email: string, link: string) => {
  transport
    .sendMail({
      from: 'wear e-commerce',
      to: email,
      subject: 'Your Password Reset Token',
      html: emailTemplate(link),
    })
    .catch((err) => {
      console.log(`Something went wrong: ${err}`);
    });
};
