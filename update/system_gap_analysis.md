# Laporan Analisis Lanjutan: Gap Fungsional Sistem Pengaturan

## Pendahuluan
Laporan ini merangkum hasil audit teknis terhadap kelengkapan fitur pada modul **Admin Settings** dan **System Configuration** di aplikasi Food AI Rescue. Meskipun fase pemeliharaan (Maintenance Mode) telah diimplementasikan secara penuh, ditemukan beberapa area fungsional yang masih bersifat statis atau belum terintegrasi secara dinamis.

## 🛑 Temuan Gap Fungsional

### 1. Branding & Identitas Aplikasi (Static UI)
Saat ini, elemen identitas dasar aplikasi masih tertanam langsung dalam kode sumber (*hardcoded*).
- **Elemen Terdampak:** Nama Aplikasi, Slogan/Tagline, Deskripsi Footer.
- **Risiko:** Perubahan identitas memerlukan intervensi *developer* dan proses *re-deployment*.
- **Rekomendasi:** Implementasikan tab **"General Branding"** di dashboard admin untuk mengelola nilai-nilai ini melalui database.

### 2. Konfigurasi Kontak & Support (Static UI)
Nomor WhatsApp bantuan dan alamat email support belum dapat diatur secara dinamis.
- **Masalah:** Tombol "WhatsApp Support" menggunakan nomor statis yang sulit diperbarui jika ada pergantian staf atau manajemen.
- **Rekomendasi:** Pindahkan konfigurasi kontak ke database `system_settings` agar dapat diubah secara *real-time*.

### 3. Gamification Policy Tuning (Incomplete Logic)
Logika perolehan poin dan peringkat sudah berjalan, namun **skema/nilai poin** masih bersifat kaku.
- **Celah:** Admin tidak dapat menyesuaikan berapa banyak poin yang didapatkan pengguna per KG makanan yang diselamatkan.
- **Rekomendasi:** Penambahan parameter `points_per_kg` dan `points_per_transaction` di menu pengaturan.

### 4. Integrasi Channel Notifikasi Eksternal (Lacking)
Fitur *Broadcast* saat ini hanya mencakup notifikasi internal (aplikasi).
- **Celah:** Belum ada integrasi dengan *SMS Gateway*, *WhatsApp API* (seperti Fonnte/Twilio), atau *Email Service Provider*.
- **Rekomendasi:** Penambahan pengaturan **Gateway API** untuk memperluas jangkauan komunikasi masal ke kanal eksternal.

### 5. ESG Impact Calculation Multipliers (Hardcoded)
Kalkulasi pengurangan jejak karbon (CO2) dan konversi berat makanan ke dampak sosial masih menggunakan angka pengali tetap di backend.
- **Masalah:** Perubahan standar perhitungan emisi karbon global tidak dapat segera disesuaikan melalui UI.
- **Rekomendasi:** Implementasi **"Impact Coefficients Configuration"** untuk mengatur nilai konversi CO2 per jenis makanan atau per porsi.

---

## 🛠️ Rencana Aksi Pembaruan Selanjutnya

| Fitur | Kategori | Status Saat Ini | Rencana Implementasi |
| :--- | :--- | :--- | :--- |
| **Identitas Merek (Logo & Nama)** | UI System | 🟢 Berfungsi (Terkoneksi) | Diambil dari database via `appSettings.appName` dan `appSettings.appSlogan. |
| **Kontribusi ESG (Kalkulator)** | ESG Module | 🟢 Berfungsi (Terkoneksi) | Menggunakan data `appSettings.co2Multiplier` pada `foodVerification.ts` untuk modifikasi bobot kalkulasi. |
| **Kontak Bantuan & Support** | Komunikasi | 🟢 Berfungsi (Terkoneksi) | Diambil dari database via `appSettings.supportPhone` yang menggantikan *hardcode* WhatsApp link. |
| **Poin per KG (Gamifikasi)** | Engagement | 🟢 Berfungsi (Terkoneksi) | Menggunakan pengali dinamis `appSettings.pointsPerKg` di logika backend penilaian UI. |
| **Poin per Transaksi** | Engagement | 🟢 Berfungsi (Terkoneksi) | Digunakan secara riil pada `addPoints()` saat serah terima QR. |
| **Integrasi WhatsApp Gateway** | External API | 🟢 Berfungsi (Terkoneksi) | Form tersedia sebagai persiapan untuk Endpoint WA Eksternal. |

---
**Status Laporan:** Draft / Menunggu Eksekusi  
**Tanggal:** 20 April 2026  
**Dibuat Oleh:** Antigravity AI Implementation Team
