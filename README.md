# Habisin

Aplikasi resep untuk memasak lebih hemat, mengurangi sampah makanan, dan menemukan resep yang cocok untuk suasana hati.

## Tentang

Habisin membantu pengguna menemukan resep internasional, merencanakan anggaran, dan mengolah sisa bahan menjadi hidangan baru.

### Fitur utama

- 🌍 Resep internasional
- 💰 Rekomendasi berdasarkan anggaran
- ♻️ Solusi untuk sisa bahan
- 🎯 Pencarian resep berdasarkan mood
- 📱 Desain responsif untuk perangkat mobile dan desktop

## Teknologi

**Frontend:**
- React + TypeScript
- Vite
- Tailwind CSS
- shadcn/ui

**Backend:**
- Node.js
- Express.js
- Supabase

## Persiapan

### Prasyarat
- Node.js 18+
- npm

### Instalasi

1. Clone repositori:
```bash
git clone https://github.com/yourusername/habisin.git
cd habisin
```

2. Install frontend dependencies:
```bash
npm install
```

3. Install backend dependencies:
```bash
cd backend
npm install
cd ..
```

### Konfigurasi backend

Buat file `.env` di folder `backend` dengan isi minimal:
```env
SUPABASE_URL=https://your-supabase-url
SUPABASE_KEY=your-supabase-key
PORT=3004
```

### Menjalankan aplikasi

Jalankan frontend:
```bash
npm run dev
```

Jalankan backend:
```bash
cd backend
npm run dev
```

Frontend tersedia di `http://localhost:5173`
Backend tersedia di `http://localhost:3004`

### Build produksi

```bash
npm run build
```

## Struktur proyek

```
habisin/
├── src/
│   ├── app/
│   │   ├── components/     # Komponen UI
│   │   ├── pages/         # Halaman aplikasi
│   │   ├── data/          # Data resep
│   │   └── styles/        # Styling global
│   └── main.tsx
├── backend/
│   ├── server.js          # Server Express
│   ├── routes/            # Rute API
│   ├── models/            # Model data
│   └── seed.js            # Seed data (jika diperlukan)
├── index.html
├── vite.config.ts
└── package.json
```

## Lisensi

MIT License.
