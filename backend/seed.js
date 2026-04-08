const path = require("path");
require("dotenv").config({ path: path.resolve(__dirname, "..", ".env") });
const { createClient } = require("@supabase/supabase-js");

const supabaseUrl = process.env.SUPABASE_URL;
const supabaseKey = process.env.SUPABASE_KEY;
const supabase = createClient(supabaseUrl, supabaseKey);

const recipesData = [
  {
    id: "1",
    name: "Spaghetti Carbonara",
    origin: "Italia",
    flag: "🇮🇹",
    image: "https://images.unsplash.com/photo-1655662844601-2c9ff36c5764?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    cookTime: "25 menit",
    cookTimeMinutes: 25,
    difficulty: "Sedang",
    pricePerServing: 35000,
    defaultServings: 2,
    description: "Pasta Italia klasik dengan saus telur yang creamy, keju Parmesan, dan pancetta. Hidangan ikonik Roma yang kaya rasa.",
    tags: ["Italia", "Pasta", "Klasik"],
    type: ["Non-Vegetarian"],
    moods: ["Gurih", "Comfort Food"],
    ingredients: [
      { name: "Spaghetti", amount: 200, unit: "gram" },
      { name: "Telur", amount: 3, unit: "butir" },
      { name: "Keju Parmesan", amount: 100, unit: "gram" },
      { name: "Pancetta / Bacon", amount: 150, unit: "gram" },
      { name: "Bawang putih", amount: 2, unit: "siung" },
      { name: "Lada hitam", amount: 1, unit: "sdt" },
      { name: "Garam", amount: 1, unit: "sdt" },
    ],
    steps: [
      "Rebus spaghetti dalam air garam mendidih hingga al dente sekitar 8–10 menit.",
      "Goreng pancetta di wajan tanpa minyak hingga renyah dan kecokelatan.",
      "Kocok telur bersama keju Parmesan parut dan lada hitam dalam mangkuk.",
      "Tiriskan spaghetti dan simpan 1 cangkir air rebusan pasta.",
      "Matikan api, campurkan spaghetti dengan pancetta, lalu tuangkan campuran telur.",
      "Aduk cepat sambil tambahkan air pasta sedikit demi sedikit hingga saus creamy.",
      "Sajikan segera dengan taburan keju Parmesan dan lada hitam tambahan.",
    ],
    wasteItems: [
      { name: "Kulit bawang putih", tip: "Panggang dan blender menjadi bumbu bubuk bawang.", slug: "kulit-bawang-putih" },
      { name: "Kulit telur", tip: "Keringkan dan haluskan sebagai pupuk tanaman.", slug: "kulit-telur" },
    ],
  },
  {
    id: "2",
    name: "Ramen Shoyu",
    origin: "Jepang",
    flag: "🇯🇵",
    image: "https://images.unsplash.com/photo-1627900440398-5db32dba8db1?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    cookTime: "45 menit",
    cookTimeMinutes: 45,
    difficulty: "Sedang",
    pricePerServing: 40000,
    defaultServings: 2,
    description: "Ramen Jepang dengan kuah kaldu kecap asin yang kaya, topping chashu, telur rebus, dan nori. Hangat dan memanjakan.",
    tags: ["Jepang", "Mie", "Sup"],
    type: ["Non-Vegetarian"],
    moods: ["Gurih", "Comfort Food", "Hangat"],
    ingredients: [
      { name: "Mie ramen", amount: 200, unit: "gram" },
      { name: "Kaldu ayam / dashi", amount: 800, unit: "ml" },
      { name: "Kecap asin shoyu", amount: 3, unit: "sdm" },
      { name: "Daging babi chashu / ayam", amount: 150, unit: "gram" },
      { name: "Telur", amount: 2, unit: "butir" },
      { name: "Nori (rumput laut)", amount: 2, unit: "lembar" },
      { name: "Daun bawang", amount: 2, unit: "batang" },
      { name: "Jagung manis", amount: 1, unit: "buah" },
    ],
    steps: [
      "Masak kaldu ayam bersama kecap shoyu, garam, dan mirin selama 15 menit.",
      "Rebus telur selama 6–7 menit untuk telur setengah matang, lalu rendam dalam saus.",
      "Rebus chashu (daging) dalam campuran kecap, mirin, dan gula hingga matang.",
      "Rebus mie ramen sesuai petunjuk kemasan, tiriskan.",
      "Siapkan mangkuk, tuangkan kuah kaldu panas.",
      "Tata mie, irisan chashu, telur belah dua, jagung, daun bawang, dan nori.",
      "Sajikan segera selagi panas.",
    ],
    wasteItems: [
      { name: "Bonggol jagung", tip: "Rebus untuk membuat kaldu sayuran alami.", slug: "bonggol-jagung" },
      { name: "Batang daun bawang", tip: "Iris tipis dan keringkan untuk bumbu tabur.", slug: "batang-daun-bawang" },
    ],
  },
  {
    id: "3",
    name: "Bibimbap",
    origin: "Korea",
    flag: "🇰🇷",
    image: "https://images.unsplash.com/photo-1715050222972-ac410ae190bc?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    cookTime: "35 menit",
    cookTimeMinutes: 35,
    difficulty: "Mudah",
    pricePerServing: 28000,
    defaultServings: 2,
    description: "Nasi Korea dengan aneka sayuran berwarna, daging sapi, telur, dan saus gochujang pedas. Sehat, lezat, dan penuh nutrisi.",
    tags: ["Korea", "Nasi", "Sehat"],
    type: ["Dapat Dibuat Vegetarian"],
    moods: ["Sehat", "Pedas", "Gurih"],
    ingredients: [
      { name: "Nasi putih", amount: 300, unit: "gram" },
      { name: "Daging sapi cincang", amount: 100, unit: "gram" },
      { name: "Bayam", amount: 100, unit: "gram" },
      { name: "Wortel", amount: 1, unit: "buah" },
      { name: "Tauge", amount: 100, unit: "gram" },
      { name: "Jamur shiitake", amount: 5, unit: "buah" },
      { name: "Telur", amount: 2, unit: "butir" },
      { name: "Saus gochujang", amount: 2, unit: "sdm" },
      { name: "Minyak wijen", amount: 1, unit: "sdm" },
    ],
    steps: [
      "Tumis daging sapi dengan bawang putih, kecap asin, dan minyak wijen.",
      "Rebus bayam sebentar, peras airnya, dan bumbui dengan minyak wijen dan garam.",
      "Tumis wortel dan jamur shiitake terpisah dengan sedikit kecap asin.",
      "Goreng telur mata sapi di atas api kecil.",
      "Siapkan mangkuk, letakkan nasi panas di tengah.",
      "Tata semua topping mengelilingi nasi secara berwarna-warni.",
      "Letakkan telur di atas, tambahkan saus gochujang, aduk sebelum dimakan.",
    ],
    wasteItems: [
      { name: "Kulit wortel", tip: "Tumis dengan bumbu sebagai keripik sehat.", slug: "kulit-wortel" },
      { name: "Batang bayam", tip: "Blansir dan jadikan acar segar.", slug: "batang-bayam" },
    ],
  },
  {
    id: "4",
    name: "Pad Thai",
    origin: "Thailand",
    flag: "🇹🇭",
    image: "https://images.unsplash.com/photo-1757845301558-e8e7dd41bc64?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    cookTime: "20 menit",
    cookTimeMinutes: 20,
    difficulty: "Mudah",
    pricePerServing: 25000,
    defaultServings: 2,
    description: "Mie goreng Thailand yang ikonik dengan tauge, kacang tanah, udang, dan saus tamarind manis-gurih. Cepat dan memuaskan.",
    tags: ["Thailand", "Mie", "Cepat"],
    type: ["Non-Vegetarian", "Cepat Dimasak"],
    moods: ["Gurih", "Pedas", "Manis"],
    ingredients: [
      { name: "Mie beras / rice noodles", amount: 200, unit: "gram" },
      { name: "Udang", amount: 150, unit: "gram" },
      { name: "Telur", amount: 2, unit: "butir" },
      { name: "Tauge", amount: 100, unit: "gram" },
      { name: "Daun bawang", amount: 3, unit: "batang" },
      { name: "Kacang tanah sangrai", amount: 50, unit: "gram" },
      { name: "Saus tamarind", amount: 3, unit: "sdm" },
      { name: "Kecap ikan", amount: 2, unit: "sdm" },
      { name: "Gula merah", amount: 1, unit: "sdm" },
    ],
    steps: [
      "Rendam mie beras dalam air dingin selama 30 menit, tiriskan.",
      "Panaskan wajan dengan api besar, tumis udang hingga merah dan matang.",
      "Dorong udang ke pinggir, kocok telur di tengah wajan dan aduk orak-arik.",
      "Masukkan mie, tambahkan saus tamarind, kecap ikan, dan gula merah.",
      "Tumis dengan api besar sambil terus diaduk selama 3–4 menit.",
      "Tambahkan tauge dan daun bawang, aduk sebentar.",
      "Sajikan dengan taburan kacang tanah dan irisan jeruk nipis.",
    ],
    wasteItems: [
      { name: "Kulit udang", tip: "Goreng kering atau rebus untuk kaldu umami.", slug: "kulit-udang" },
      { name: "Akar daun bawang", tip: "Tanam kembali di gelas air untuk tumbuh ulang.", slug: "akar-daun-bawang" },
    ],
  },
  {
    id: "5",
    name: "Rendang Daging Sapi",
    origin: "Indonesia",
    flag: "🇮🇩",
    image: "https://images.unsplash.com/photo-1748724526421-c6f882583683?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=800",
    cookTime: "180 menit",
    cookTimeMinutes: 180,
    difficulty: "Sulit",
    pricePerServing: 45000,
    defaultServings: 4,
    description: "Rendang daging sapi khas Minangkabau dengan santan kental, rempah-rempah, dan bumbu yang meresap. Hidangan istimewa yang tahan lama.",
    tags: ["Indonesia", "Daging", "Khas"],
    type: ["Non-Vegetarian"],
    moods: ["Gurih", "Pedas", "Kaya Rempah"],
    ingredients: [
      { name: "Daging sapi", amount: 500, unit: "gram" },
      { name: "Santan kelapa", amount: 400, unit: "ml" },
      { name: "Cabai merah", amount: 10, unit: "buah" },
      { name: "Bawang merah", amount: 8, unit: "siung" },
      { name: "Bawang putih", amount: 4, unit: "siung" },
      { name: "Jahe", amount: 2, unit: "cm" },
      { name: "Lengkuas", amount: 2, unit: "cm" },
      { name: "Serai", amount: 2, unit: "batang" },
      { name: "Daun jeruk", amount: 4, unit: "lembar" },
      { name: "Daun kunyit", amount: 2, unit: "lembar" },
      { name: "Ketumbar", amount: 1, unit: "sdt" },
      { name: "Jinten", amount: 0.5, unit: "sdt" },
      { name: "Garam", amount: 1, unit: "sdt" },
    ],
    steps: [
      "Haluskan cabai, bawang merah, bawang putih, jahe, lengkuas, ketumbar, dan jinten.",
      "Tumis bumbu halus dengan serai, daun jeruk, dan daun kunyit hingga harum.",
      "Masukkan daging sapi, aduk hingga berubah warna.",
      "Tuangkan santan, masak dengan api kecil sambil diaduk sesekali.",
      "Tambahkan garam, masak selama 2–3 jam hingga santan mengering dan bumbu meresap.",
      "Rendang siap disajikan dengan nasi hangat.",
    ],
    wasteItems: [
      { name: "Batang serai", tip: "Rebus untuk kaldu atau tumis sebagai bumbu.", slug: "batang-serai" },
      { name: "Kulit jahe", tip: "Keringkan dan seduh sebagai teh.", slug: "kulit-jahe" },
    ],
  },
];

async function seedDatabase() {
  try {
    // Clear existing data
    const { error: deleteError } = await supabase.from('recipes').delete().gt('id', 0);
    if (deleteError) console.warn("Note: Could not clear recipes (table may be empty)");
    else console.log("Cleared existing recipes");

    // Insert new data
    const { error: insertError } = await supabase.from('recipes').insert(recipesData);
    if (insertError) throw insertError;
    console.log("Recipes seeded successfully");

    process.exit(0);
  } catch (error) {
    console.error("Error seeding database:", error);
    process.exit(1);
  }
}

seedDatabase();