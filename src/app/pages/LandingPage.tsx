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
    color: "#EE3F24",
    bg: "#FDF0E0",
  },
  {
    icon: Wallet,
    title: "Cook by Budget",
    desc: "Temukan resep yang sesuai dengan budget yang Anda miliki. Masak enak tanpa harus mengeluarkan banyak biaya.",
    color: "#023820",
    bg: "#E8F5E9",
  },
  {
    icon: Recycle,
    title: "Waste Transformation Recipes",
    desc: "Ubah sisa bahan dapur menjadi bumbu atau resep baru. Kurangi food waste, maksimalkan nilai setiap bahan masakan.",
    color: "#F9A11B",
    bg: "#FFF8E1",
  },
];

const stats = [
  { icon: Recycle, value: "2.4 Ton", label: "Food Waste Dikurangi", color: "#023820" },
  { icon: BookOpen, value: "1,200+", label: "Resep Tersedia", color: "#EE3F24" },
  { icon: Users, value: "48.500+", label: "Pengguna Aktif", color: "#F9A11B" },
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
          style={{ background: "linear-gradient(135deg, rgba(2,56,32,0.75) 0%, rgba(2,56,32,0.55) 50%, rgba(2,56,32,0.35) 100%)" }}
        />

        <div className="relative z-10 max-w-[1440px] mx-auto px-8 py-24 grid grid-cols-12 gap-8 items-center w-full">
          <div className="col-span-12 lg:col-span-7">
            {/* Badge */}
            <div
              className="inline-flex items-center gap-2 px-4 py-2 rounded-full mb-6"
              style={{ backgroundColor: "rgba(238, 63, 36, 0.25)", border: "1px solid rgba(238, 63, 36, 0.5)" }}
            >
              <Leaf className="w-4 h-4" style={{ color: "#F9A11B" }} />
              <span style={{ color: "#F9A11B", fontSize: "13px", fontWeight: 500 }}>Platform Resep Berkelanjutan</span>
            </div>

            {/* Heading */}
            <h1
              className="mb-6 text-white"
              style={{
                fontFamily: "'Playfair Display', serif",
                fontSize: "clamp(48px, 5vw, 80px)",
                fontWeight: 700,
                lineHeight: 1.15,
              }}
            >
              Cook Smart,
              <br />
              <span style={{ color: "#FFEFCB" }}>Waste Less</span>
            </h1>

            <p
              className="mb-8 max-w-lg"
              style={{ color: "#E8F5E9", fontSize: "18px", lineHeight: 1.7 }}
            >
              Temukan resep dari berbagai negara sambil mengurangi limbah makanan dan memasak sesuai budget Anda. Memasak cerdas, hidup berkelanjutan.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-wrap gap-4">
              <Link
                to="/resep"
                className="flex items-center gap-2 px-8 py-4 rounded-xl text-white transition-all duration-300 hover:-translate-y-1"
                style={{ backgroundColor: "#EE3F24", boxShadow: "0 4px 20px rgba(238, 63, 36, 0.4)", fontSize: "16px", fontWeight: 700 }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#D63418";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(238, 63, 36, 0.6)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#EE3F24";
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(238, 63, 36, 0.4)";
                }}
              >
                <BookOpen className="w-5 h-5" />
                Masak Sekarang
              </Link>
              <Link
                to="/mood"
                className="flex items-center gap-2 px-8 py-4 rounded-xl transition-all duration-300 hover:-translate-y-1"
                style={{
                  border: "2px solid #EE3F24",
                  color: "#EE3F24",
                  backgroundColor: "transparent",
                  fontSize: "16px",
                  fontWeight: 700,
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "#EE3F2410";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = "transparent";
                }}
              >
                <Star className="w-5 h-5" />
                Cari Berdasarkan Mood
              </Link>
            </div>

            {/* Mini stats */}
            <div className="flex flex-wrap gap-6 mt-10 pt-8" style={{ borderTop: "1px solid rgba(232, 245, 233, 0.2)" }}>
              {[
                { value: "1,200+", label: "Resep Internasional" },
                { value: "50+", label: "Negara Tercakup" },
                { value: "48K+", label: "Pengguna Aktif" },
              ].map((s) => (
                <div key={s.label}>
                  <p style={{ color: "#FFEFCB", fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>{s.value}</p>
                  <p style={{ color: "#A8B5A0", fontSize: "13px" }}>{s.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Scroll indicator */}
        <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-2 animate-bounce">
          <div className="w-6 h-10 rounded-full border-2 flex items-start justify-center p-1" style={{ borderColor: "rgba(255, 239, 203, 0.4)" }}>
            <div className="w-1 h-2 rounded-full" style={{ backgroundColor: "#FFEFCB" }} />
          </div>
        </div>
      </section>

      {/* ─── QUICK PROMPTS SECTION ─── */}
      <section className="py-16 prompt-section" style={{ backgroundColor: "#FFEFCB" }}>
        <div className="max-w-[1440px] mx-auto px-8">
          <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "24px", fontWeight: 600, marginBottom: "8px" }}>
            Cari Resep Cepat
          </h3>
          <p style={{ color: "#666666", fontSize: "14px", marginBottom: "16px" }}>
            Atau klik salah satu tema di bawah ini
          </p>
          <div className="quick-prompts">
            <button onClick={() => window.location.href = '/resep'}>Menu hemat 20rb</button>
            <button onClick={() => window.location.href = '/resep'}>Masakan pedas</button>
            <button onClick={() => window.location.href = '/resep'}>Dari bahan sisa</button>
          </div>
        </div>
      </section>

      {/* ─── FITUR UTAMA ─── */}
      <section className="py-20" style={{ backgroundColor: "#F5F5F5" }}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="text-center mb-14">
            <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full" style={{ backgroundColor: "#E8F5E9" }}>
              <TrendingUp className="w-4 h-4" style={{ color: "#023820" }} />
              <span style={{ color: "#023820", fontSize: "13px", fontWeight: 600 }}>Fitur Unggulan Platform</span>
            </div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "clamp(32px, 3vw, 48px)", fontWeight: 700 }}>
              Kenapa Cook Smart, Waste Less?
            </h2>
            <p style={{ color: "#666666", fontSize: "17px", marginTop: "12px", maxWidth: "500px", margin: "12px auto 0" }}>
              Tiga fitur utama yang membantu Anda memasak lebih cerdas dan ramah lingkungan.
            </p>
          </div>

          <div className="grid grid-cols-12 gap-6">
            {features.map((feat, i) => (
              <div
                key={i}
                className="col-span-12 md:col-span-4 rounded-2xl p-7 transition-all duration-300 hover:-translate-y-1"
                style={{
                  backgroundColor: "#FFFFFF",
                  border: "1px solid #E0E0E0",
                  boxShadow: "0 2px 16px rgba(0, 0, 0, 0.06)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(0, 0, 0, 0.12)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 16px rgba(0, 0, 0, 0.06)";
                }}
              >
                <div
                  className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5"
                  style={{ backgroundColor: feat.bg }}
                >
                  <feat.icon className="w-7 h-7" style={{ color: feat.color }} />
                </div>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "20px", fontWeight: 600, marginBottom: "10px" }}>
                  {feat.title}
                </h3>
                <p style={{ color: "#666666", fontSize: "14px", lineHeight: 1.7 }}>{feat.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ─── PREVIEW RESEP ─── */}
      <section className="py-20" style={{ backgroundColor: "#FFEFCB" }}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="flex flex-col md:flex-row items-start md:items-end justify-between mb-12 gap-4">
            <div>
              <div className="inline-flex items-center gap-2 mb-3 px-4 py-1.5 rounded-full" style={{ backgroundColor: "#FFF8E1" }}>
                <Star className="w-4 h-4" style={{ color: "#F9A11B" }} />
                <span style={{ color: "#F9A11B", fontSize: "13px", fontWeight: 600 }}>Resep Pilihan</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700 }}>
                Jelajahi Resep Populer
              </h2>
              <p style={{ color: "#666666", fontSize: "15px", marginTop: "8px" }}>Dari berbagai penjuru dunia, dengan bahan yang mudah ditemukan.</p>
            </div>
            <Link
              to="/resep"
              className="flex items-center gap-2 px-5 py-2.5 rounded-xl text-sm font-semibold transition-all"
              style={{ backgroundColor: "#EE3F24", color: "white" }}
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
      <section className="py-20" style={{ backgroundColor: "#023820" }}>
        <div className="max-w-[1440px] mx-auto px-8">
          <div className="grid grid-cols-12 gap-8 items-center">
            <div className="col-span-12 lg:col-span-5">
              <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: "rgba(238, 63, 36, 0.25)", border: "1px solid rgba(238, 63, 36, 0.4)" }}>
                <Leaf className="w-4 h-4" style={{ color: "#FFEFCB" }} />
                <span style={{ color: "#FFEFCB", fontSize: "13px", fontWeight: 600 }}>Dampak Nyata</span>
              </div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#FFEFCB", fontSize: "clamp(28px, 3vw, 44px)", fontWeight: 700, lineHeight: 1.3, marginBottom: "16px" }}>
                Bersama Kita Kurangi<br />
                <span style={{ color: "#F9A11B" }}>Food Waste Indonesia</span>
              </h2>
              <p style={{ color: "#E8F5E9", fontSize: "15px", lineHeight: 1.8 }}>
                Setiap resep yang Anda masak berdampak pada lingkungan. Bergabunglah dengan ribuan pengguna yang sudah memulai perjalanan memasak berkelanjutan.
              </p>
              <Link
                to="/resep"
                className="inline-flex items-center gap-2 mt-6 px-6 py-3 rounded-xl font-semibold transition-all"
                style={{ backgroundColor: "#EE3F24", color: "white" }}
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
                    backgroundColor: "rgba(255, 239, 203, 0.08)",
                    border: "1px solid rgba(255, 239, 203, 0.2)",
                  }}
                >
                  <div
                    className="w-12 h-12 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ backgroundColor: stat.color + "22" }}
                  >
                    <stat.icon className="w-6 h-6" style={{ color: stat.color }} />
                  </div>
                  <p style={{ fontFamily: "'Playfair Display', serif", color: "#FFEFCB", fontSize: "28px", fontWeight: 700 }}>
                    {stat.value}
                  </p>
                  <p style={{ color: "#E8F5E9", fontSize: "13px", marginTop: "4px" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ─── CTA BANNER ─── */}
      <section className="py-16" style={{ backgroundColor: "#FFEFCB" }}>
        <div className="max-w-[1440px] mx-auto px-8 text-center">
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "clamp(28px, 3vw, 42px)", fontWeight: 700, marginBottom: "12px" }}>
            Siap Memasak Lebih Cerdas?
          </h2>
          <p style={{ color: "#666666", fontSize: "16px", maxWidth: "480px", margin: "0 auto 28px" }}>
            Bergabung gratis dan mulai eksplorasi ribuan resep dari seluruh dunia hari ini.
          </p>
          <div className="flex flex-wrap justify-center gap-4">
            <Link to="/resep" className="px-8 py-3.5 rounded-xl text-white font-semibold" style={{ backgroundColor: "#EE3F24" }}>
              Mulai Sekarang — Gratis
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
