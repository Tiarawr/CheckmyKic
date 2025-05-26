const nodemailer = require("nodemailer");
const path = require("path");
const puppeteer = require("puppeteer");
require("dotenv").config();

function generateCertificateHTML(certData) {
  const { itemName, productId, customerEmail, issueDate } = certData;

  return `
<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0"/>
  <title>Certificate of Authenticity</title>
  <script src="https://cdn.tailwindcss.com"></script>
  <style>
    @media print {
      body { margin: 0; }
      .no-print { display: none; }
    }
    @page {
      size: A4 landscape;
      margin: 0.5in;
    }
  </style>
</head>
<body class="bg-gray-100 p-4">

  <div class="p-8">
    <div class="bg-white border-2 border-gray-200 rounded-lg p-8 max-w-3xl mx-auto" style="aspect-ratio: 4/3;">
    
        <div class="text-center pb-6">
          <div class="flex items-center justify-center gap-4 mb-4">
            <div>
              <h1 class="text-3xl font-bold text-gray-800 tracking-wide">
                CERTIFICATE OF AUTHENTICITY
              </h1>
              <p class="text-base text-gray-600 mt-1">
                Issued by CheckMyKicks
              </p>
            </div>
          </div>

        <div class="space-y-6">
          <!-- Item Name -->
          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-1">ITEM NAME</h3>
            <p class="text-base text-gray-800">
              ${itemName} (Code: ${productId})
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-1">CERTIFICATE OWNER</h3>
            <p class="text-base text-gray-800">
              ${customerEmail} – ${issueDate}
            </p>
          </div>

          <div>
            <h3 class="text-lg font-semibold text-gray-700 mb-1">DETAILS</h3>
            <div class="text-sm text-gray-700 leading-relaxed">
              <p class="mb-2">
                This item has been carefully inspected by our legit check team. Based on materials, stitching, tags, and overall shape, the item is deemed authentic.
              </p>
              <p>
                Thank you for using CheckMyKicks. This certificate is digitally issued and valid for reference in authenticity claims.
              </p>
            </div>
          </div>

          <div class="pt-4 border-t border-gray-200">
            <p class="text-xs text-gray-600 italic">
              Note: Please do not edit or screenshot this document for other purposes. Valid certificates are only issued by CheckMyKicks.com.
            </p>
          </div>

          <div class="flex justify-end pt-2">
            <div class="text-right">
              <div class="w-24 h-8 border-b-2 border-gray-800 mb-1"></div>
              <p class="text-xs text-gray-600">
                Authorized Signature
              </p>
            </div>
          </div>
        </div>

      </div>
    </div>
  </div>
</body>
</html>
`;
}

async function generateCertificatePDF(html) {
  const browser = await puppeteer.launch({
    headless: "new",
    args: [
      "--no-sandbox",
      "--disable-setuid-sandbox",
      "--disable-dev-shm-usage",
      "--disable-accelerated-2d-canvas",
      "--no-first-run",
      "--no-zygote",
      "--disable-gpu",
    ],
  });

  try {
    const page = await browser.newPage();

    // Set viewport for better rendering
    await page.setViewport({ width: 1200, height: 800 });

    // Set content with better wait conditions
    await page.setContent(html, {
      waitUntil: ["networkidle0", "domcontentloaded"],
      timeout: 30000,
    });

    // Generate PDF with optimized settings
    const pdf = await page.pdf({
      format: "A4",
      landscape: true,
      printBackground: true,
      margin: {
        top: "0.2in",
        bottom: "0.2in",
        left: "0.2in",
        right: "0.2in",
      },
      preferCSSPageSize: true,
    });

    return pdf;
  } finally {
    await browser.close();
  }
}

