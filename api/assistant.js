export default async function handler(req, res) {
  if (req.method !== 'POST') {
    res.statusCode = 405;
    return res.end('Method Not Allowed');
  }

  let body = '';
  for await (const chunk of req) {
    body += chunk;
  }

  let data;
  try {
    data = JSON.parse(body);
  } catch (error) {
    res.statusCode = 400;
    return res.end('Invalid JSON');
  }

  const message = data?.message;
  if (!message || typeof message !== 'string') {
    res.statusCode = 400;
    return res.end('Bad request: missing message');
  }

  const lower = message.toLowerCase();
  let reply;

  if (lower.includes('pengganti') || lower.includes('ganti') || lower.includes('substitusi')) {
    reply = 'Jika bahan utama tidak tersedia, coba bahan pengganti serupa seperti telur untuk yogurt, santan untuk krim, atau alpukat untuk minyak. Beri tahu saya bahan spesifik dan saya bantu cari pengganti.';
  } else if (lower.includes('sisa') || lower.includes('leftover') || lower.includes('buang')) {
    reply = 'Untuk memanfaatkan sisa bahan, coba tumis sayur, omelet, sup, atau salad. Gunakan bumbu dasar seperti bawang putih, kecap, dan cabai agar tetap lezat.';
  } else if (lower.includes('budget') || lower.includes('anggaran') || lower.includes('hemat')) {
    reply = 'Pilih bahan terjangkau yang serbaguna seperti telur, tempe, tahu, dan sayuran lokal. Saya bisa bantu rekomendasi resep hemat jika Anda kirimkan bahan yang tersedia.';
  } else if (lower.includes('resep') || lower.includes('memasak') || lower.includes('cara')) {
    reply = 'Coba jelaskan bahan utama yang Anda punya atau jenis masakan yang ingin dibuat, dan saya akan sarankan resep terbaik.';
  } else {
    reply = 'Saya siap membantu. Ketik bahan yang Anda punya, pertanyaan tentang pengganti bahan, atau cara memasak, dan saya akan memberi saran cepat.';
  }

  res.setHeader('Content-Type', 'application/json');
  res.end(JSON.stringify({ reply }));
}
