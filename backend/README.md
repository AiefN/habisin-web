# Habisin Backend

Backend untuk aplikasi Habisin menggunakan Node.js dan Express.

## Setup

1. Install dependencies:
   ```bash
   npm install
   ```

2. Buat file `.env` dan tambahkan API key Gemini:
   ```
   GEMINI_API_KEY=your_actual_gemini_api_key_here
   PORT=3000
   ```

3. Jalankan server:
   ```bash
   npm run dev
   ```

Server akan berjalan di `http://localhost:3000`.

## API Endpoints

### POST /api/chat
Mengirim pesan ke AI Cooking Assistant.

**Request Body:**
```json
{
  "message": "Apa resep nasi goreng?"
}
```

**Response:**
```json
{
  "reply": "Resep nasi goreng..."
}
```

### GET /api/recipes
Mengambil semua data resep.

**Response:**
```json
[
  {
    "id": "1",
    "name": "Spaghetti Carbonara",
    "origin": "Italia",
    // ... full recipe data
  }
]
```

### POST /api/budget
Menghitung resep berdasarkan budget per porsi.

**Request Body:**
```json
{
  "budget": 30000
}
```

**Response:**
```json
{
  "budget": 30000,
  "recipes": [
    {
      "id": "3",
      "name": "Bibimbap",
      "pricePerServing": 28000,
      // ... full recipe data
    }
  ],
  "count": 1
}
```

## Frontend Integration

Frontend React akan memanggil endpoint ini untuk mendapatkan data resep dan hasil budget.