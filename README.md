# 🧾 CheckMyKicks - Backend API

Sistem backend untuk **CheckMyKicks**, layanan verifikasi keaslian sepatu berbasis gambar dan pembayaran Virtual Account (VA).

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
├── .env (TIDAK DIUPLOAD)
```

---

## ⚙️ Konfigurasi `.env`

Untuk alasan keamanan, file `.env` **tidak diupload**. Kamu harus **membuat sendiri** file `.env` di root folder proyek:

### Buat `.env` di root dan isi seperti berikut:
```
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=
DB_NAME=checkmykicks
PORT=3000

XENDIT_API_KEY=xnd_development_***************
EMAIL_SENDER=youremail@gmail.com
EMAIL_APP_PASSWORD=your_app_password
```

> 📌 **EMAIL_APP_PASSWORD** bisa kamu dapatkan dari pengaturan Gmail → App Password (bukan password biasa).  
> Pastikan Gmail kamu mengaktifkan 2FA dan App Password.

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
Form-data body:
- `email`: `string`
- `brands`: `string`
- `model`: `string`
- `photos`: upload up to 8 images

---

### 🏦 Buat Virtual Account (VA)
`POST /api/create-va`

#### Body (JSON):
```json
{
  "bank_code": "BNI",
  "name": "John Doe",
  "expected_amount": 50000
}
```

#### Response:
```json
{
  "account_number": "381659999561575",
  "bank_code": "BNI",
  "expected_amount": 50000,
  "shoe_id": 94,
  ...
}
```

---

### 💸 Simulasi Pembayaran Manual
`POST /api/manual-payment`

#### Cara testing di **Postman**:
1. Buka Postman
2. Method: `POST`
3. URL: `http://localhost:3000/api/manual-payment`
4. Headers → `Content-Type: application/json`
5. Body → pilih **raw**, tipe: JSON, lalu isi:
```json
{
  "account_number": "381659999561575",
  "amount": 50000
}
```
6. Klik **Send**

#### ✅ Response Sukses:
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

Email akan dikirim otomatis ke pengguna setelah VA dibayar (atau disimulasikan):

**Subject:** ✅ Pembayaran Berhasil - CheckMyKicks  
**Isi:**  
> Pembayaran untuk sepatu ID `94` berhasil.  
> Tim sedang memverifikasi keaslian sepatumu.

---

## 💬 Catatan

- Xendit API Key hanya aktif di mode development (gunakan test key).
- Nodemailer menggunakan Gmail dan butuh **App Password**.
- Email terlampir logo dari folder `public` dengan CID.

---

## 📜 Lisensi

MIT © 2025 — CheckMyKicks
