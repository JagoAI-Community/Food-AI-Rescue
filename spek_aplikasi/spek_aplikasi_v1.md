# Spesifikasi Aplikasi FoodAI Rescue (v1)

## 1. Tentang Aplikasi
- **Nama Aplikasi**: FoodAI Rescue (FAR)
- **Tujuan Sistem**: FoodAI Rescue adalah platform revolusioner untuk manajemen donasi makanan yang menggunakan kecerdasan buatan (Google Gemini AI) untuk memverifikasi kelayakan makanan secara *real-time* dan melacak jangkauan dampak sosial, sekaligus mencegah pemborosan makanan (*Food Waste*). Aplikasi ini juga dilengkapi dengan mekanisme gamifikasi dinamis untuk memacu semangat kerelawanan pengguna.
- **Karakteristik Tampilan (UI/UX)**: Menggunakan antarmuka premium interaktif dengan gaya tembus pandang (*Glassmorphism*), dihiasi latar *mesh gradients*, animasi *Roadmap*, serta *cursor follower* khusus untuk memandu donatur baru.

---

## 2. Arsitektur & Teknologi Terkini

Aplikasi ini menggunakan arsitektur *Client-Server* terpisah (Frontend dan Backend memiliki domain proses tersendiri).

### 🎨 Frontend (Sisi Klien)
Berfungsi membangun antarmuka utama pengguna:
- **Framework**: React.js (v19) dipadukan dengan TypeScript.
- **Pembangun (Build Tool)**: Vite.
- **Peta & Geolokasi**: Leaflet (`react-leaflet`) untuk visualisasi lokasi penyebaran donasi.
- **Manipulasi Media**: `react-easy-crop` untuk penyesuaian (*cropping*) foto pada profil maupun foto makanan.
- **Ikonografi & Visual**: `lucide-react`.
- **Lingkungan Eksekusi Klien**: Berjalan secara mulus di Web Browser lokal pada `localhost:5173`.

### ⚙️ Backend (Sisi Server)
Layanan penghubung sistem, tempat pemrosesan logika otentikasi, manajemen data, dan integrasi Artificial Intelligence (AI):
- **Core Environment**: Node.js.
- **Framework API**: Express.js (v5.x).
- **Sistem Pengelola Basis Data (RDBMS)**: Menggunakan MySQL2. Skema database yang ada pada proyek bernama `foodairescue` yang dibentuk dari ekspor SQL tunggal `foodairescue.sql` mencakup seluruh data *dummy* awal.
- **Enkripsi**: Algoritma `bcryptjs` untuk perlindungan sandi berlapis.
- **Layanan Notifikasi/SMTP**: `nodemailer` (Digunakan untuk email / pengingat operasional).
- **Manipulasi Gambar Server**: `sharp` (Berguna untuk standar kompresi dan proses optimalisasi foto sebelum diverifikasi AI dan disimpan).
- **Lingkungan Eksekusi Server**: Berjalan di API/CORS Backend secara lokal pada `localhost:5000`.

### 🤖 Integrasi Kecerdasan Buatan (AI)
- Alat utama kecerdasan menggunakan layanan **Google Gemini API** (`@google/genai` (klien) dan `@google/generative-ai` (server)). AI di sini berperan selektif sebagai "Polisi Pangan", bertugas mengenali wujud makanan, mengklasifikasi status higienis *(layak atau sudah tidak aman)*, kehalalan visual, hingga memastikan keamanan produk secara mandiri.

---

## 3. Hak Akses (Role Based Access Control)

Berbagai tipe pengguna dipisahkan secara eksklusif ke dalam 5 (lima) peran berbeda yang masing-masingnya memiliki *dashboard* operasional tersendiri beserta fungsi unik dan pemanfaatan Kecerdasan Buatan (AI) yang spesifik:

1. **Donatur (Individu & Perusahaan (Corporate))**
   - **Fungsi Unik**: Bertindak sebagai entitas penyuplai produk makanan. Memiliki sistem pelacak unik yang dapat mengkonversi riwayat total nilai donasi menjadi "Laporan Efisiensi Pelestarian Bumi" (*Sustainability Report*), yakni kalkulasi penghitungan berapa liter air dan kg CO² emisi yang mampu diselamatkan.
   - **Pemanfaatan AI Spesifik**:
     - **Verifikasi Makanan (Gemini Vision)**: AI memvalidasi foto makanan yang diunggah secara otomatis *(real-time)*. AI menilai tingkat kelayakan konsumsi, kehalalan, kebersihan, hingga klasifikasi apakah kemasan tersebut ekologis sebelum produk dipublikasikan.
     - **Eco Packaging Editor (Khusus Corporate)**: Alat kreasi AI generatif visual (`pollinations.ai`) membantu donatur skala enterprise/industri dalam merancang dan men-generate rancangan desain kemasan/bungkus makanan ramah lingkungan (*eco-friendly packaging mockups*).
     - **CSR Copywriter (Khusus Corporate)**: Asisten AI teks pencerita. Alat ini bertugas menciptakan naskah tulisan laporan dampak sosial perusahaan (*Corporate Social Responsibility*) berdasarkan nilai gizi donatur untuk keperluan paparan media massa pers atau sosial media.

