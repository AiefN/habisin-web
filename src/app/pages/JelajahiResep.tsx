import { useState, useMemo } from "react";
import { Search, SlidersHorizontal, ChevronDown, X, Filter } from "lucide-react";
import { RecipeCard } from "../components/RecipeCard";
import { recipes } from "../data/recipes";

const cuisines = ["Semua", "Italia", "Jepang", "Korea", "Thailand", "Indonesia"];
const difficulties = ["Semua", "Mudah", "Sedang", "Sulit"];
const budgets = [
  { label: "Semua Budget", min: 0, max: Infinity },
  { label: "< Rp 20.000", min: 0, max: 20000 },
  { label: "Rp 20.000 – 35.000", min: 20000, max: 35000 },
  { label: "Rp 35.000 – 50.000", min: 35000, max: 50000 },
  { label: "> Rp 50.000", min: 50000, max: Infinity },
];
const cookTimes = [
  { label: "Semua", min: 0, max: Infinity },
  { label: "< 15 menit", min: 0, max: 15 },
  { label: "15–30 menit", min: 15, max: 30 },
  { label: "30–60 menit", min: 30, max: 60 },
  { label: "> 60 menit", min: 60, max: Infinity },
];
const typeOptions = ["Vegetarian", "Sehat", "Cepat Dimasak", "Non-Vegetarian"];

