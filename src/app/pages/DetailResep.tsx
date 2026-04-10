import { useState } from "react";
import { useParams, Link, useNavigate } from "react-router-dom";
import { Clock, ChefHat, Wallet, Minus, Plus, Users, Leaf, ArrowLeft, Recycle, Check, BookmarkPlus, Share2 } from "lucide-react";
import { recipes } from "../data/recipes";
import { RecipeCard } from "../components/RecipeCard";
import { useAuth } from "../AuthContext";

export function DetailResep() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { user, toggleSaved } = useAuth();
  const recipe = recipes.find((r) => r.id === id);

  const [servings, setServings] = useState(recipe?.defaultServings ?? 2);
  const [completedSteps, setCompletedSteps] = useState<number[]>([]);
  const [shareMessage, setShareMessage] = useState<string | null>(null);
  const saved = user?.saved?.includes(recipe?.id || '') || false;

  const handleSavedClick = async () => {
    if (!user) {
      window.alert('Silakan login dulu untuk menyimpan resep.');
      return;
    }

    await toggleSaved(recipe.id);
  };

  const handleShare = async () => {
    const shareUrl = `${window.location.origin}/resep/${recipe.id}`;

    try {
      if (navigator.share) {
        await navigator.share({
          title: recipe.name,
          text: `Coba resep ${recipe.name} dari Habisin!`,
          url: shareUrl,
        });
        setShareMessage('Berhasil dibagikan!');
      } else if (navigator.clipboard) {
        await navigator.clipboard.writeText(shareUrl);
        setShareMessage('Link resep disalin ke clipboard.');
      } else {
        window.prompt('Salin link resep ini:', shareUrl);
      }
    } catch (error) {
      console.error('Share failed:', error);
      setShareMessage('Gagal membagikan. Coba lagi.');
    }

    setTimeout(() => setShareMessage(null), 3000);
  };

  if (!recipe) {
    return (
      <div className="flex flex-col items-center justify-center py-32" style={{ fontFamily: "'Inter', sans-serif" }}>
        <p style={{ fontSize: "60px", marginBottom: "16px" }}>🍽️</p>
        <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "28px", fontWeight: 700 }}>Resep Tidak Ditemukan</h2>
        <Link to="/resep" className="mt-6 px-5 py-2 rounded-xl" style={{ backgroundColor: "#EE3F24", color: "white" }}>
          Kembali ke Resep
        </Link>
      </div>
    );
  }

  const ratio = servings / recipe.defaultServings;
  const adjustedIngredients = recipe.ingredients.map((ing) => ({
    ...ing,
    amount: Math.round(ing.amount * ratio * 10) / 10,
  }));

  const relatedRecipes = recipes.filter((r) => r.id !== recipe.id && r.origin === recipe.origin).slice(0, 3);
  const moreRecipes = relatedRecipes.length < 3 ? [...relatedRecipes, ...recipes.filter((r) => r.id !== recipe.id && !relatedRecipes.includes(r)).slice(0, 3 - relatedRecipes.length)] : relatedRecipes;

  const toggleStep = (i: number) => {
    setCompletedSteps((prev) => prev.includes(i) ? prev.filter((s) => s !== i) : [...prev, i]);
  };

  const difficultyColor: Record<string, string> = {
    Mudah: "#6B7C45",
    Sedang: "#C4872A",
    Sulit: "#B84040",
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", fontFamily: "'Inter', sans-serif", minHeight: "100vh" }}>
      {/* Breadcrumb */}
      <div style={{ backgroundColor: "#FFFFFF", borderBottom: "1px solid #E0E0E0" }} className="px-4 sm:px-6 py-4">
        <div className="max-w-[1440px] mx-auto flex flex-wrap items-center gap-2">
          <button onClick={() => navigate(-1)} className="flex items-center gap-1.5 text-sm transition-colors" style={{ color: "#666666" }}>
            <ArrowLeft className="w-4 h-4" />
            Kembali
          </button>
          <span style={{ color: "#CCCCCC" }}>/</span>
          <Link to="/resep" style={{ color: "#666666" }} className="text-sm hover:text-[#EE3F24]">Resep</Link>
          <span style={{ color: "#CCCCCC" }}>/</span>
          <span style={{ color: "#023820", fontSize: "14px" }}>{recipe.name}</span>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-4 sm:px-6 py-8">
        {/* ─── TWO-COLUMN LAYOUT ─── */}
        <div className="grid grid-cols-12 gap-10 mb-14">
          {/* Left: Image */}
          <div className="col-span-12 lg:col-span-5">
            <div className="lg:sticky lg:top-24">
              <div className="rounded-3xl overflow-hidden" style={{ boxShadow: "0 8px 40px rgba(44, 24, 16, 0.18)" }}>
                <img
                  src={recipe.image}
                  alt={recipe.name}
                  className="w-full h-[260px] sm:h-[320px] md:h-[420px] object-cover"
                />
              </div>

              {/* Action buttons */}
              <div className="flex flex-col sm:flex-row gap-3 mt-5">
                <button
                  onClick={handleSavedClick}
                  className="flex-1 flex items-center justify-center gap-2 py-3 rounded-xl text-sm font-medium transition-all"
                  style={{
                    backgroundColor: saved ? "#EE3F24" : "#FFFFFF",
                    color: saved ? "white" : "#EE3F24",
                    border: `1.5px solid ${saved ? "#EE3F24" : "rgba(238, 63, 36, 0.3)"}`,
                  }}
                >
                  <BookmarkPlus className="w-4 h-4" />
                  {saved ? "Tersimpan" : "Simpan Resep"}
                </button>
                <button
                  onClick={handleShare}
                  className="flex items-center gap-2 px-5 py-3 rounded-xl text-sm font-medium"
                  style={{ backgroundColor: "#FFFBF5", color: "#8B7355", border: "1.5px solid rgba(139, 94, 60, 0.3)" }}
                >
                  <Share2 className="w-4 h-4" />
                  Bagikan
                </button>
              </div>
              {shareMessage && (
                <div className="mt-3 text-sm" style={{ color: "#666666" }}>
                  {shareMessage}
                </div>
              )}

              {/* Tags */}
              <div className="flex flex-wrap gap-2 mt-4">
                <span className="px-3 py-1 rounded-full text-xs font-medium" style={{ backgroundColor: "#FFF8E1", color: "#F9A11B" }}>
                  {recipe.flag} {recipe.origin}
                </span>
                {recipe.tags.map((tag) => (
                  <span key={tag} className="px-3 py-1 rounded-full text-xs" style={{ backgroundColor: "#E8F5E9", color: "#023820" }}>
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Right: Info */}
          <div className="col-span-12 lg:col-span-7">
            <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "clamp(28px, 4vw, 46px)", fontWeight: 700, lineHeight: 1.2, marginBottom: "14px" }}>
              {recipe.name}
            </h1>
            <p style={{ color: "#666666", fontSize: "16px", lineHeight: 1.75, marginBottom: "24px" }}>
              {recipe.description}
            </p>

            {/* Meta info */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-8">
              {[
                { icon: Clock, label: "Waktu Masak", value: recipe.cookTime, color: "#EE3F24" },
                { icon: ChefHat, label: "Kesulitan", value: recipe.difficulty, color: difficultyColor[recipe.difficulty] },
                { icon: Wallet, label: "Per Porsi", value: `Rp ${(recipe.pricePerServing).toLocaleString("id-ID")}`, color: "#023820" },
              ].map((meta) => (
                <div
                  key={meta.label}
                  className="rounded-xl p-4 text-center"
                  style={{ backgroundColor: "#FFFFFF", border: "1px solid #E0E0E0" }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: meta.color + "18" }}>
                    <meta.icon className="w-5 h-5" style={{ color: meta.color }} />
                  </div>
                  <p style={{ color: "#666666", fontSize: "11px", marginBottom: "2px" }}>{meta.label}</p>
                  <p style={{ color: "#023820", fontSize: "14px", fontWeight: 600 }}>{meta.value}</p>
                </div>
              ))}
            </div>

            {/* ─── PORTION SELECTOR ─── */}
            <div
              className="rounded-2xl p-5 mb-8"
              style={{ backgroundColor: "#FFFFFF", border: "1.5px solid #E0E0E0" }}
            >
              <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
                <div className="flex items-center gap-2">
                  <Users className="w-5 h-5" style={{ color: "#EE3F24" }} />
                  <span style={{ color: "#023820", fontSize: "15px", fontWeight: 600 }}>Jumlah Porsi</span>
                </div>
                <div className="flex items-center gap-4">
                  <button
                    onClick={() => setServings((s) => Math.max(1, s - 1))}
                    className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                    style={{ backgroundColor: servings <= 1 ? "#E0E0E0" : "#EE3F24", color: servings <= 1 ? "#999" : "white" }}
                    disabled={servings <= 1}
                  >
                    <Minus className="w-4 h-4" />
                  </button>
                  <span style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "24px", fontWeight: 700, minWidth: "36px", textAlign: "center" }}>
                    {servings}
                  </span>
                  <button
                    onClick={() => setServings((s) => Math.min(20, s + 1))}
                    className="w-9 h-9 rounded-full flex items-center justify-center"
                    style={{ backgroundColor: "#EE3F24", color: "white" }}
                  >
                    <Plus className="w-4 h-4" />
                  </button>
                </div>
                <span style={{ color: "#666666", fontSize: "13px" }}>
                  Total: ~Rp {(recipe.pricePerServing * servings).toLocaleString("id-ID")}
                </span>
              </div>
            </div>

            {/* ─── DAFTAR BAHAN ─── */}
            <div className="mb-8">
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "22px", fontWeight: 600, marginBottom: "16px" }}>
                Daftar Bahan
              </h2>
              <div className="space-y-2">
                {adjustedIngredients.map((ing, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between px-4 py-3 rounded-xl"
                    style={{ backgroundColor: i % 2 === 0 ? "#FFFFFF" : "#F5F5F5", border: "1px solid #E0E0E0" }}
                  >
                    <div className="flex items-center gap-3">
                      <div className="w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold" style={{ backgroundColor: "#FFEFCB", color: "#EE3F24" }}>
                        {i + 1}
                      </div>
                      <span style={{ color: "#023820", fontSize: "14px" }}>{ing.name}</span>
                    </div>
                    <span style={{ color: "#EE3F24", fontSize: "14px", fontWeight: 600 }}>
                      {ing.amount} {ing.unit}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* ─── LANGKAH MEMASAK ─── */}
            <div className="mb-8">
              <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "22px", fontWeight: 600, marginBottom: "16px" }}>
                Langkah Memasak
              </h2>
              <div className="space-y-3">
                {recipe.steps.map((step, i) => (
                  <div
                    key={i}
                    className="flex gap-4 p-4 rounded-xl cursor-pointer transition-all"
                    style={{
                      backgroundColor: completedSteps.includes(i) ? "#EFF4E8" : "#FFFBF5",
                      border: `1px solid ${completedSteps.includes(i) ? "rgba(107, 124, 69, 0.3)" : "rgba(212, 169, 106, 0.1)"}`,
                    }}
                    onClick={() => toggleStep(i)}
                  >
                    <div
                      className="flex-shrink-0 w-8 h-8 rounded-full flex items-center justify-center text-sm font-bold transition-all"
                      style={{
                        backgroundColor: completedSteps.includes(i) ? "#6B7C45" : "#F5ECD7",
                        color: completedSteps.includes(i) ? "white" : "#8B5E3C",
                      }}
                    >
                      {completedSteps.includes(i) ? <Check className="w-4 h-4" /> : i + 1}
                    </div>
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
                ))}
              </div>
              <p style={{ color: "#A08060", fontSize: "12px", marginTop: "8px", textAlign: "center" }}>
                💡 Klik langkah untuk menandai sebagai selesai
              </p>
            </div>

            {/* ─── FOOD WASTE SECTION ─── */}
            <div
              className="rounded-2xl p-6"
              style={{
                background: "linear-gradient(135deg, #EFF4E8 0%, #F5ECD7 100%)",
                border: "1.5px solid rgba(107, 124, 69, 0.3)",
              }}
            >
              <div className="flex items-center gap-2 mb-4">
                <Recycle className="w-5 h-5" style={{ color: "#6B7C45" }} />
                <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "20px", fontWeight: 600 }}>
                  Sisa Bahan yang Bisa Dimanfaatkan
                </h2>
              </div>
              <p style={{ color: "#6B7355", fontSize: "13px", marginBottom: "16px" }}>
                Jangan buang! Sisa bahan ini bisa diolah menjadi sesuatu yang berguna.
              </p>
              <div className="space-y-3">
                {recipe.wasteItems.map((item, i) => (
                  <div
                    key={i}
                    className="flex items-center justify-between bg-white rounded-xl p-4"
                    style={{ border: "1px solid rgba(107, 124, 69, 0.2)" }}
                  >
                    <div className="flex items-center gap-3">
                      <Leaf className="w-4 h-4 flex-shrink-0" style={{ color: "#6B7C45" }} />
                      <div>
                        <p style={{ color: "#2C1810", fontSize: "14px", fontWeight: 600 }}>{item.name}</p>
                        <p style={{ color: "#8B7355", fontSize: "12px" }}>{item.tip}</p>
                      </div>
                    </div>
                    <Link
                      to={`/waste-recipe/${item.slug}`}
                      className="px-4 py-2 rounded-lg text-xs font-semibold whitespace-nowrap transition-all"
                      style={{ backgroundColor: "#6B7C45", color: "white" }}
                    >
                      Lihat Resep →
                    </Link>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* ─── RELATED RECIPES ─── */}
        {moreRecipes.length > 0 && (
          <div>
            <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "26px", fontWeight: 700, marginBottom: "24px" }}>
              Resep Lainnya dari {recipe.origin}
            </h2>
            <div className="grid grid-cols-12 gap-5">
              {moreRecipes.map((r) => (
                <div key={r.id} className="col-span-12 md:col-span-4">
                  <RecipeCard recipe={r} compact />
                </div>
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