2. **Penerima Donasi (Receiver)**
   - **Fungsi Unik**: Fasilitas sosial terdaftar (seperti Panti Asuhan, Komunitas Sosial, dan Keluarga Terdampak Ekonomi) yang akan menampung makanan. Memiliki akses radar sistem "klaim", di mana entitas dapat memindai persediaan makanan valid terdekat dan mem-booking permintaan pengambilan kurir.
   - **Pemanfaatan AI Spesifik**:
     - **Pewaris Jaminan Mutu AI**: Sekalipun tidak secara langsung mengeksekusi *prompt* API AI, pihak Penerima menjadi tujuan akhir yang merasakan perlindungan intelijen AI. Setiap hidangan yang mereka dapat klaim dipastikan 100% aman berkat kurasi otomatis dari Gemini dan telah melewati algoritma penghindaran racun/makanan kadaluwarsa (Filter Anti-Foodwaste/Poisoning).

3. **Relawan (Volunteer)**
   - **Fungsi Unik**: Pasukan penyambung kebaikan (Kurir Penjemputan). Relawan menyetujui tiket misi antaran dari Donatur ke Penerima. Beroperasi menggunakan validasi verifikasi alat pindai lintas titik (*Scan QR Code Validation Auth*) untuk menghindari salah sasaran.
   - **Pemanfaatan AI Spesifik**: 
     - **Sistem Perhitungan Gamifikasi Sosial**: Aksi pahlawan lapangan dinilai melalui algoritma gamifikasi. AI di latar belakang (server) mengolah validitas waktu penyelesaian *QR* pengantaran untuk menyuntikkan XP poin dinamis, dan mengatur penobatan kasta medali sosial (*Ranking* dari tingkat *Trainee* hingga *Sultan Relawan*).

4. **Admin**
   - **Fungsi Unik**: *Moderator* pusat kestabilan platform. Memantau kesehatan transaksi, keluhan pelanggan darurat (*support ticket request*), serta mendiagnosis variabel sistem.
   - **Pemanfaatan AI Spesifik**:
     - **AI Prompt Engineering & Configuration Dashboard**: Sistem CMS yang membekali Admin ruang kendali (*dashboard backend kontrol*) untuk menukar/memperbarui algoritma *Prompt* instruksi intelejensi pada Gemini tanpa menyentuh *source kode* aplikasi. Admin bisa menajamkan parameter batas toleransi AI deteksi, dan bisa memelihara rotasi kunci API langsung di dalamnya.

5. **SuperAdmin**
   - **Fungsi Unik**: Peran tingkat teratas bagi pemilik server eksekutif. SuperAdmin memiliki kedaulatan independen seperti saklar pemutus operasional (*Maintenance Mode Trigger*) di seluruh aplikasi. SuperAdmin juga satu-satunya level peran yang diperkenankan mendaftar dan mencabut posisi Admin harian biasa.
   - **Pemanfaatan AI Spesifik**: Mengawasi hak prerogatif akses komputasi AI dalam skala masif dan memonitor jejak *log* sistem keseluruhan.

---

## 4. Fitur Modul (Makro & Mikro)

Aplikasi FoodAI Rescue dipecah menjadi beberapa modul utama agar sistem terstruktur dengan baik. Berikut adalah rincian fungsionalitas di tiap modul:

### 4.1 Modul Pemasaran & Publik (Landing Page)
- **Makro (Fitur Utama)**: Halaman *marketing* interaktif untuk menyambut pengguna baru yang berkunjung dan mempromosikan nilai kebermanfaatan FoodAI.
- **Mikro (Komponen Spesifik)**: 
  - Efek *Cursor Follower* (Pendaran cahaya yang mengikuti kursor pengunjung).
  - *Smooth Scroll* Navigasi & *Roadmap Visual* berbasis animasi interaktif.
  - Komponen kartu fitur 3D (*Glassmorphism Cards*) dan form konversi jalur cepat *(Call-To-Action)*.

