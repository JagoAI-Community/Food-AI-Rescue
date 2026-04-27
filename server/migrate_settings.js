
const db = require('./db');

async function migrate() {
    console.log('--- Migrasi System Settings ---');
    try {
        await db.query(`
            CREATE TABLE IF NOT EXISTS system_settings (
                setting_key VARCHAR(50) PRIMARY KEY,
                setting_value TEXT,
                updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP
            )
        `);
        console.log('✅ Tabel system_settings berhasil dipastikan ada.');

        // Init default settings
        const defaults = [
            ['disableExpiryLogic', 'false'],
            ['maintenance', 'false'],
            ['disable_signup', 'false'],
            ['readonly_mode', 'false']
        ];

        for (const [key, val] of defaults) {
            await db.query(`
                INSERT IGNORE INTO system_settings (setting_key, setting_value) 
                VALUES (?, ?)
            `, [key, val]);
        }
        console.log('✅ Data inisial pengaturan sistem berhasil disiapkan.');

    } catch (err) {
        console.error('❌ Gagal menjalankan migrasi:', err);
        process.exit(1);
    }
    console.log('--- Migrasi Selesai ---');
    process.exit(0);
}

migrate();

