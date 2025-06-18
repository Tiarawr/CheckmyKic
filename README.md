<div align="center">

# 👟 CheckMyKicks - Backend API

<img src="https://via.placeholder.com/200x200/FF6B6B/FFFFFF?text=👟%0ACheckMyKicks%0AAPI" alt="CheckMyKicks Logo" width="200" height="200" style="border-radius: 50%;">

*Authentic shoe verification service with image analysis and Virtual Account payments*

[![Node.js](https://img.shields.io/badge/Node.js-339933?style=for-the-badge&logo=nodedotjs&logoColor=white)](https://nodejs.org/)
[![Express.js](https://img.shields.io/badge/Express.js-000000?style=for-the-badge&logo=express&logoColor=white)](https://expressjs.com/)
[![MySQL](https://img.shields.io/badge/MySQL-4479A1?style=for-the-badge&logo=mysql&logoColor=white)](https://mysql.com/)
[![Xendit](https://img.shields.io/badge/Xendit-1E88E5?style=for-the-badge&logo=data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iMjQiIGhlaWdodD0iMjQiIHZpZXdCb3g9IjAgMCAyNCAyNCIgZmlsbD0ibm9uZSIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj4KPHBhdGggZD0iTTEyIDJMMjIgMTJMMTIgMjJMMiAxMkwxMiAyWiIgZmlsbD0id2hpdGUiLz4KPC9zdmc+&logoColor=white)](https://xendit.co/)

**Backend API for CheckMyKicks** - Image-based shoe authenticity verification with Xendit Virtual Account payments

</div>

---

## 🚀 Features

<div align="center">
<img src="https://via.placeholder.com/800x300/E8F5E8/4CAF50?text=🎯+Core+Features+%0A%0A📸+Image+Upload+%7C+💳+VA+Payments+%7C+✅+Auto+Verification+%7C+📧+Email+Notifications" alt="Features Overview" width="600" style="border-radius: 10px;">
</div>

<table>
<tr>
<td width="50%">

### 🔍 **Core Functionality**
- 📸 **Shoe Image Upload** - Support up to 8 images per verification
- 💳 **Dynamic VA Creation** - Powered by Xendit payment gateway  
- 🔍 **Payment Status Tracking** - Real-time status via `shoe_id`
- 🧪 **Manual Payment Simulation** - Perfect for testing workflows
- 📧 **Automated Email Service** - Notifications on successful payments

</td>
<td width="50%">

### ⚡ **Technical Stack**
- 🟢 **Node.js & Express** - Fast and scalable backend
- 🗄️ **MySQL Database** - Reliable data storage
- 🔐 **Xendit Integration** - Secure payment processing
- 📮 **Gmail SMTP** - Professional email delivery
- 🖼️ **Multer File Handling** - Efficient image processing

</td>
</tr>
</table>

---

## 📁 Project Structure

```
📦 CheckMyKicks-Backend
├── 🚀 server.js                 # Main application entry point
├── 📧 emailService.js           # Email notification service
├── 📂 routes/
│   └── 💳 PayNow.js            # Payment route handlers
├── 📁 uploads/                  # Image storage directory
├── 🎨 public/                   # Static assets (email logos)
└── ⚙️ .env                     # Environment variables (NOT UPLOADED)
```

---

## ⚙️ Environment Configuration

<div align="center">

### 🔐 **Setup your `.env` file**

<img src="https://via.placeholder.com/500x200/FFF3E0/FF9800?text=⚙️+Environment+Setup+%0A%0ACreate+.env+file+in+root+directory" alt="Environment Setup" width="400" style="border-radius: 8px;">

</div>

Create a `.env` file in the root directory:

```env
# 🗄️ Database Configuration
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=your_password
DB_NAME=checkmykicks

# 🌐 Server Configuration  
PORT=3000

# 💳 Xendit Payment Gateway
XENDIT_API_KEY=xnd_development_***************

# 📧 Email Service Configuration
EMAIL_SENDER=youremail@gmail.com
EMAIL_APP_PASSWORD=your_app_password
```

> 📌 **Important:** Get your `EMAIL_APP_PASSWORD` from Gmail Settings → App Passwords. Make sure 2FA is enabled on your Gmail account.

---

## 🛠️ Installation & Setup

<div align="center">

### 🚀 **Quick Start Guide**

<img src="https://via.placeholder.com/600x250/E3F2FD/2196F3?text=🚀+Get+Started+in+3+Steps+%0A%0A1.+Clone+Repository+%0A2.+Install+Dependencies+%0A3.+Start+Server" alt="Quick Start" width="500" style="border-radius: 10px;">

</div>

```bash
# 📥 Clone the repository
git clone https://github.com/Tiarawr/CheckmyKic.git
cd CheckmyKic

# 📦 Install dependencies
npm install

# 🚀 Start the development server
node server.js
```

<div align="center">

**🌐 Server will be running at:**
[![Local Server](https://img.shields.io/badge/🌐_Local_Server-http://localhost:3000-success?style=for-the-badge)](http://localhost:3000)

</div>

---

## 📮 API Endpoints

<div align="center">

### 🎯 **API Documentation**

<img src="https://via.placeholder.com/700x150/F3E5F5/9C27B0?text=📮+RESTful+API+Endpoints+%0A%0AComplete+documentation+for+all+available+endpoints" alt="API Endpoints" width="500" style="border-radius: 8px;">

</div>

### 📸 **Upload & Save Shoe Data**
```http
POST /api/checknow
```

**Form Data Parameters:**
- `email` *(string)* - Customer email address
- `brands` *(string)* - Shoe brand name  
- `model` *(string)* - Shoe model name
- `photos` *(files)* - Upload up to 8 image files

---

### 💳 **Create Virtual Account**
```http
POST /api/create-va
```

**Request Body (JSON):**
```json
{
  "bank_code": "BNI",
  "name": "John Doe", 
  "expected_amount": 50000
}
```

**Response:**
```json
{
  "account_number": "381659999561575",
  "bank_code": "BNI",
  "amount": 50000,
  "status": "PENDING"
}
```

---

### 🧪 **Manual Payment Simulation**
```http
POST /api/manual-payment
```

**Request Body (JSON):**
```json
{
  "account_number": "381659999561575",
  "amount": 50000
}
```

**Success Response:**
```json
{
  "message": "Payment simulation successful & email sent.",
  "status": "PAID"
}
```

---

### 🔍 **Check Payment Status**
```http
GET /api/payment-status/:shoe_id
```

**Example:**
```bash
GET /api/payment-status/94
```

**Response:**
```json
{
  "shoe_id": 94,
  "payment_status": "PAID",
  "verification_status": "IN_PROGRESS"
}
```

---

## 📧 Email Notifications

<div align="center">

### 📮 **Automated Email System**

<img src="https://via.placeholder.com/500x200/E8F5E8/4CAF50?text=📧+Email+Notifications+%0A%0AAutomatic+emails+after+successful+payments" alt="Email System" width="400" style="border-radius: 10px;">

</div>

**Email Template:**

**Subject:** `✅ Payment Successful - CheckMyKicks`

**Content:**
```
Hello [Customer Name],

Your payment for shoe verification (ID: #94) has been successfully processed.

Our authentication team is now verifying the authenticity of your shoes.
You'll receive another email with the results within 24-48 hours.

Thank you for choosing CheckMyKicks!

Best regards,
CheckMyKicks Team
```

---

## 🖼️ Application Preview

<div align="center">

### 🎯 **User Interface**

<img src="https://github.com/Tiarawr/Tiarawr/blob/main/Screenshot%202025-05-27%20183547.png" alt="User Interface Preview" width="600" style="border-radius: 10px; box-shadow: 0 4px 8px rgba(0,0,0,0.1);">

*Clean and intuitive user interface for shoe verification requests*

</div>

---

<div align="center">

### 🔐 **Admin Dashboard** *(Private Access)*

> **Note:** Admin dashboard is private and requires authentication for security reasons.  
> However, you can **explore the code and UI design** through this repository.

<table>
<tr>
<td width="33%">
<img src="https://github.com/Tiarawr/Tiarawr/blob/main/Screenshot%202025-05-27%20184428.png" alt="Admin Dashboard 1" width="250" style="border-radius: 8px;">
<p align="center"><em>Dashboard Overview</em></p>
</td>
<td width="33%">
<img src="https://github.com/Tiarawr/Tiarawr/blob/main/Screenshot%202025-05-27%20184612.png" alt="Admin Dashboard 2" width="250" style="border-radius: 8px;">
<p align="center"><em>Verification Management</em></p>
</td>
<td width="33%">
<img src="https://github.com/Tiarawr/Tiarawr/blob/main/Screenshot%202025-05-27%20184856.png" alt="Admin Dashboard 3" width="250" style="border-radius: 8px;">
<p align="center"><em>Payment Tracking</em></p>
</td>
</tr>
</table>

</div>

---

## 🧪 Testing & Development

<div align="center">

### 🔬 **Testing Environment**

<img src="https://via.placeholder.com/500x150/FFF8E1/FFC107?text=🧪+Testing+Made+Easy+%0A%0AUse+manual+payment+simulation+for+development" alt="Testing" width="400" style="border-radius: 8px;">

</div>

**Manual Payment Testing:**
Use the `POST /api/manual-payment` endpoint to simulate payments without actual Virtual Account transactions. Perfect for:

- ✅ Testing payment workflows
- ✅ Email notification testing  
- ✅ Database status updates
- ✅ Integration testing

```bash
# Example test command
curl -X POST http://localhost:3000/api/manual-payment \
  -H "Content-Type: application/json" \
  -d '{"account_number":"381659999561575","amount":50000}'
```

---

## 🚀 Deployment & Production

<div align="center">

### 🌐 **Production Ready**

[![Deploy Status](https://img.shields.io/badge/Deployment-Ready-success?style=for-the-badge)](https://github.com/Tiarawr/CheckmyKic)
[![Security](https://img.shields.io/badge/Security-Verified-green?style=for-the-badge)](https://github.com/Tiarawr/CheckmyKic)

</div>

**Production Checklist:**
- ✅ Environment variables configured
- ✅ Database connection secured
- ✅ Xendit API keys (production)
- ✅ Email service configured
- ✅ File upload limits set
- ✅ Error handling implemented

---

## 🤝 Contributing

<div align="center">

### 💖 **Join Our Development Team**

<img src="https://via.placeholder.com/400x150/E1F5FE/00BCD4?text=🤝+Contributors+Welcome+%0A%0AHelp+improve+CheckMyKicks!" alt="Contributing" width="300" style="border-radius: 10px;">

</div>

We welcome contributions! Here's how you can help:

1. 🍴 **Fork** the repository
2. 🌿 **Create** your feature branch (`git checkout -b feature/amazing-feature`)
3. 💾 **Commit** your changes (`git commit -am 'Add amazing feature'`)
4. 🚀 **Push** to the branch (`git push origin feature/amazing-feature`)
5. 🎉 **Open** a Pull Request

---

## 📞 Support & Contact

<div align="center">

| Contact Method | Details | Status |
|----------------|---------|--------|
| 🐛 **Issues** | [GitHub Issues](https://github.com/Tiarawr/CheckmyKic/issues) | [![Issues](https://img.shields.io/github/issues/Tiarawr/CheckmyKic)](https://github.com/Tiarawr/CheckmyKic/issues) |
| 💻 **Maintainer** | [@Tiarawr](https://github.com/Tiarawr) | [![GitHub](https://img.shields.io/badge/GitHub-Tiarawr-181717?logo=github)](https://github.com/Tiarawr) |
| 📧 **Email** | Technical Support | Available |

</div>

---

## 📜 License

<div align="center">

[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg?style=for-the-badge)](https://opensource.org/licenses/MIT)

**MIT License © 2025 CheckMyKicks**

*This project is open source and available under the MIT License.*

</div>

---

<div align="center">

### 👟 **Built with Passion for Authentic Sneakers**

**Developed by [@Tiarawr](https://github.com/Tiarawr)**

[![Built with Love](https://img.shields.io/badge/Built%20with-❤️-red?style=for-the-badge)](https://github.com/Tiarawr/CheckmyKic)
[![Node.js](https://img.shields.io/badge/Powered%20by-Node.js-green?style=for-the-badge&logo=nodedotjs)](https://nodejs.org/)
[![Xendit](https://img.shields.io/badge/Payments%20by-Xendit-blue?style=for-the-badge)](https://xendit.co/)

*Last updated: June 18, 2025*

---

**⭐ Star this repository if you find it helpful!**

</div>