async function sendPaymentSuccessEmail(
  toEmail,
  shoeId,
  type = "payment",
  certData = null
) {
  let subject = "";
  let htmlContent = "";
  const attachments = [
    {
      filename: "vector-50.svg",
      path: path.join(__dirname, "assets", "vector-50.svg"),
      cid: "checkmykicks-logo",
    },
  ];

  if (type === "payment") {
    subject = `✅ Pembayaran Berhasil - Order #${shoeId}`;
    subject = `✅ Pembayaran Berhasil - Order #${shoeId}`;
    htmlContent = `
<html>
  <body style="font-family:Poppins,sans-serif;padding:40px;background-color:#f4f4f4;margin:0;">
    <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">

      <!-- Logo -->
      <div style="text-align:center;margin-bottom:20px;">
        <img src="cid:checkmykicks-logo" alt="CheckMyKicks Logo" style="height:50px;" />
      </div>

      <!-- Header -->
      <h2 style="color:#16a34a;font-size:24px;font-weight:700;margin-bottom:10px;text-align:center;">
        ✅ Pembayaran Berhasil
      </h2>
      <p style="text-align:center;font-size:16px;color:#374151;margin-bottom:30px;">
        Pembayaran untuk sepatu dengan ID <strong>#${shoeId}</strong> telah dikonfirmasi.
      </p>

      <!-- Detail Box -->
      <div style="background:#ecfdf5;padding:20px;border-radius:10px;border-left:4px solid #22c55e;margin-bottom:30px;">
        <p style="margin:0;font-size:14px;color:#166534;">
          Tim kami sedang memverifikasi keaslian sepatu Anda. Hasil akan dikirim maksimal dalam 3x24 jam kerja.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align:center;font-size:13px;color:#9ca3af;">
        Tim CheckMyKicks<br/>
        CheckMyKicks.com
      </div>
    </div>
  </body>
</html>`;
  } else if (type === "not pass") {
    subject = `❌ Hasil Verifikasi - Order #${shoeId}`;
    htmlContent = `
      <html>
  <body style="font-family:Poppins,sans-serif;padding:40px;background-color:#f4f4f4;margin:0;">
    <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">

      <!-- Logo -->
      <div style="text-align:center;margin-bottom:20px;">
        <img src="cid:checkmykicks-logo" alt="CheckMyKicks Logo" style="height:50px;" />
      </div>

      <!-- Header -->
      <h2 style="color:#dc2626;font-size:24px;font-weight:700;margin-bottom:10px;text-align:center;">
        ❌ Verifikasi Tidak Lolos
      </h2>
      <p style="text-align:center;font-size:16px;color:#374151;margin-bottom:30px;">
        Sepatu Anda dengan ID <strong>#${shoeId}</strong> <strong>tidak lolos</strong> proses verifikasi keaslian kami.
      </p>

      <!-- Detail Box -->
      <div style="background:#fef2f2;padding:20px;border-radius:10px;border-left:4px solid #dc2626;margin-bottom:30px;">
        <p style="margin:0;font-size:14px;color:#7f1d1d;">
          Tim ahli kami menemukan beberapa indikator yang tidak sesuai dengan standar keaslian produk original.
        </p>
      </div>

      <!-- Footer -->
      <div style="text-align:center;font-size:13px;color:#9ca3af;">
        Tim CheckMyKicks<br/>
        CheckMyKicks.com
      </div>
    </div>
  </body>
</html>`;
  } else if (type === "pass" && certData) {
    subject = `🎉 Sertifikat Keaslian - Order #${shoeId}`;
    htmlContent = `
<html>
  <body style="font-family:Poppins,sans-serif;padding:40px;background-color:#f4f4f4;margin:0;">
    <div style="max-width:600px;margin:auto;background:white;padding:30px;border-radius:12px;box-shadow:0 2px 10px rgba(0,0,0,0.05);">
      
      <!-- Logo -->
      <div style="text-align:center;margin-bottom:20px;">
        <img src="cid:checkmykicks-logo" alt="CheckMyKicks Logo" style="height:50px;"/>
      </div>

      <!-- Header -->
      <h2 style="color:#16a34a;font-size:24px;font-weight:700;margin-bottom:10px;text-align:center;">
        🎉 Produk Lolos Verifikasi
      </h2>
      <p style="text-align:center;font-size:16px;color:#374151;margin-bottom:30px;">
        Terima kasih telah menggunakan layanan kami. Sepatu Anda dinyatakan asli.
      </p>

      <!-- Certificate Summary -->
      <div style="font-size:14px;color:#1f2937;line-height:1.6;">
        <p><strong>Order ID:</strong> #${certData.orderId}</p>
        <p><strong>Item:</strong> ${certData.itemName}</p>
        <p><strong>Product Code:</strong> ${certData.productId}</p>
        <p><strong>Issue Date:</strong> ${certData.issueDate}</p>
      </div>

      <!-- Divider -->
      <hr style="margin:30px 0;border:none;border-top:1px solid #e5e7eb;" />

      <!-- PDF Info -->
      <p style="font-size:14px;color:#6b7280;">
        📎 Sertifikat PDF telah dilampirkan pada email ini. Silakan simpan file tersebut sebagai bukti keaslian sepatu.
      </p>

      <!-- Footer -->
      <div style="text-align:center;margin-top:30px;font-size:13px;color:#9ca3af;">
        Tim CheckMyKicks<br/>
        CheckMyKicks.com
      </div>
    </div>
  </body>
</html>
`;

    // 🧾 Generate Professional PDF Certificate
    console.log("🔄 Generating PDF certificate...");
    try {
      const pdfHTML = generateCertificateHTML(certData);
      const pdfBuffer = await generateCertificatePDF(pdfHTML);

      attachments.push({
        filename: `CheckMyKicks_Certificate_${certData.orderId}.pdf`,
        content: pdfBuffer,
        contentType: "application/pdf",
      });

      console.log("✅ PDF certificate generated successfully");
    } catch (pdfError) {
      console.error("❌ Failed to generate PDF:", pdfError);
      // Continue without PDF if generation fails
    }
  }

  const transporter = nodemailer.createTransport({
    service: "gmail",
    auth: {
      user: process.env.EMAIL_SENDER,
      pass: process.env.EMAIL_APP_PASSWORD,
    },
  });

  const mailOptions = {
    from: `"CheckMyKicks - Sneaker Authentication" <${process.env.EMAIL_SENDER}>`,
    to: toEmail,
    subject,
    html: htmlContent,
    attachments,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log(`📨 Email sent successfully to ${toEmail}`);
    console.log(`📋 Subject: ${subject}`);

    if (type === "pass" && certData) {
      console.log(`📄 PDF Certificate attached for Order #${certData.orderId}`);
    }
  } catch (emailError) {
    console.error("❌ Failed to send email:", emailError);
    throw emailError;
  }
}

module.exports = { sendPaymentSuccessEmail };
