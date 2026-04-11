# Habisin

Aplikasi resep untuk memasak lebih hemat, mengurangi sampah bahan makanan, dan menemukan resep yang cocok untuk suasana hati.

## Tentang

Habisin membantu pengguna mencari resep, menentukan resep sesuai anggaran, dan memanfaatkan sisa bahan yang ada di dapur.

### Fitur utama

- 🌍 Resep internasional
- 💰 Rekomendasi sesuai anggaran
- ♻️ Ide olahan sisa bahan
- 🎯 Pilihan resep berdasarkan mood
- 📱 Antarmuka responsif untuk desktop dan mobile

## Teknologi

**Frontend:**
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

**API:**
- Node.js
- Vercel serverless function untuk `api/assistant`

**Backend (opsional lokal):**
- Node.js
- Express.js
- Supabase

## Persiapan

### Prasyarat
- Node.js 18+ (atau versi terbaru yang kompatibel)
- npm

### Instalasi

1. Clone repositori:
```bash
git clone https://github.com/AiefN/habisin-web.git
cd habisin
```

2. Install dependensi frontend:
```bash
npm install
```

3. Jika ingin menjalankan backend lokal juga, install dependensi backend:
```bash
cd backend
npm install
cd ..
```

### Konfigurasi lokal

Untuk pengembangan lokal dengan backend Express, pastikan file `backend/.env` berisi:
```env
SUPABASE_URL=https://your-supabase-url
SUPABASE_KEY=your-supabase-key
PORT=3004
```

Jika ingin mengubah port backend, buat file `.env` di root dan atur:
```env
VITE_BACKEND_PORT=3004
```

### Menjalankan aplikasi

1. Jalankan backend lokal (opsional):
```bash
cd backend
npm run dev
```

2. Jalankan frontend:
```bash
npm run dev
```

3. Buka browser di:
```text
http://localhost:5173
```

Halaman `Bantuan Memasak` akan memanggil API internal pada `/api/assistant`.

### Build produksi

```bash
npm run build
```

## Deployment

Proyek ini disiapkan untuk dideploy ke Vercel.
- `vercel.json` mengatur build frontend dan fungsi API
- `api/assistant.js` adalah endpoint produksi untuk fitur bantuan resep

## Struktur proyek

```
habisin/
├── api/
│   └── assistant.js      # Fungsi API utama untuk fitur asisten resep
├── src/
│   ├── app/
│   │   ├── components/   # Komponen antarmuka
│   │   ├── pages/        # Halaman aplikasi
│   │   ├── data/         # Data resep statis
│   │   └── styles/       # Styling global
│   └── main.tsx
├── backend/              # Backend Express untuk pengembangan lokal
│   ├── server.js
│   ├── routes/
│   └── models/
├── index.html
├── vite.config.ts
├── vercel.json
├── package.json
└── README.md
```

## Catatan

- Untuk pengembangan lokal, frontend memanggil API pada `/api/assistant`.
- Pada produksi, API diproses oleh fungsi serverless di `api/assistant.js`.
- Pastikan tidak menyimpan kunci rahasia langsung di repositori.

## Lisensi

MIT License.
