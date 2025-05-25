const nodemailer = require("nodemailer");
const path = require("path");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_SENDER,
    pass: process.env.EMAIL_APP_PASSWORD,
  },
});

async function sendPaymentSuccessEmail(toEmail, shoeId) {
  const mailOptions = {
    from: process.env.EMAIL_SENDER,
    to: toEmail,
    subject: "Pembayaran Berhasil - CheckMyKicks",
    html: `
      <html>
        <head>
          <link href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600&display=swap" rel="stylesheet" />
        </head>
        <body style="margin: 0; padding: 40px 0; background-color: #f4f4f5; font-family: 'Poppins', sans-serif;">
          <div style="text-align: center; margin-bottom: 30px;">
            <img src="vector-50.svg" style="height: 50px;" alt="CheckMyKicks Logo"/>
          </div>

          <div style="max-width: 600px; margin: auto; background: white; padding: 30px; border-radius: 8px;">
            <h1 style="margin: 0; font-size: 24px; font-weight: 600; color: #222;">
              Pembayaran <span style="color: #888;">Berhasil</span>
            </h1>

            <p style="margin-top: 20px; font-size: 16px; color: #333;">
              Pembayaran untuk sepatu dengan ID <strong>${shoeId}</strong> telah berhasil dikonfirmasi.
            </p>

            <p style="font-size: 16px; color: #333;">
              Tim kami sedang memverifikasi keaslian sepatu kamu. Hasil akan dikirimkan ke email ini dalam waktu dekat.
            </p>

            <p style="margin-top: 30px; font-size: 14px; color: #888;">
              Salam hangat, <br/> Tim CheckMyKicks
            </p>
          </div>
        </body>
      </html>
    `,
  };

  return transporter.sendMail(mailOptions);
}

module.exports = { sendPaymentSuccessEmail };
