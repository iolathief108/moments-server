const nodemailer = require("nodemailer");

export async function sendMailEmailConfirmation(email: string, url: string) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Zola" <en@zola.lk>',
    to: email,
    subject: "Confirm Your Email",
    text: `The link to confirm your email is ${url}`,
    html: `click this link to confirm your email -> <a href="${url}">${url}</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}

export async function sendMailPasswordReset(email: string, url: string) {
  let testAccount = await nodemailer.createTestAccount();

  let transporter = nodemailer.createTransport({
    host: "smtp.ethereal.email",
    port: 587,
    secure: false, // true for 465, false for other ports
    auth: {
      user: testAccount.user, // generated ethereal user
      pass: testAccount.pass, // generated ethereal password
    },
  });

  let info = await transporter.sendMail({
    from: '"Zola" <en@zola.lk>',
    to: email,
    subject: "Confirm Your Email",
    text: `Reset your password using this link ${url}`,
    html: `Click this link to reset your password -> <a href="${url}">${url}</a>`,
  });

  console.log("Message sent: %s", info.messageId);
  console.log("Preview URL: %s", nodemailer.getTestMessageUrl(info));
}