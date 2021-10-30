const nodemailer = require('nodemailer');
let transporter = nodemailer.createTransport({
    host: 'smtp.zoho.com',
    secure: true,
    port: 465,
    auth: {
        user: 'support@moments.lk',
        pass: '6CrUJQc9LYZ4',
    },
});

export async function mailForm(htmlContent: string) {
    const mailOptions = {
        from: 'Moments Clients <support@moments.lk>',
        to: 'iolathief108@gmail.com',
        subject: 'Message from moments Client',
        html: htmlContent,
    };

    await transporter.sendMail(mailOptions, function(err, info) {
        if (err) {
            console.log(err);
        }
    });
    return true;
}
