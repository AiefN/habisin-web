# Habisin Backend

Backend untuk aplikasi Habisin menggunakan Node.js, Express, dan Supabase.

## Persiapan

1. Install dependencies:
   ```bash
   npm install
   ```

2. Buat file `.env` di folder `backend` dengan isi:
   ```env
   SUPABASE_URL=https://your-supabase-url
   SUPABASE_KEY=your-supabase-key
   PORT=3004
   ```

3. Jalankan server development:
   ```bash
   npm run dev
   ```

Server akan berjalan di `http://localhost:3004` jika PORT tidak diubah.

## Menjalankan production

```bash
npm start
```

## API Endpoints

### GET /api/recipes
Mengambil semua data resep.

### POST /api/budget
Menghitung resep berdasarkan budget per porsi.

**Contoh request:**
```json
{
  "budget": 30000
}
```

## Integrasi frontend

Frontend React memanggil endpoint API ini untuk mengambil data resep dan hasil kalkulasi budget.