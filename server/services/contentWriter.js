
const { callGeminiWithRotation } = require("./aiUtils");

/**
 * Service for Social Media and CSR Copywriting
 * Supports: tone, platform, language, real-impact metrics (portions, wasteWeight)
 */
async function writeCSRCopy(data, userId) {
    const {
        donorName = 'Perusahaan Kami',
        foodName,
        tone = 'Inspirational',
        platform = 'Instagram/Social',
        language = 'Indonesian',
        portions,
        wasteWeight,
        impactPoints,
        co2Saved,
        pov = 'donor' // Default to donor as requested
    } = data;

    // Build real-metrics context block
    const metricsLines = [];
    if (portions && portions > 0)     metricsLines.push(`- Estimasi Porsi Makanan: ${portions} porsi`);
    if (wasteWeight && wasteWeight > 0) metricsLines.push(`- Limbah Pangan Dicegah: ${wasteWeight} kg`);
    if (impactPoints && impactPoints > 0) metricsLines.push(`- Poin Dampak: ${impactPoints} poin`);
    if (co2Saved && co2Saved > 0)     metricsLines.push(`- Estimasi CO2 Tercegah: ${co2Saved} kg`);
    const metricsBlock = metricsLines.length > 0
        ? `DATA DAMPAK RIIL:\n${metricsLines.join('\n')}`
        : 'DATA DAMPAK: Dampak sosial yang signifikan bagi masyarakat sekitar.';

    // Tone instruction map
    const toneInstructions = {
        'Inspirational': 'Gunakan bahasa yang memotivasi, penuh semangat, menyentuh hati, dan menginspirasi pembaca untuk ikut bergerak.',
        'Professional':  'Gunakan bahasa formal, berfokus pada ESG, CSR, dan keberlanjutan bisnis. Sertakan data & terminologi industri.',
        'Data-Driven':   'Utamakan angka dan fakta. Setiap klaim harus didukung data dampak. Nada objektif dan terpercaya seperti laporan riset.',
        'Emotional':     'Ceritakan kisah yang menyentuh. Fokus pada momen kemanusiaan, kehangatan, dan harapan.'
    };
    const toneGuide = toneInstructions[tone] || toneInstructions['Inspirational'];

    // Platform-specific format instruction
    const platformGuides = {
        'Instagram/Social':     'Format untuk Instagram: paragraf pendek, emoji yang tepat, kalimat hook kuat di baris pertama, akhiri dengan 5–8 hashtag relevan.',
        'LinkedIn/Professional': 'Format untuk LinkedIn: pembuka profesional, narasi 3–4 paragraf, tutup dengan call-to-action untuk kolaborasi. Hindari emoji berlebihan. Sertakan 3–5 hashtag profesional.',
        'Press Release/Formal':  'Format siaran pers: judul dengan format "UNTUK SEGERA DIRILIS", lead paragraph 5W+1H, kutipan dari perwakilan perusahaan, boilerplate singkat perusahaan. Tidak ada emoji.'
    };
    const platformGuide = platformGuides[platform] || platformGuides['Instagram/Social'];

    const langInstruction = language === 'English'
        ? 'Tulis seluruh output dalam Bahasa Inggris yang profesional.'
        : 'Tulis seluruh output dalam Bahasa Indonesia yang baik dan benar.';

    let povInstruction = "";
    if (pov === 'donor') {
        povInstruction = `NARASI SUDUT PANDANG DONATUR: Fokus pada aksi nyata perusahaan "${donorName}" dalam memberikan dampak, tanggung jawab sosial, dan komitmen terhadap keberlanjutan.`;
    } else if (pov === 'receiver') {
        povInstruction = `NARASI SUDUT PANDANG PENERIMA: Fokus pada rasa syukur, manfaat yang dirasakan langsung oleh masyarakat/penerima, dan kehangatan dari bantuan yang diberikan oleh "${donorName}".`;
    } else if (pov === 'both') {
        povInstruction = `BUAT DUA NARASI BERBEDA: 
        1. Sudut Pandang Donatur: Fokus pada komitmen CSR dan dampak lingkungan perusahaan "${donorName}".
        2. Sudut Pandang Penerima: Fokus pada testimoni emosional dan manfaat nyata di lapangan.`;
    }

    const prompt = `
        Anda adalah Social Impact Storyteller dan PR Specialist kelas dunia yang ahli dalam bidang Food Rescue, ESG, dan Corporate Social Responsibility (CSR).

        KONTEKS DONASI:
        - Nama Perusahaan Donatur: ${donorName}
        - Produk Makanan yang Didonasikan: ${foodName}
        ${metricsBlock}

        PREFERENSI KONTEN:
        - Nada Bicara: ${tone}
        - Platform Target: ${platform}
        - Bahasa: ${language}
        - Sudut Pandang (POV): ${pov}

        PANDUAN SUDUT PANDANG: ${povInstruction}
        PANDUAN NADA: ${toneGuide}
        PANDUAN PLATFORM: ${platformGuide}
        ${langInstruction}

        TUGAS:
        Jika POV adalah 'both', buat dua narasi utama (mainCopyDonor dan mainCopyReceiver).
        Jika POV adalah 'donor' atau 'receiver', isi 'mainCopy' dengan narasi tersebut dan kosongkan mainCopyDonor/Receiver.
        Kemudian buat 3 variasi "social hook" (kalimat pembuka alternatif yang menarik dan berbeda satu sama lain).

        Pastikan output HANYA berisi JSON yang valid tanpa markdown (seperti \`\`\`json) atau teks lain di luar JSON.

        OUTPUT FORMAT (JSON):
        {
          "mainCopy": "string (diisi jika POV bukan both)",
          "mainCopyDonor": "string (diisi jika POV is both)",
          "mainCopyReceiver": "string (diisi jika POV is both)",
          "hooks": [
            "string",
            "string",
            "string"
          ],
          "hashtags": ["string"],
          "variations": []
        }
    `;

    return await callGeminiWithRotation(userId, prompt, { isJson: true });
}

module.exports = { writeCSRCopy };
