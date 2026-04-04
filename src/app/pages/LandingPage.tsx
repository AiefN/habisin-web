import { Link } from "react-router";
import { Calculator, Wallet, Recycle, ArrowRight, Star, Leaf, TrendingUp, Users, BookOpen } from "lucide-react";
import { RecipeCard } from "../components/RecipeCard";
import { recipes } from "../data/recipes";

const HERO_IMAGE = "https://images.unsplash.com/photo-1767535313981-6a1673c0242f?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=1920&q=80";

const features = [
  {
    icon: Calculator,
    title: "Smart Portion Calculator",
    desc: "Sistem otomatis menyesuaikan jumlah bahan berdasarkan jumlah porsi yang Anda tentukan. Tidak ada bahan yang terbuang sia-sia.",
    color: "#8B5E3C",
    bg: "#FDF0E0",
  },
  {
    icon: Wallet,
    title: "Cook by Budget",
    desc: "Temukan resep yang sesuai dengan budget yang Anda miliki. Masak enak tanpa harus mengeluarkan banyak biaya.",
    color: "#6B7C45",
    bg: "#EFF4E8",
  },
  {
    icon: Recycle,
    title: "Waste Transformation Recipes",
    desc: "Ubah sisa bahan dapur menjadi bumbu atau resep baru. Kurangi food waste, maksimalkan nilai setiap bahan masakan.",
    color: "#C4872A",
    bg: "#FDF5E6",
  },
];

const stats = [
  { icon: Recycle, value: "2.4 Ton", label: "Food Waste Dikurangi", color: "#6B7C45" },
  { icon: BookOpen, value: "1,200+", label: "Resep Tersedia", color: "#8B5E3C" },
  { icon: Users, value: "48.500+", label: "Pengguna Aktif", color: "#C4872A" },
];

