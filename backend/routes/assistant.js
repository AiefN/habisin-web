const express = require("express");
const router = express.Router();
const path = require("path");

let TextServiceClient;
try {
  ({ TextServiceClient } = require("@google/generative-ai"));
} catch (error) {
  console.warn("@google/generative-ai library is not available.", error.message);
}

const hasGoogleAI = Boolean(TextServiceClient && (process.env.GOOGLE_API_KEY || process.env.GOOGLE_APPLICATION_CREDENTIALS));

async function generateGoogleReply(message) {
  try {
    const client = new TextServiceClient({ apiKey: process.env.GOOGLE_API_KEY });
    const response = await client.generateText({
      model: "text-bison@001",
      prompt: { text: `Bertindaklah sebagai asisten memasak profesional. Jawab permintaan pengguna secara singkat dan ramah:

${message}` },
      temperature: 0.7,
      maxOutputTokens: 250,
    });

    return response?.content?.[0]?.text || "Maaf, saya tidak dapat menjawab sekarang.";
  } catch (error) {
    console.error("Google AI error:", error);
    return null;
  }
}

function generateFallbackReply(message) {
  const lower = message.toLowerCase();

  if (lower.includes("pengganti") || lower.includes("ganti") || lower.includes("substitusi")) {
    return "Jika bahan utama tidak tersedia, coba gunakan bahan pengganti yang serupa seperti: telur untuk yogurt, santan untuk krim, atau alpukat untuk minyak. Saya juga bisa bantu cari pengganti spesifik jika Anda beri nama bahan tersebut.";
  }

  if (lower.includes("sisa") || lower.includes("leftover") || lower.includes("buang")) {
    return "Untuk memanfaatkan sisa bahan, buatlah menu sederhana seperti tumis sayur, omelet, sup, atau salad. Coba gabungkan sayuran yang ada dengan bumbu dasar seperti bawang putih, kecap, dan cabai agar tetap segar dan lezat.";
  }

  if (lower.includes("budget") || lower.includes("anggaran") || lower.includes("hemat")) {
    return "Pilih bahan yang terjangkau dan serbaguna, misalnya telur, tempe, tahu, dan sayuran lokal. Saya bisa bantu rekomendasikan resep hemat jika Anda mengirimkan daftar bahan yang tersedia.";
  }

  if (lower.includes("resep") || lower.includes("memasak") || lower.includes("cara")) {
    return "Coba jelaskan bahan utama yang Anda miliki atau jenis masakan yang ingin dibuat. Saya akan membantu menyarankan resep yang cocok dan langkah memasaknya.";
  }

  return "Saya siap membantu. Ketik bahan yang Anda punya, pertanyaan tentang pengganti bahan, atau cara memanfaatkan sisa makanan, dan saya akan memberi saran cepat.";
}

router.post("/", async (req, res) => {
  const { message } = req.body;

  if (!message || typeof message !== "string") {
    return res.status(400).json({ error: "Permintaan harus berisi properti 'message' dengan teks." });
  }

  let reply = null;
  if (hasGoogleAI) {
    reply = await generateGoogleReply(message);
  }

  if (!reply) {
    reply = generateFallbackReply(message);
  }

  return res.json({ reply });
});

module.exports = router;
