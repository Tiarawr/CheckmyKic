# 🧾 CheckMyKicks - Backend API

Backend untuk **CheckMyKicks**, layanan verifikasi keaslian sepatu berbasis gambar dan pembayaran Virtual Account (VA) menggunakan Xendit.

---

## 🚀 Fitur

- Upload data & gambar sepatu
- Pembuatan VA dinamis via Xendit
- Cek status pembayaran via `shoe_id`
- Simulasi pembayaran manual untuk testing
- Kirim email otomatis setelah pembayaran berhasil

---

## 📁 Struktur Folder

```
├── server.js
├── emailService.js
├── routes/
│   └── PayNow.js
├── uploads/
├── public/      ← untuk logo email
├── .env         ← (TIDAK DIUPLOAD)
```

---

## ⚙️ Konfigurasi `.env`

Buat file `.env` di root folder dengan isi sebagai berikut:

```env
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=checkmykicks
PORT=3000

XENDIT_API_KEY=xnd_development_***************
EMAIL_SENDER=youremail@gmail.com
EMAIL_APP_PASSWORD=your_app_password
```

> 📌 **EMAIL_APP_PASSWORD** dapat diperoleh dari pengaturan Gmail → App Password. Pastikan Gmail kamu sudah mengaktifkan 2FA.

---

## 📦 Instalasi & Menjalankan Server

```bash
git clone https://github.com/Tiarawr/CheckmyKic
cd CheckmyKic
npm install
node server.js
```

Server akan berjalan di:
```
http://localhost:3000
```

---

## 📮 Endpoint API

### ✅ Upload & Simpan Sepatu
`POST /api/checknow`  
Form-data:
- `email`: string
- `brands`: string
- `model`: string
- `photos`: upload max 8 file gambar

---

### 🏦 Buat Virtual Account (VA)
`POST /api/create-va`

Contoh Body (JSON):
```json
{
  "bank_code": "BNI",
  "name": "John Doe",
  "expected_amount": 50000
}
```

---

### 💸 Simulasi Pembayaran Manual
`POST /api/manual-payment`  
Contoh Body (JSON):
```json
{
  "account_number": "381659999561575",
  "amount": 50000
}
```

Response sukses:
```json
{
  "message": "Simulasi pembayaran berhasil & email terkirim."
}
```

---

### 🧾 Cek Status Pembayaran
`GET /api/payment-status/:shoe_id`

Contoh:
```
GET /api/payment-status/94
```

---

## 📧 Contoh Email Setelah Pembayaran

Subject:
```
✅ Pembayaran Berhasil - CheckMyKicks
```

Isi:
> Pembayaran untuk sepatu ID `94` berhasil.  
> Tim sedang memverifikasi keaslian sepatumu.

---

## 🖼️ Preview Aplikasi

### 🎯 Halaman Pengguna
![Preview 1](https://github.com/Tiarawr/Tiarawr/blob/main/Screenshot%202025-05-27%20183547.png)

### 🔐 Dashboard Admin (Login Private)
> Mohon maaf, halaman admin bersifat pribadi & tidak bisa diakses publik karena alasan privasi.  
> Tapi kamu tetap bisa **menjelajahi kode dan tampilannya** lewat repositori ini.

- ![Admin Preview 1](https://github.com/Tiarawr/Tiarawr/blob/main/Screenshot%202025-05-27%20184428.png)
- ![Admin Preview 2](https://github.com/Tiarawr/Tiarawr/blob/main/Screenshot%202025-05-27%20184612.png)
- ![Admin Preview 3](https://github.com/Tiarawr/Tiarawr/blob/main/Screenshot%202025-05-27%20184856.png)

---

## 🧪 Testing Manual

Gunakan endpoint `POST /api/manual-payment` untuk mensimulasikan pembayaran tanpa menggunakan VA asli. Sistem tetap mengirim email dan memperbarui status.

---

## 📜 Lisensi

MIT © 2025 — CheckMyKicks  
