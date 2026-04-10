import { useParams, Link } from "react-router-dom";
import { ArrowLeft, Leaf, Recycle, Clock, Check, ShoppingBag } from "lucide-react";
import { wasteRecipes } from "../data/recipes";
import { useState } from "react";

export function WasteRecipe() {
  const { slug } = useParams<{ slug: string }>();
  const recipe = slug ? wasteRecipes[slug] : null;
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);

  const toggleStep = (i: number) => {
    setCompletedSteps((prev) => prev.includes(i) ? prev.filter((s) => s !== i) : [...prev, i]);
  };

  if (!recipe) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center py-32" style={{ backgroundColor: "#F5F5F5", fontFamily: "'Inter', sans-serif" }}>
        <p style={{ fontSize: "60px", marginBottom: "16px" }}>🌿</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "28px", marginBottom: "16px" }}>
          Resep Tidak Ditemukan
        </h2>
        <Link to="/resep" className="px-5 py-2 rounded-xl text-sm" style={{ backgroundColor: "#EE3F24", color: "white" }}>
          Kembali ke Resep
        </Link>
      </div>
    );
  }

  const otherSlugs = Object.keys(wasteRecipes).filter((s) => s !== slug).slice(0, 3);

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Hero Banner */}
      <div
        className="relative py-16 px-8 overflow-hidden"
        style={{ background: "linear-gradient(135deg, #023820 0%, #0D6B47 60%, #0F7C52 100%)" }}
      >
        <div className="absolute inset-0 opacity-10" style={{ backgroundImage: "radial-gradient(circle at 70% 50%, #F9A11B 0%, transparent 60%)" }} />
        <div className="max-w-[1440px] mx-auto relative z-10">
          <Link
            to="/resep"
            className="inline-flex items-center gap-2 mb-8 text-sm transition-colors"
            style={{ color: "#E8F5E9" }}
          >
            <ArrowLeft className="w-4 h-4" />
            Kembali ke Resep
          </Link>

          <div className="flex items-center gap-3 mb-5">
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center"
              style={{ backgroundColor: "rgba(238, 63, 36, 0.3)", border: "1px solid rgba(238, 63, 36, 0.5)" }}
            >
              <Recycle className="w-6 h-6" style={{ color: "#F9A11B" }} />
            </div>
            <div>
              <span
                className="inline-block px-3 py-1 rounded-full text-xs font-semibold mb-1"
                style={{ backgroundColor: "rgba(238, 63, 36, 0.25)", color: "#FFEFCB", border: "1px solid rgba(238, 63, 36, 0.4)" }}
              >
                🌱 Resep dari Sisa Bahan
              </span>
            </div>
          </div>

          <h1
            style={{
              fontFamily: "'Playfair Display', serif",
              color: "#FFEFCB",
              fontSize: "clamp(32px, 4vw, 56px)",
              fontWeight: 700,
              lineHeight: 1.2,
              maxWidth: "700px",
              marginBottom: "16px",
            }}
          >
            {recipe.name}
          </h1>
          <p style={{ color: "#E8F5E9", fontSize: "16px", maxWidth: "580px", lineHeight: 1.7 }}>
            {recipe.description}
          </p>

          {/* Impact Badge */}
          <div
            className="inline-flex items-center gap-2 mt-6 px-5 py-3 rounded-full"
            style={{ backgroundColor: "rgba(255, 239, 203, 0.2)", border: "1px solid rgba(255, 239, 203, 0.35)" }}
          >
            <Leaf className="w-4 h-4" style={{ color: "#F9A11B" }} />
            <span style={{ color: "#FFEFCB", fontSize: "13px" }}>
              Dengan membuat ini, Anda membantu mengurangi food waste!
            </span>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-12">
        <div className="grid grid-cols-12 gap-10">
          {/* Main content */}
          <div className="col-span-12 lg:col-span-8">
            {/* Recipe Image */}
            <div className="rounded-2xl overflow-hidden mb-8" style={{ boxShadow: "0 8px 30px rgba(44, 24, 16, 0.12)" }}>
              <img
                src={recipe.image}
                alt={recipe.name}
                className="w-full object-cover"
                style={{ height: "380px" }}
              />
            </div>

            {/* Bahan Utama (Sisa) */}
            <div
              className="rounded-2xl p-6 mb-8"
              style={{ background: "linear-gradient(135deg, #EFF4E8, #FDF6EC)", border: "1.5px solid rgba(107, 124, 69, 0.3)" }}
            >
              <div className="flex items-center gap-2 mb-5">
                <ShoppingBag className="w-5 h-5" style={{ color: "#6B7C45" }} />
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "20px", fontWeight: 600 }}>
                  Bahan yang Dibutuhkan
                </h2>
              </div>
              <div className="space-y-3">
                {recipe.extraIngredients.map((ing, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 bg-white rounded-xl"
                    style={{ border: "1px solid rgba(107, 124, 69, 0.15)" }}
                  >
                    <div className="flex items-center gap-3">
                      <div
                        className="w-7 h-7 rounded-full flex items-center justify-center text-xs font-bold"
                        style={{ backgroundColor: "#EFF4E8", color: "#6B7C45" }}
                      >
                        {i + 1}
                      </div>
                      <span style={{ color: "#3D2B1F", fontSize: "14px" }}>{ing.name}</span>
                    </div>
                    <span
                      className="px-3 py-1 rounded-full text-xs font-semibold"
                      style={{ backgroundColor: "#EFF4E8", color: "#6B7C45" }}
                    >
                      {ing.amount}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Langkah Pembuatan */}
            <div>
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "22px", fontWeight: 600, marginBottom: "20px" }}>
                Langkah Pembuatan
              </h2>
              <div className="space-y-4">
                {recipe.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-2xl cursor-pointer transition-all duration-200"
                    style={{
                      backgroundColor: completedSteps.includes(i) ? "#EFF4E8" : "#FFFBF5",
                      border: `1px solid ${completedSteps.includes(i) ? "rgba(107, 124, 69, 0.3)" : "rgba(212, 169, 106, 0.15)"}`,
                      boxShadow: completedSteps.includes(i) ? "none" : "0 2px 8px rgba(44, 24, 16, 0.04)",
                    }}
                    onClick={() => toggleStep(i)}
                  >
                    <div
                      className="flex-shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-sm transition-all"
                      style={{
                        backgroundColor: completedSteps.includes(i) ? "#6B7C45" : "#F5ECD7",
                        color: completedSteps.includes(i) ? "white" : "#8B5E3C",
                      }}
                    >
                      {completedSteps.includes(i) ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
                    <div className="flex-1">
                      <p
                        style={{
                          color: completedSteps.includes(i) ? "#6B7C45" : "#5C4030",
                          fontSize: "14px",
                          lineHeight: 1.7,
                          textDecoration: completedSteps.includes(i) ? "line-through" : "none",
                        }}
                      >
                        {step}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
              <p style={{ color: "#A08060", fontSize: "12px", marginTop: "10px", textAlign: "center" }}>
                💡 Klik langkah untuk menandai sebagai selesai
              </p>
            </div>
          </div>

          {/* Sidebar */}
          <div className="col-span-12 lg:col-span-4">
            {/* Tips Card */}
            <div
              className="rounded-2xl p-6 mb-6"
              style={{ backgroundColor: "#FFFBF5", border: "1px solid rgba(212, 169, 106, 0.2)", boxShadow: "0 2px 16px rgba(44, 24, 16, 0.06)" }}
            >
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
                Tips & Catatan
              </h3>
              <div className="space-y-3">
                {[
                  { emoji: "🧺", tip: "Kumpulkan sisa bahan dalam wadah khusus di kulkas." },
                  { emoji: "🌡️", tip: "Simpan produk akhir dalam wadah kedap udara." },
                  { emoji: "♻️", tip: "Satu langkah kecil berdampak besar bagi lingkungan." },
                ].map((t, i) => (
                  <div key={i} className="flex gap-3 p-3 rounded-xl" style={{ backgroundColor: "#FDF6EC" }}>
                    <span style={{ fontSize: "20px" }}>{t.emoji}</span>
                    <p style={{ color: "#8B7355", fontSize: "13px", lineHeight: 1.6 }}>{t.tip}</p>
                  </div>
                ))}
              </div>
            </div>

            {/* Sustainability Impact */}
            <div
              className="rounded-2xl p-6 mb-6"
              style={{ background: "linear-gradient(135deg, #2C1810, #3D2B1F)", border: "1px solid rgba(212, 169, 106, 0.15)" }}
            >
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#F5ECD7", fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
                Dampak Lingkungan
              </h3>
              {[
                { label: "CO₂ Terhemat", value: "~120g", color: "#8FBF52" },
                { label: "Air Terhemat", value: "~1.5L", color: "#5BA3C7" },
                { label: "Sampah Dikurangi", value: "~50g", color: "#D4A96A" },
              ].map((d) => (
                <div key={d.label} className="flex items-center justify-between mb-3 last:mb-0">
                  <span style={{ color: "#A08060", fontSize: "13px" }}>{d.label}</span>
                  <span style={{ color: d.color, fontSize: "14px", fontWeight: 700 }}>{d.value}</span>
                </div>
              ))}
            </div>

            {/* Other Waste Recipes */}
            {otherSlugs.length > 0 && (
              <div
                className="rounded-2xl p-6"
                style={{ backgroundColor: "#FFFBF5", border: "1px solid rgba(212, 169, 106, 0.2)" }}
              >
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "18px", fontWeight: 600, marginBottom: "16px" }}>
                  Resep Sisa Bahan Lainnya
                </h3>
                <div className="space-y-3">
                  {otherSlugs.map((s) => {
                    const wr = wasteRecipes[s];
                    if (!wr) return null;
                    return (
                      <Link
                        key={s}
                        to={`/waste-recipe/${s}`}
                        className="flex items-center gap-3 p-3 rounded-xl transition-all hover:-translate-x-0.5"
                        style={{ backgroundColor: "#FDF6EC", border: "1px solid rgba(107, 124, 69, 0.15)" }}
                      >
                        <div className="w-8 h-8 rounded-lg flex items-center justify-center" style={{ backgroundColor: "#EFF4E8" }}>
                          <Leaf className="w-4 h-4" style={{ color: "#6B7C45" }} />
                        </div>
                        <p style={{ color: "#3D2B1F", fontSize: "13px", fontWeight: 500 }}>{wr.name}</p>
                      </Link>
                    );
                  })}
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
