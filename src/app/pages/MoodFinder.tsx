import { useState } from "react";
import { Shuffle, ArrowRight } from "lucide-react";
import { Link } from "react-router";
import { recipes } from "../data/recipes";
import { RecipeCard } from "../components/RecipeCard";

const moods = [
  { id: "Pedas", emoji: "🌶️", label: "Pedas", desc: "Ingin rasa yang menggelora & membakar", color: "#C4472A", bg: "#FDF0EE", border: "#E8A29A" },
  { id: "Manis", emoji: "🍯", label: "Manis", desc: "Butuh kenyamanan rasa yang lembut", color: "#C4872A", bg: "#FDF5E8", border: "#DFB87A" },
  { id: "Gurih", emoji: "🧀", label: "Gurih", desc: "Cita rasa umami yang memanjakan", color: "#8B5E3C", bg: "#FDF0E3", border: "#C4985A" },
  { id: "Sehat", emoji: "🥗", label: "Sehat", desc: "Pilihan bergizi dan menyehatkan tubuh", color: "#6B7C45", bg: "#EFF4E8", border: "#9AB86A" },
  { id: "Comfort Food", emoji: "🍲", label: "Comfort Food", desc: "Masakan yang bikin hati tenang", color: "#7A5234", bg: "#FDF0E6", border: "#C4985A" },
];

const randomMessages = [
  "✨ Mungkin ini yang kamu butuhkan hari ini!",
  "🎲 Takdir mempertemukanmu dengan resep ini!",
  "🌟 Sistem merekomendasikan ini khusus untukmu!",
  "🍽️ Malam ini, cobalah sesuatu yang baru!",
];