export function JelajahiResep() {
  const [search, setSearch] = useState("");
  const [selectedCuisine, setSelectedCuisine] = useState("Semua");
  const [selectedDifficulty, setSelectedDifficulty] = useState("Semua");
  const [selectedBudget, setSelectedBudget] = useState(0);
  const [selectedCookTime, setSelectedCookTime] = useState(0);
  const [selectedTypes, setSelectedTypes] = useState<string[]>([]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const filtered = useMemo(() => {
    return recipes.filter((r) => {
      const matchSearch = r.name.toLowerCase().includes(search.toLowerCase()) ||
        r.origin.toLowerCase().includes(search.toLowerCase()) ||
        r.description.toLowerCase().includes(search.toLowerCase());

      const matchCuisine = selectedCuisine === "Semua" || r.origin === selectedCuisine;
      const matchDiff = selectedDifficulty === "Semua" || r.difficulty === selectedDifficulty;

      const budget = budgets[selectedBudget];
      const matchBudget = r.pricePerServing <= budget.max && r.pricePerServing >= budget.min;

      const cookTime = cookTimes[selectedCookTime];
      const matchTime = r.cookTimeMinutes <= cookTime.max && r.cookTimeMinutes >= cookTime.min;

      const matchType = selectedTypes.length === 0 || selectedTypes.some((t) =>
        r.type.some((rt) => rt.toLowerCase().includes(t.toLowerCase()))
      );

      return matchSearch && matchCuisine && matchDiff && matchBudget && matchTime && matchType;
    });
  }, [search, selectedCuisine, selectedDifficulty, selectedBudget, selectedCookTime, selectedTypes]);

  const toggleType = (type: string) => {
    setSelectedTypes((prev) =>
      prev.includes(type) ? prev.filter((t) => t !== type) : [...prev, type]
    );
  };

  const clearFilters = () => {
    setSelectedCuisine("Semua");
    setSelectedDifficulty("Semua");
    setSelectedBudget(0);
    setSelectedCookTime(0);
    setSelectedTypes([]);
    setSearch("");
  };

  const hasFilters = selectedCuisine !== "Semua" || selectedDifficulty !== "Semua" || selectedBudget !== 0 || selectedCookTime !== 0 || selectedTypes.length > 0 || search !== "";

  return (
    <div style={{ backgroundColor: "#FDF6EC", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* Header */}
      <div style={{ backgroundColor: "#2C1810" }} className="py-14 px-8">
        <div className="max-w-[1440px] mx-auto">
          <p style={{ color: "#D4A96A", fontSize: "13px", fontWeight: 600, letterSpacing: "1px", marginBottom: "8px" }}>
            🌍 RESEP INTERNASIONAL
          </p>
          <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#F5ECD7", fontSize: "clamp(28px, 4vw, 48px)", fontWeight: 700, marginBottom: "16px" }}>
            Jelajahi Resep Dunia
          </h1>
          <p style={{ color: "#A08060", fontSize: "16px", maxWidth: "520px", marginBottom: "28px" }}>
            Temukan resep dari berbagai negara, sesuaikan porsi dan budget Anda.
          </p>

          {/* Search Bar */}
          <div className="relative max-w-2xl">
            <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5" style={{ color: "#8B7355" }} />
            <input
              type="text"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
              placeholder="Cari resep, bahan, atau negara asal..."
              className="w-full pl-12 pr-12 py-4 rounded-2xl text-sm outline-none"
              style={{
                backgroundColor: "#FFFBF5",
                border: "1.5px solid rgba(212, 169, 106, 0.3)",
                color: "#3D2B1F",
              }}
            />
            {search && (
              <button onClick={() => setSearch("")} className="absolute right-4 top-1/2 -translate-y-1/2">
                <X className="w-4 h-4" style={{ color: "#8B7355" }} />
              </button>
            )}
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* ─── SIDEBAR FILTER ─── */}
          <aside className="col-span-12 lg:col-span-3">
            <div
              className="rounded-2xl p-6 sticky top-24"
              style={{
                backgroundColor: "#FFFBF5",
                border: "1px solid rgba(212, 169, 106, 0.15)",
                boxShadow: "0 2px 16px rgba(44, 24, 16, 0.06)",
              }}
            >
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-2">
                  <SlidersHorizontal className="w-4 h-4" style={{ color: "#8B5E3C" }} />
                  <span style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontWeight: 600, fontSize: "17px" }}>
                    Filter Resep
                  </span>
                </div>
                {hasFilters && (
                  <button
                    onClick={clearFilters}
                    className="text-xs px-3 py-1 rounded-full"
                    style={{ backgroundColor: "#F5ECD7", color: "#8B5E3C" }}
                  >
                    Reset
                  </button>
                )}
              </div>

              {/* Cuisine / Negara */}
              <FilterSection title="Cuisine / Negara">
                <div className="flex flex-wrap gap-2">
                  {cuisines.map((c) => (
                    <button
                      key={c}
                      onClick={() => setSelectedCuisine(c)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        backgroundColor: selectedCuisine === c ? "#8B5E3C" : "#F5ECD7",
                        color: selectedCuisine === c ? "white" : "#8B7355",
                      }}
                    >
                      {c}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Waktu Memasak */}
              <FilterSection title="Waktu Memasak">
                {cookTimes.map((ct, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer py-1">
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                      style={{
                        borderColor: selectedCookTime === i ? "#8B5E3C" : "#D4A96A",
                        backgroundColor: selectedCookTime === i ? "#8B5E3C" : "transparent",
                      }}
                      onClick={() => setSelectedCookTime(i)}
                    >
                      {selectedCookTime === i && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm" style={{ color: "#5C4030" }}>{ct.label}</span>
                  </label>
                ))}
              </FilterSection>

              {/* Tingkat Kesulitan */}
              <FilterSection title="Tingkat Kesulitan">
                <div className="flex flex-wrap gap-2">
                  {difficulties.map((d) => (
                    <button
                      key={d}
                      onClick={() => setSelectedDifficulty(d)}
                      className="px-3 py-1.5 rounded-full text-xs font-medium transition-all"
                      style={{
                        backgroundColor: selectedDifficulty === d ? "#6B7C45" : "#EFF4E8",
                        color: selectedDifficulty === d ? "white" : "#6B7C45",
                      }}
                    >
                      {d}
                    </button>
                  ))}
                </div>
              </FilterSection>

              {/* Budget */}
              <FilterSection title="Budget per Porsi">
                {budgets.map((b, i) => (
                  <label key={i} className="flex items-center gap-3 cursor-pointer py-1">
                    <div
                      className="w-4 h-4 rounded-full border-2 flex items-center justify-center transition-all"
                      style={{
                        borderColor: selectedBudget === i ? "#C4872A" : "#D4A96A",
                        backgroundColor: selectedBudget === i ? "#C4872A" : "transparent",
                      }}
                      onClick={() => setSelectedBudget(i)}
                    >
                      {selectedBudget === i && <div className="w-1.5 h-1.5 rounded-full bg-white" />}
                    </div>
                    <span className="text-sm" style={{ color: "#5C4030" }}>{b.label}</span>
                  </label>
                ))}
              </FilterSection>

              {/* Jenis Makanan */}
              <FilterSection title="Jenis Makanan" last>
                {typeOptions.map((t) => (
                  <label key={t} className="flex items-center gap-3 cursor-pointer py-1">
                    <div
                      className="w-4 h-4 rounded flex items-center justify-center border transition-all"
                      style={{
                        backgroundColor: selectedTypes.includes(t) ? "#8B5E3C" : "transparent",
                        borderColor: selectedTypes.includes(t) ? "#8B5E3C" : "#D4A96A",
                      }}
                      onClick={() => toggleType(t)}
                    >
                      {selectedTypes.includes(t) && (
                        <svg className="w-2.5 h-2.5 text-white" fill="currentColor" viewBox="0 0 12 12">
                          <path d="M10 3L5 8.5 2 5.5" stroke="white" strokeWidth="2" strokeLinecap="round" fill="none" />
                        </svg>
                      )}
                    </div>
                    <span className="text-sm" style={{ color: "#5C4030" }}>{t}</span>
                  </label>
                ))}
              </FilterSection>
            </div>
          </aside>

          {/* ─── RECIPE GRID ─── */}
          <main className="col-span-12 lg:col-span-9">
            {/* Results header */}
            <div className="flex items-center justify-between mb-6">
              <p style={{ color: "#8B7355", fontSize: "14px" }}>
                Menampilkan <span style={{ color: "#2C1810", fontWeight: 600 }}>{filtered.length}</span> resep
                {search && <> untuk "<span style={{ color: "#8B5E3C", fontWeight: 600 }}>{search}</span>"</>}
              </p>
              <select
                className="text-sm rounded-xl px-4 py-2 outline-none"
                style={{ backgroundColor: "#FFFBF5", border: "1px solid rgba(212, 169, 106, 0.25)", color: "#5C4030" }}
              >
                <option>Paling Populer</option>
                <option>Tercepat Dimasak</option>
                <option>Termurah</option>
                <option>Termudah</option>
              </select>
            </div>

            {filtered.length === 0 ? (
              <div className="text-center py-24 rounded-2xl" style={{ backgroundColor: "#FFFBF5", border: "1px solid rgba(212, 169, 106, 0.15)" }}>
                <p style={{ fontSize: "48px", marginBottom: "12px" }}>🍳</p>
                <p style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "20px", fontWeight: 600, marginBottom: "8px" }}>
                  Resep Tidak Ditemukan
                </p>
                <p style={{ color: "#8B7355", fontSize: "14px", marginBottom: "20px" }}>
                  Coba ubah kata kunci pencarian atau filter Anda.
                </p>
                <button
                  onClick={clearFilters}
                  className="px-5 py-2 rounded-xl text-sm font-medium"
                  style={{ backgroundColor: "#8B5E3C", color: "white" }}
                >
                  Reset Filter
                </button>
              </div>
            ) : (
              <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-5">
                {filtered.map((recipe) => (
                  <RecipeCard key={recipe.id} recipe={recipe} />
                ))}
              </div>
            )}
          </main>
        </div>
      </div>
    </div>
  );
}

function FilterSection({ title, children, last = false }: { title: string; children: React.ReactNode; last?: boolean }) {
  const [open, setOpen] = useState(true);

  return (
    <div className={`pb-5 mb-5 ${!last ? "border-b" : ""}`} style={{ borderColor: "rgba(212, 169, 106, 0.2)" }}>
      <button
        className="flex items-center justify-between w-full mb-3"
        onClick={() => setOpen(!open)}
      >
        <span style={{ color: "#3D2B1F", fontSize: "14px", fontWeight: 600 }}>{title}</span>
        <ChevronDown
          className="w-4 h-4 transition-transform"
          style={{ color: "#8B7355", transform: open ? "rotate(180deg)" : "rotate(0deg)" }}
        />
      </button>
      {open && <div className="space-y-1">{children}</div>}
    </div>
  );
}