export function LandingPage() {
  const previewRecipes = recipes.slice(0, 4);

  return (
    <div style={{ fontFamily: "'Inter', sans-serif" }}>
      {/* ─── HERO SECTION ─── */}
      <section
        className="relative w-full flex items-center"
        style={{
          minHeight: "92vh",
          backgroundImage: `url(${HERO_IMAGE})`,
          backgroundSize: "cover",
          backgroundPosition: "center",
        }}
      >
        {/* Overlay */}
        <div
          className="absolute inset-0"
          style={{ background: "linear-gradient(135deg, rgba(44,24,16,0.88) 0%, rgba(44,24,16,0.65) 50%, rgba(44,24,16,0.45) 100%)" }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 py-24 grid grid-cols-12 gap-8 items-center w-full">
          <div className="col-span-12 lg:col-span-7">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: "rgba(107, 124, 69, 0.25)", border: "1px solid rgba(107, 124, 69, 0.5)" }}
            >
              <Leaf className="w-4 h-4" style={{ color: "#8FBF52" }} />
              <span style={{ color: "#8FBF52", fontSize: "13px", fontWeight: 500 }}>Platform Resep Berkelanjutan</span>
            </div>

            {/* Heading */}
            <h1
              className="mb-6 text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(42px, 5vw, 72px)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Cook Smart,
              <br />
              <span style={{ color: "#D4A96A" }}>Waste Less</span>
            </h1>

            <p
              className="mb-8 max-w-lg"
              style={{ color: "#D4C5B0", fontSize: "18px", lineHeight: 1.7 }}
            >
              Temukan resep dari berbagai negara sambil mengurangi limbah makanan dan memasak sesuai budget Anda. Memasak cerdas, hidup berkelanjutan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/resep"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl text-white font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{ backgroundColor: "#8B5E3C", boxShadow: "0 4px 20px rgba(139, 94, 60, 0.4)" }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#7A5234";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 25px rgba(139, 94, 60, 0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#8B5E3C";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(139, 94, 60, 0.4)";
                }}
              >
                <BookOpen className="w-5 h-5" />
                Jelajahi Resep
              </Link>
              <Link
                to="/mood"
                className="flex items-center gap-2 px-7 py-3.5 rounded-xl font-semibold transition-all duration-300 hover:-translate-y-0.5"
                style={{
                  border: "2px solid rgba(212, 169, 106, 0.6)",
                  color: "#D4A96A",
                  backdropFilter: "blur(4px)",
                  backgroundColor: "rgba(212, 169, 106, 0.08)",
                }}
              >
                <Star className="w-5 h-5" />
                Cari Makanan Berdasarkan Mood
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8" style={{ borderTop: "1px solid rgba(212, 197, 176, 0.2)" }}>
              {[
                { value: "1,200+", label: "Resep Internasional" },
                { value: "50+", label: "Negara Tercakup" },
                { value: "48K+", label: "Pengguna Aktif" },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{ color: "#D4A96A", fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                  <p style={{ color: "#A08060", fontSize: "13px" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Right card */}
          <div className="col-span-12 lg:col-span-5 hidden lg:flex justify-end">
            <div
              className="rounded-2xl p-5 w-72"
              style={{ backgroundColor: "rgba(253, 246, 236, 0.08)", border: "1px solid rgba(212, 169, 106, 0.2)", backdropFilter: "blur(12px)" }}
            >
              <div className="flex items-center gap-2 mb-4">
                <div className="w-2 h-2 rounded-full" style={{ backgroundColor: "#6B7C45" }} />
                <span style={{ color: "#D4A96A", fontSize: "12px", fontWeight: 600 }}>AI Cooking Assistant Online</span>
              </div>
              <div className="space-y-3">
                <div className="rounded-xl p-3" style={{ backgroundColor: "rgba(139, 94, 60, 0.3)" }}>
                  <p style={{ color: "#F5ECD7", fontSize: "13px" }}>👤 Saya punya sisa wortel, bawang, dan nasi. Bisa jadi apa?</p>
                </div>
                <div className="rounded-xl p-3" style={{ backgroundColor: "rgba(107, 124, 69, 0.3)" }}>
                  <p style={{ color: "#F5ECD7", fontSize: "13px" }}>🤖 Saya bisa bantu! Anda bisa membuat nasi goreng sayuran, sup wortel sederhana, atau tumis wortel bawang. Mau resep lengkapnya?</p>
                </div>
              </div>
              <Link to="/ai-assistant" className="block mt-4 text-center py-2 rounded-lg text-sm font-medium" style={{ backgroundColor: "#8B5E3C", color: "white" }}>
                Coba AI Assistant →
              </Link>
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1" style={{ borderColor: "rgba(212, 169, 106, 0.4)" }}>
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: "#D4A96A" }} />
          </div>
        </div>
      </section>

      {/* ─── FITUR UTAMA ─── */}
      <section className="py-20" style={{ backgroundColor: "#FDF6EC" }}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full" style={{ backgroundColor: "#F5ECD7" }}>
              <TrendingUp className="w-4 h-4" style={{ color: "#8B5E3C" }} />
              <span style={{ color: "#8B5E3C", fontSize: "13px", fontWeight: 600 }}>Fitur Unggulan Platform</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700 }}>
              Kenapa Cook Smart, Waste Less?
            </h2>
            <p style={{ color: "#8B7355", fontSize: "17px", marginTop: "12px", maxWidth: "500px", margin: "12px auto 0" }}>
              Tiga fitur utama yang membantu Anda memasak lebih cerdas dan ramah lingkungan.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="col-span-12 md:col-span-4 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "#FFFBF5",
                  border: "1px solid rgba(212, 169, 106, 0.15)",
                  boxShadow: "0 2px 16px rgba(44, 24, 16, 0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(44, 24, 16, 0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(44, 24, 16, 0.06)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: feat.bg }}
                >
                  <feat.icon className="w-7 h-7" style={{ color: feat.color }} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "20px", fontWeight: 600, marginBottom: "10px" }}>
                  {feat.title}
                </h3>
                <p style={{ color: "#8B7355", fontSize: "14px", lineHeight: 1.7 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PREVIEW RESEP ─── */}
      <section className="py-20" style={{ backgroundColor: "#F5ECD7" }}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full" style={{ backgroundColor: "#FDF6EC" }}>
                <Star className="w-4 h-4" style={{ color: "#C4872A" }} />
                <span style={{ color: "#C4872A", fontSize: "13px", fontWeight: 600 }}>Resep Pilihan</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "clamp(26px, 3vw, 38px)", fontWeight: 700 }}>
                Jelajahi Resep Populer
              </h2>
              <p style={{ color: "#8B7355", fontSize: "15px", marginTop: "8px" }}>Dari berbagai penjuru dunia, dengan bahan yang mudah ditemukan.</p>
            </div>
            <Link
              to="/resep"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ backgroundColor: "#8B5E3C", color: "white" }}
            >
              Lihat Semua Resep <ArrowRight className="w-4 h-4" />
            </Link>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {previewRecipes.map((recipe) => (
              <div key={recipe.id} className="col-span-12 sm:col-span-6 lg:col-span-3">
                <RecipeCard recipe={recipe} />
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── DAMPAK SUSTAINABILITY ─── */}
      <section className="py-20" style={{ backgroundColor: "#2C1810" }}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-5">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: "rgba(107, 124, 69, 0.25)", border: "1px solid rgba(107, 124, 69, 0.4)" }}>
                <Leaf className="w-4 h-4" style={{ color: "#8FBF52" }} />
                <span style={{ color: "#8FBF52", fontSize: "13px", fontWeight: 600 }}>Dampak Nyata</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#F5ECD7", fontSize: "clamp(26px, 3vw, 40px)", fontWeight: 700, lineHeight: 1.3, marginBottom: "16px" }}>
                Bersama Kita Kurangi<br />
                <span style={{ color: "#D4A96A" }}>Food Waste Indonesia</span>
              </h2>
              <p style={{ color: "#A08060", fontSize: "15px", lineHeight: 1.8 }}>
                Setiap resep yang Anda masak berdampak pada lingkungan. Bergabunglah dengan ribuan pengguna yang sudah memulai perjalanan memasak berkelanjutan.
              </p>
              <Link
                to="/resep"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ backgroundColor: "#6B7C45", color: "white" }}
              >
                Mulai Perjalanan Anda <ArrowRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="col-span-12 lg:col-span-7 grid grid-cols-3 gap-4">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-6 text-center transition-all hover:-translate-y-1"
                  style={{
                    backgroundColor: "rgba(255, 251, 245, 0.05)",
                    border: "1px solid rgba(212, 169, 106, 0.15)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: stat.color + "22" }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", color: "#F5ECD7", fontSize: "28px", fontWeight: 700 }}>
                    {stat.value}
                  </p>
                  <p style={{ color: "#A08060", fontSize: "13px", marginTop: "4px" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-16" style={{ backgroundColor: "#F5ECD7" }}>
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "clamp(24px, 3vw, 38px)", fontWeight: 700, marginBottom: "12px" }}>
            Siap Memasak Lebih Cerdas?
          </h2>
          <p style={{ color: "#8B7355", fontSize: "16px", maxWidth: "480px", margin: "0 auto 28px" }}>
            Bergabung gratis dan mulai eksplorasi ribuan resep dari seluruh dunia hari ini.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/resep" className="px-8 py-3.5 rounded-xl text-white font-semibold" style={{ backgroundColor: "#8B5E3C" }}>
              Mulai Sekarang — Gratis
            </Link>
            <Link to="/ai-assistant" className="px-8 py-3.5 rounded-xl font-semibold" style={{ backgroundColor: "#FFFBF5", color: "#8B5E3C", border: "1.5px solid rgba(139, 94, 60, 0.3)" }}>
              Coba AI Assistant
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