export function MoodFinder() {
  const [selectedMood, setSelectedMood] = useState<string | null>(null);
  const [recommendations, setRecommendations] = useState<typeof recipes>([]);
  const [isAnimating, setIsAnimating] = useState(false);
  const [randomMsg, setRandomMsg] = useState("");

  const getRecsByMood = (mood: string) => {
    return recipes.filter((r) => r.moods.includes(mood));
  };

  const selectMood = (mood: string) => {
    setSelectedMood(mood);
    setRecommendations(getRecsByMood(mood));
    setRandomMsg("");
  };

  const handleRandom = () => {
    setIsAnimating(true);
    setRecommendations([]);
    setSelectedMood(null);

    setTimeout(() => {
      const shuffled = [...recipes].sort(() => Math.random() - 0.5);
      const picked = shuffled.slice(0, 4);
      setRecommendations(picked);
      setRandomMsg(randomMessages[Math.floor(Math.random() * randomMessages.length)]);
      setIsAnimating(false);
    }, 600);
  };

  return (
    <div style={{ backgroundColor: "#FDF6EC", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div
        style={{ background: "linear-gradient(135deg, #2C1810 0%, #4A3420 60%, #5C4428 100%)" }}
        className="py-16 px-8 text-center relative overflow-hidden"
      >
        <div className="absolute inset-0 opacity-5" style={{ backgroundImage: "url('data:image/svg+xml,...')" }} />
        <div className="relative z-10 max-w-[800px] mx-auto">
          <div
            className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full"
            style={{ backgroundColor: "rgba(212, 169, 106, 0.2)", border: "1px solid rgba(212, 169, 106, 0.35)" }}
          >
            <span style={{ fontSize: "14px" }}>✨</span>
            <span style={{ color: "#D4A96A", fontSize: "13px", fontWeight: 600 }}>Mood Finder</span>
          </div>
          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#F5ECD7",
              fontSize: "clamp(30px, 5vw, 56px)",
              fontWeight: 700,
              marginBottom: "16px",
              lineHeight: 1.2,
            }}
          >
            Hari Ini Kamu<br />
            <span style={{ color: "#D4A96A" }}>Ingin Makan Apa?</span>
          </h1>
          <p style={{ color: "#A08060", fontSize: "16px", lineHeight: 1.7 }}>
            Pilih mood-mu dan kami akan rekomendasikan resep yang paling cocok, atau biarkan takdir yang memilih!
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-14">
        {/* ─── MOOD CARDS ─── */}
        <div className="mb-10">
          <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "24px", fontWeight: 600, textAlign: "center", marginBottom: "8px" }}>
            Pilih Mood Makanmu
          </h2>
          <p style={{ color: "#8B7355", textAlign: "center", fontSize: "14px", marginBottom: "30px" }}>
            Klik salah satu mood di bawah ini
          </p>

          <div className="grid grid-cols-12 gap-4">
            {moods.map((mood) => {
              const isSelected = selectedMood === mood.id;
              return (
                <button
                  key={mood.id}
                  onClick={() => selectMood(mood.id)}
                  className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 p-6 rounded-2xl text-left transition-all duration-300"
                  style={{
                    backgroundColor: isSelected ? mood.color : mood.bg,
                    border: `2px solid ${isSelected ? mood.color : mood.border}`,
                    boxShadow: isSelected ? `0 8px 25px ${mood.color}40` : "0 2px 10px rgba(44, 24, 16, 0.06)",
                    transform: isSelected ? "scale(1.03) translateY(-2px)" : "scale(1)",
                  }}
                >
                  <p style={{ fontSize: "40px", marginBottom: "10px" }}>{mood.emoji}</p>
                  <p
                    style={{
                      fontFamily: "'Playfair Display', serif",
                      color: isSelected ? "white" : mood.color,
                      fontSize: "18px",
                      fontWeight: 600,
                      marginBottom: "6px",
                    }}
                  >
                    {mood.label}
                  </p>
                  <p style={{ color: isSelected ? "rgba(255,255,255,0.8)" : "#8B7355", fontSize: "12px", lineHeight: 1.5 }}>
                    {mood.desc}
                  </p>
                </button>
              );
            })}

            {/* Random Card */}
            <button
              onClick={handleRandom}
              className="col-span-12 sm:col-span-6 lg:col-span-4 xl:col-span-2 p-6 rounded-2xl text-left transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #2C1810, #4A3420)",
                border: "2px solid #D4A96A",
                boxShadow: "0 2px 10px rgba(44, 24, 16, 0.08)",
              }}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1.03) translateY(-2px)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 25px rgba(212, 169, 106, 0.3)";
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.transform = "scale(1)";
                (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 10px rgba(44, 24, 16, 0.08)";
              }}
            >
              <p style={{ fontSize: "40px", marginBottom: "10px" }}>🎲</p>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#D4A96A", fontSize: "18px", fontWeight: 600, marginBottom: "6px" }}>
                Acak!
              </p>
              <p style={{ color: "#A08060", fontSize: "12px", lineHeight: 1.5 }}>
                Biarkan sistem yang memilihkan untukmu
              </p>
            </button>
          </div>
        </div>

        {/* ─── RANDOM BUTTON (Large) ─── */}
        <div className="flex justify-center mb-14">
          <button
            onClick={handleRandom}
            className="flex items-center gap-3 px-10 py-5 rounded-2xl text-white font-semibold text-lg transition-all duration-300"
            style={{
              background: "linear-gradient(135deg, #8B5E3C, #C4872A)",
              boxShadow: "0 4px 20px rgba(139, 94, 60, 0.4)",
            }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-2px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(139, 94, 60, 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(139, 94, 60, 0.4)";
            }}
          >
            <Shuffle className={`w-6 h-6 ${isAnimating ? "animate-spin" : ""}`} />
            Acak Rekomendasi Makanan
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        {/* ─── RECOMMENDATIONS ─── */}
        {isAnimating && (
          <div className="text-center py-16">
            <div className="inline-flex flex-col items-center gap-4">
              <div
                className="w-16 h-16 rounded-full border-4 animate-spin"
                style={{ borderColor: "#F5ECD7", borderTopColor: "#8B5E3C" }}
              />
              <p style={{ color: "#8B7355", fontSize: "16px" }}>Mencari rekomendasi terbaik...</p>
            </div>
          </div>
        )}

        {!isAnimating && recommendations.length > 0 && (
          <div>
            {/* Result Header */}
            <div
              className="rounded-2xl p-5 mb-8 flex items-center gap-4"
              style={{ background: "linear-gradient(135deg, #2C1810, #3D2B1F)", border: "1px solid rgba(212, 169, 106, 0.2)" }}
            >
              <span style={{ fontSize: "28px" }}>
                {selectedMood ? moods.find((m) => m.id === selectedMood)?.emoji : "🎲"}
              </span>
              <div>
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#F5ECD7", fontSize: "20px", fontWeight: 600 }}>
                  {selectedMood
                    ? `Rekomendasi untuk Mood "${selectedMood}"`
                    : "Rekomendasi Acak Untuk Kamu"}
                </h2>
                <p style={{ color: "#A08060", fontSize: "13px" }}>
                  {randomMsg || `${recommendations.length} resep yang cocok dengan selera Anda`}
                </p>
              </div>
            </div>

            <div className="grid grid-cols-12 gap-5">
              {recommendations.map((r) => (
                <div key={r.id} className="col-span-12 md:col-span-6 lg:col-span-3">
                  <RecipeCard recipe={r} />
                </div>
              ))}
            </div>

            {/* Empty mood message */}
            {recommendations.length === 0 && selectedMood && (
              <div className="text-center py-12">
                <p style={{ fontSize: "48px", marginBottom: "12px" }}>🍽️</p>
                <p style={{ color: "#8B7355", fontSize: "16px" }}>
                  Belum ada resep untuk mood ini. Coba mood lainnya!
                </p>
              </div>
            )}

            <div className="text-center mt-10">
              <Link
                to="/resep"
                className="inline-flex items-center gap-2 px-6 py-3 rounded-xl font-medium"
                style={{ backgroundColor: "#FFFBF5", color: "#8B5E3C", border: "1.5px solid rgba(139, 94, 60, 0.25)" }}
              >
                Lihat Semua Resep <ArrowRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
