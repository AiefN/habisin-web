import { useState, useMemo } from "react";
import { Wallet, Search, ChefHat, Users, Minus, Plus, Flame, Leaf, Zap, Heart } from "lucide-react";
import { RecipeCard } from "../components/RecipeCard";

const filterOptions = [
  { id: "pedas", label: "Pedas", icon: Flame, color: "#C4472A" },
  { id: "sehat", label: "Sehat", icon: Heart, color: "#6B7C45" },
  { id: "vegetarian", label: "Vegetarian", icon: Leaf, color: "#5A9E4A" },
  { id: "cepat", label: "Cepat Dimasak", icon: Zap, color: "#C4872A" },
];

const budgetPresets = [
  { label: "Budget Hemat", value: 15000, color: "#6B7C45" },
  { label: "Budget Standar", value: 30000, color: "#C4872A" },
  { label: "Budget Fleksibel", value: 50000, color: "#8B5E3C" },
];

export function BudgetRecipe() {
  const [budget, setBudget] = useState(25000);
  const [inputBudget, setInputBudget] = useState("25000");
  const [servings, setServings] = useState(2);
  const [activeFilters, setActiveFilters] = useState<string[]>([]);
  const [searched, setSearched] = useState(false);
  const [results, setResults] = useState<any[]>([]);
  const [loading, setLoading] = useState(false);

  const totalBudget = budget * servings;

  const handleBudgetInput = (val: string) => {
    const num = parseInt(val.replace(/\D/g, ""));
    if (!isNaN(num)) {
      setBudget(num);
      setInputBudget(num.toLocaleString("id-ID"));
    } else {
      setInputBudget(val);
    }
  };

  const toggleFilter = (id: string) => {
    setActiveFilters((prev) => prev.includes(id) ? prev.filter((f) => f !== id) : [...prev, id]);
  };

  const handleSearch = async () => {
    setLoading(true);
    try {
      const response = await fetch("http://localhost:3002/api/budget", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ budget }),
      });

      if (!response.ok) {
        throw new Error("Failed to fetch recipes");
      }

      const data = await response.json();
      let filteredRecipes = data.recipes;

      // Apply additional filters on frontend
      if (activeFilters.length > 0) {
        filteredRecipes = filteredRecipes.filter((r: any) => {
          return activeFilters.some((f) => {
            if (f === "pedas") return r.moods.includes("Pedas");
            if (f === "sehat") return r.type.some((t: string) => t.toLowerCase().includes("sehat")) || r.moods.includes("Sehat");
            if (f === "vegetarian") return r.type.some((t: string) => t.toLowerCase().includes("vegetarian"));
            if (f === "cepat") return r.cookTimeMinutes <= 20;
            return true;
          });
        });
      }

      setResults(filteredRecipes);
      setSearched(true);
    } catch (error) {
      console.error("Error:", error);
      setResults([]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ background: "linear-gradient(135deg, #023820 0%, #0D6B47 100%)" }} className="py-16 px-8">
        <div className="max-w-[1440px] mx-auto">
          <div className="inline-flex items-center gap-2 mb-4 px-4 py-1.5 rounded-full" style={{ backgroundColor: "rgba(238, 63, 36, 0.2)", border: "1px solid rgba(238, 63, 36, 0.4)" }}>
            <Wallet className="w-4 h-4" style={{ color: "#FFEFCB" }} />
            <span style={{ color: "#FFEFCB", fontSize: "13px", fontWeight: 600 }}>Cook by Budget</span>
          </div>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#FFEFCB", fontSize: "clamp(32px, 4vw, 56px)", fontWeight: 700, marginBottom: "12px", lineHeight: 1.2 }}>
            Masak Enak Sesuai<br />
            <span style={{ color: "#F9A11B" }}>Budget Anda</span>
          </h1>
          <p style={{ color: "#E8F5E9", fontSize: "16px", maxWidth: "500px" }}>
            Masukkan budget dan jumlah porsi, kami akan rekomendasikan resep terbaik yang sesuai.
          </p>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-12">
        {/* ─── INPUT FORM ─── */}
        <div
          className="rounded-3xl p-8 mb-10"
          style={{ backgroundColor: "#FFFFFF", border: "1px solid #E0E0E0", boxShadow: "0 4px 24px rgba(0, 0, 0, 0.08)" }}
        >
          <div className="grid grid-cols-12 gap-6 mb-6">
            {/* Budget Input */}
            <div className="col-span-12 md:col-span-5">
              <label style={{ color: "#023820", fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "10px" }}>
                Budget per Porsi
              </label>
              <div className="relative">
                <span
                  className="absolute left-4 top-1/2 -translate-y-1/2 font-semibold"
                  style={{ color: "#EE3F24", fontSize: "15px" }}
                >
                  Rp
                </span>
                <input
                  type="text"
                  value={inputBudget}
                  onChange={(e) => handleBudgetInput(e.target.value)}
                  className="w-full pl-12 pr-4 py-4 rounded-xl outline-none"
                  style={{
                    backgroundColor: "#F5F5F5",
                    border: "1.5px solid #E0E0E0",
                    color: "#023820",
                    fontSize: "18px",
                    fontWeight: 600,
                  }}
                  placeholder="25.000"
                />
              </div>
              {/* Range slider */}
              <input
                type="range"
                min={5000}
                max={100000}
                step={5000}
                value={budget}
                onChange={(e) => {
                  const v = parseInt(e.target.value);
                  setBudget(v);
                  setInputBudget(v.toLocaleString("id-ID"));
                }}
                className="w-full mt-3"
                style={{ accentColor: "#EE3F24" }}
              />
              <div className="flex justify-between mt-1">
                <span style={{ color: "#666666", fontSize: "12px" }}>Rp 5.000</span>
                <span style={{ color: "#666666", fontSize: "12px" }}>Rp 100.000</span>
              </div>
            </div>

            {/* Servings */}
            <div className="col-span-12 md:col-span-3">
              <label style={{ color: "#023820", fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "10px" }}>
                Jumlah Porsi
              </label>
              <div
                className="flex items-center gap-4 justify-between px-5 py-4 rounded-xl"
                style={{ backgroundColor: "#F5F5F5", border: "1.5px solid #E0E0E0" }}
              >
                <button
                  onClick={() => setServings((s) => Math.max(1, s - 1))}
                  className="w-9 h-9 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: servings <= 1 ? "#E0E0E0" : "#EE3F24", color: servings <= 1 ? "#999" : "white" }}
                >
                  <Minus className="w-4 h-4" />
                </button>
                <span style={{ color: "#023820", fontSize: "24px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
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
            </div>

            {/* Total Budget */}
            <div className="col-span-12 md:col-span-4">
              <label style={{ color: "#023820", fontSize: "14px", fontWeight: 600, display: "block", marginBottom: "10px" }}>
                Total Budget
              </label>
              <div
                className="px-5 py-4 rounded-xl flex items-center justify-between"
                style={{ background: "linear-gradient(135deg, #023820, #0D6B47)", border: "1.5px solid rgba(255, 239, 203, 0.2)" }}
              >
                <div>
                  <p style={{ color: "#E8F5E9", fontSize: "12px" }}>Total untuk {servings} porsi</p>
                  <p style={{ color: "#FFEFCB", fontSize: "22px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
                    Rp {totalBudget.toLocaleString("id-ID")}
                  </p>
                </div>
                <Wallet className="w-8 h-8" style={{ color: "#FFEFCB" }} />
              </div>
            </div>
          </div>

          {/* Budget Presets */}
          <div className="flex flex-wrap gap-3 mb-6">
            <span style={{ color: "#666666", fontSize: "13px", alignSelf: "center" }}>Pilih cepat:</span>
            {budgetPresets.map((p) => (
              <button
                key={p.value}
                onClick={() => {
                  setBudget(p.value);
                  setInputBudget(p.value.toLocaleString("id-ID"));
                }}
                className="px-4 py-2 rounded-full text-sm font-medium transition-all"
                style={{
                  backgroundColor: budget === p.value ? p.color : "#FFEFCB",
                  color: budget === p.value ? "white" : "#666666",
                }}
              >
                {p.label} — Rp {p.value.toLocaleString("id-ID")}
              </button>
            ))}
          </div>

          {/* Filter Tambahan */}
          <div className="mb-6">
            <p style={{ color: "#023820", fontSize: "14px", fontWeight: 600, marginBottom: "10px" }}>Filter Tambahan</p>
            <div className="flex flex-wrap gap-3">
              {filterOptions.map((opt) => {
                const isActive = activeFilters.includes(opt.id);
                return (
                  <button
                    key={opt.id}
                    onClick={() => toggleFilter(opt.id)}
                    className="flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all"
                    style={{
                      backgroundColor: isActive ? opt.color : "#FFEFCB",
                      color: isActive ? "white" : "#666666",
                      border: isActive ? `1.5px solid ${opt.color}` : "1.5px solid #E0E0E0",
                    }}
                  >
                    <opt.icon className="w-4 h-4" />
                    {opt.label}
                  </button>
                );
              })}
            </div>
          </div>

          {/* Search Button */}
          <button
            onClick={handleSearch}
            className="w-full py-4 rounded-2xl font-semibold text-white flex items-center justify-center gap-3 transition-all text-lg"
            style={{ background: "linear-gradient(135deg, #EE3F24, #F9A11B)", boxShadow: "0 4px 20px rgba(238, 63, 36, 0.35)" }}
            onMouseEnter={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(-1px)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 6px 25px rgba(238, 63, 36, 0.5)";
            }}
            onMouseLeave={(e) => {
              (e.currentTarget as HTMLElement).style.transform = "translateY(0)";
              (e.currentTarget as HTMLElement).style.boxShadow = "0 4px 20px rgba(238, 63, 36, 0.35)";
            }}
          >
            <Search className="w-5 h-5" />
            Cari Resep Sesuai Budget
          </button>
        </div>

        {/* ─── RESULTS ─── */}
        {loading && (
          <div className="text-center py-20">
            <div className="inline-block animate-spin rounded-full h-8 w-8 border-b-2 border-[#6B7C45]"></div>
            <p style={{ color: "#8B7355", fontSize: "15px", marginTop: "10px" }}>Mencari resep sesuai budget...</p>
          </div>
        )}

        {searched && !loading && (
          <div>
            {results.length > 0 ? (
              <>
                <div className="flex items-center gap-3 mb-8">
                  <div className="w-10 h-10 rounded-full flex items-center justify-center" style={{ backgroundColor: "#E8F5E9" }}>
                    <Wallet className="w-5 h-5" style={{ color: "#023820" }} />
                  </div>
                  <div>
                    <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "24px", fontWeight: 700 }}>
                      {results.length} Resep Sesuai Budget Anda
                    </h2>
                    <p style={{ color: "#666666", fontSize: "13px" }}>
                      Budget: Rp {budget.toLocaleString("id-ID")} per porsi • {servings} porsi • Total: Rp {totalBudget.toLocaleString("id-ID")}
                    </p>
                  </div>
                </div>

                <div className="grid grid-cols-12 gap-5">
                  {results.map((r) => (
                    <div key={r.id} className="col-span-12 md:col-span-6 lg:col-span-4 xl:col-span-3">
                      <RecipeCard recipe={r} />
                    </div>
                  ))}
                </div>
              </>
            ) : (
              <div
                className="text-center py-20 rounded-2xl"
                style={{ backgroundColor: "#FFFFFF", border: "1px solid #E0E0E0" }}
              >
                <p style={{ fontSize: "52px", marginBottom: "12px" }}>💰</p>
                <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#023820", fontSize: "24px", marginBottom: "10px" }}>
                  Tidak Ada Resep dalam Budget
                </h3>
                <p style={{ color: "#666666", fontSize: "15px", marginBottom: "20px" }}>
                  Coba naikkan budget atau kurangi filter Anda.
                </p>
                <div className="flex justify-center gap-3">
                  <button
                    onClick={() => {
                      setBudget(50000);
                      setInputBudget("50.000");
                      setActiveFilters([]);
                      handleSearch();
                    }}
                    className="px-6 py-2.5 rounded-xl font-medium"
                    style={{ backgroundColor: "#EE3F24", color: "white" }}
                  >
                    Coba Budget Rp 50.000
                  </button>
                </div>
              </div>
            )}
          </div>
        )}

        {/* Default state */}
        {!searched && (
          <div className="grid grid-cols-12 gap-5">
            <div className="col-span-12 text-center py-16">
              <p style={{ fontSize: "56px", marginBottom: "12px" }}>🍳</p>
              <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "22px", marginBottom: "8px" }}>
                Masukkan Budget & Klik Cari
              </h3>
              <p style={{ color: "#8B7355" }}>Kami akan mencari resep terbaik sesuai dengan budget Anda.</p>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
