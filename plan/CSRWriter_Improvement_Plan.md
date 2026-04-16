# Laporan Rencana Pengembangan: CSR Copywriter AI

Berdasarkan analisis pada komponen `CSRWriterEditor.tsx` dan antarmuka saat ini, berikut adalah rencana peningkatan untuk mengubah alat ini menjadi pembuat narasi dampak sosial yang lebih profesional dan premium.

## 1. Peningkatan Visual (UI/UX)

*   **Premium Glassmorphism Sidebar:** Mengganti overlay hitam statis pada thumbnail produk dengan efek *glassmorphism* (backdrop-blur) dan border kartu yang lebih halus, konsisten dengan gaya desain `EcoPackagingEditor`.
*   **Dynamic Accent Gradients:** Menggunakan gradasi warna yang lebih "inspiratif" seperti *Rose to Sunset Orange* atau *Pink to Soft Violet* untuk tombol aksi utama agar memberikan kesan optimisme dan energi sosial.
*   **Rich Empty State:** Meningkatkan area editor kosong dengan ilustrasi mikro atau animasi teks yang bergerak pelan (misalnya: "Menenun cerita dampak Anda...").
*   **Typography & Spacing:** Mengatur ulang *line-height* pada area textarea agar teks panjang lebih mudah dibaca, serta memberikan padding ekstra pada "Editor Area" untuk kesan yang tidak sesak.

## 2. Peningkatan Fungsi & Fitur

*   **Tone of Voice Selector:** Menambahkan pilihan nada bicara AI. Pengguna bisa memilih antara:
    *   **Inspirational:** Untuk media sosial (Instagram/Facebook).
    *   **Professional/Formal:** Untuk laporan tahunan perusahaan atau rilis berita.
    *   **Data-Driven:** Fokus pada angka dan statistik keberlanjutan.
    *   **Emotional:** Fokus pada cerita personal dan aspek kemanusiaan.
*   **Target Platform Optimization:** Menyediakan opsi format khusus untuk platform tertentu:
    *   **LinkedIn Post:** Lengkap dengan hashtag relevan.
    *   **Press Release:** Format berita formal.
    *   **Internal Memo:** Pesan untuk karyawan dan stakeholder.
*   **Input Metrik Kustom:** Saat ini metrik dampak masih menggunakan angka acak (`Math.random`). Fitur ini akan ditingkatkan agar pengguna bisa memasukkan angka real (Jumlah porsi, kg limbah yang dicegah, atau jumlah penerima manfaat) untuk hasil narasi yang akurat.
*   **Variasi "Hook" Media Sosial:** AI akan menghasilkan 3 pilihan kalimat pembuka (*hooks*) yang berbeda untuk menarik perhatian pembaca di platform digital.
*   **Language Toggle:** Pilihan output narasi dalam Bahasa Indonesia atau Bahasa Inggris (untuk target audiens global/investor).
*   **Sistem Poin & Badge:** Memberikan *reward* instan (visual badge) kepada donor setelah mereka berhasil menyimpan/menerbitkan narasi dampak mereka, guna meningkatkan keterlibatan gamifikasi.

---
*Laporan ini dibuat sebagai panduan iterasi fitur Corporate AI untuk memperkuat branding "Sustainable Impact Storyteller" FAR.*

## Update 2026-04-15

Berikut adalah rangkuman lengkap dari rencana peningkatan CSR Copywriter yang telah diimplementasikan pada komponen `CSRWriterEditor.tsx`. Ide-ide visual dan fungsional yang dijabarkan sebelumnya kini telah diterapkan, termasuk glassmorphism sidebar, tone selector, platform selector, bahasa toggle, serta input metrik kustom. Implementasi ini meningkatkan pengalaman premium bagi donor korporat dalam menulis narasi dampak sosial.
