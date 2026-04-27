# Laporan Rencana Pengembangan: Eco Packaging Editor

Berdasarkan analisis pada antarmuka (termasuk screenshot) dan *source code* `EcoPackagingEditor.tsx` saat ini, terdapat beberapa area yang sangat potensial untuk ditingkatkan, baik dari segi estetika visual (UI/UX) maupun penambahan fitur lanjutan.

## 1. Peningkatan Visual (UI/UX)

*   **Penyempurnaan Card Produk (Thumbnail):** Efek gradasi hitam di bagian bawah foto produk (`bg-gradient-to-t from-black/80...`) terasa sedikit gelap dan menutupi estetika gambar makanan. Menggantinya dengan efek *glassmorphism* halus (*backdrop blur* dengan transparansi) akan membuatnya terlihat lebih premium.
*   **Konsistensi Aksen Warna:** Pada indikator produk terpilih (ikon centang), warnanya adalah indigo/biru, sementara tombol aksi utama ("GENERATE DESIGN IDEA") memiliki gaya ungu menyala (`from-indigo-600 to-purple-600`). Penyatuan *hue* warna ke satu palet utama yang konsisten akan meningkatkan harmoni desain secara keseluruhan.
*   **State "Input Baru" yang Lebih Interaktif:** Card "Input Baru" saat ini (*solid border* putih/abu) bisa dibuat lebih menarik dengan gaya *dashed border* tebal yang beranimasi saat di-*hover*, untuk memberi kesan bahwa itu adalah *drop-zone* atau area input aktif.
*   **Optimalisasi Empty State:** Area kosong (garis putus-putus) sebelum pengguna melakukan *generate* terlihat sangat sepi pada layar besar. Menambahkan animasi ilustrasi halus atau teks *placeholder* bergaya *typewriter* yang mencontohkan prompt akan menghidupkan antarmuka.

## 2. Peningkatan Fungsi & Fitur

*   **Opsi Kustomisasi Gaya (Art Style Selector):** Saat ini AI terkunci pada gaya statis (*studio product photography, minimalist*). Tambahkan komponen *Chips/Tags* agar pengguna bisa memilih gaya desain kemasan. Contoh: *Rustic Kraft, Modern Minimalist, Futuristic, Eco-Vintage, Pastel Colors*.
*   **Input Filter Material Bebas (Material Constraints):** Secara spesifik, sediakan opsi ceklis atau input singkat untuk memaksa AI mempertimbangkan material tertentu. Misalnya: "Harus menggunakan bambu", "100% bebas plastik", atau "Berbahan pelepah pisang".
*   **Simpan ke Riwayat (History & Bookmark):** Sama halnya dengan fitur `CSRWriterEditor` (yang menggunakan `db.saveCorporateAIResult`), editor kemasan ini seharusnya memiliki tombol **Simpan Ide** agar pengguna tidak kehilangan paduan gambar dan teks konsep yang mereka sukai.
*   **Variasi Generasi (Multi-Generation):** Dibandingkan hanya menghasilkan satu gambar, antarmuka bisa diubah untuk me-render 2 hingga 4 variasi gambar dengan *seed* yang berbeda ke dalam bentuk grid kecil, memberi donor banyak pilihan *mockup*.
*   **Ekspor Pitch-Ready:** Menyediakan tombol untuk mengubah hasil konsep + gambar tersebut menjadi format PDF satu halaman atau format kartu yang siap disajikan untuk keperluan presentasi internal perusahaan.

---
*Laporan ini ditujukan sebagai referensi 백log untuk iterasi perbaikan modul Corporate AI di masa mendatang.*