### 4.2 Modul Autentikasi & Manajemen Akun
- **Makro (Fitur Utama)**: Gerbang utama pendaftaran dan verifikasi sesi identitas sistem.
- **Mikro (Komponen Spesifik)**: 
  - Login multi-peran melalui deteksi *Role-Based Router*.
  - Enkripsi kata sandi berlapis menggunakan algoritma `bcrypt`.
  - *Caching* sesi memori pada sisi klien (*LocalStorage/SessionStorage*).
  - Sistem pengubahan/pengaturan data profil beserta fitur *Crop Image* pada saat memotong pratinjau unggahan foto avatar.

### 4.3 Modul Manajemen Donasi & Gudang Makanan (Inventory Hub)
- **Makro (Fitur Utama)**: Pusat operasi (Hub) bagi entitas Donatur untuk mengunggah makanan baru, mengatur ketersediaan, dan memonitor stok donasi yang masih tayang.
- **Mikro (Komponen Spesifik)**: 
  - Pengunggahan gambar makanan dengan *pipeline* antrean verifikasi wajib dari algortima *Gemini AI*.
  - Manajemen status donasi berbasis waktu (penyembunyian tajuk donasi otomatis apabila memasuki jeda kedaluwarsa).
  - Kalkulator jejak karbon (*Sustainability Impact*) otomatis penghitung takaran emisi dan air.
  - **Bagi Donatur Korporat**: Dibekali ekstensi sistem *Eco Packaging Generator* (penghasil struktur kemasan dari Prompt dan model image) & *CSR Copywriter*.

### 4.4 Modul Radar Penerima (Receiver Exploration)
- **Makro (Fitur Utama)**: Area penelusuran (*Exploration & Booking*) yang dikhususkan bagi target konsumen dan panti penerima donasi.
- **Mikro (Komponen Spesifik)**: 
  - *Map Dashboard* pelacak koordinat mendayagunakan pustaka pemetaan geolokasi *Leaflet*.
  - *Card List* inventori jatah hidangan valid yang direpresentasikan dengan komponen interaktif.
  - Sistem *Checkout/Claim* dan penerbitan langsung instruksi pencarian/penjemputan oleh Relawan.

### 4.5 Modul Operasional Kurir & Gamifikasi (Volunteer Logistics)
- **Makro (Fitur Utama)**: Sistem misi harian untuk mendelegasikan perintah angkut dan mengaitkannya dengan imbalan poin permainan.
- **Mikro (Komponen Spesifik)**: 
  - Papan rute penugasan *(Missions Board)* berisikan titik lokasi menjemput hidangan dan titik serah terima akhir.
  - Modul Kamera Pemindai (QR Validator) terintegrasi pada aplikasi web untuk validasi bukti serah terima objek tanpa kontak *(Contactless)*.
  - *Leaderboard Ranking Engine* yang merubah rekam jejak penyelesaian (XP) menjadi penobatan atribut/pangkat kasta *(Trainee, Hero, dsb)*.

### 4.6 Modul Konfigurasi & Intervensi Pusat (Admin Control Panel)
- **Makro (Fitur Utama)**: Alat kendali manajemen belakang layar *(Admin Dashboard)* untuk menguasai keseluruhan instrumen aplikasi.
- **Mikro (Komponen Spesifik)**: 
  - Panel Rekapitulasi Data *Logs* Transaksi.
  - Meja pengawasan *(Support Request Manager)* guna mengadili insiden komplain dari Donatur/Receiver bila hidangan hilang di tengah jalan.
  - Modul injeksi *Prompt Engineering*: Kotak terminal interaktif untuk mengubah variabel perintah dasar parameter AI secara waktu nyata *(real-time)* Tanpa coding ulang.
  - (Eksklusif SuperAdmin) Tuas Pemeliharaan Darurat (*Maintenance Switch Toggle*).

---

## 5. Lingkungan Pengembangan (Deployment/Environment)
- **Status Berjalan**: Untuk spesifikasi iterasi (v1), skenario sistem utama diperuntukkan dan diujicoba secara Lokal melalui spesifikasi PC / Mesin *Development*.
- **Sistem Operasi**: Sepenuhnya *Cross-Platform* (mendukung Windows, Mac OS, Linux).
- **Kondisi Dasar Lokal**: 
  - Butuh XAMPP/Laragon (Apache & layanan MySQL aktif).
  - Terminal Command Node serentak (1 untuk navigasi terminal Frontend, 1 untuk terminal Backend API).
- **Pengaturan Rahasia**: Aplikasi bergantung sepenuhnya pada skema kredensial `.env` pada *root path*. Konfigurasi di dalamnya melingkupi port database, URL database, *Password* lokal, hingga kunci rahasia utama eksklusif (*`VITE_GEMINI_API_KEY`*). Tanpa variabel lingkungan ini, sistem validasi cerdas dan pintu masuk platform tidak akan merespon.
