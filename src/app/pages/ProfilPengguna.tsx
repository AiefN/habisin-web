import { useState } from "react";
import { Link } from "react-router";
import {
  User, Heart, Bookmark, Clock, Wallet, Settings, Camera, Star, ChefHat,
  Leaf, BarChart2, Calendar, Edit3, ArrowRight, Award
} from "lucide-react";
import { recipes } from "../data/recipes";
import { RecipeCard } from "../components/RecipeCard";

const AVATAR_URL = "https://images.unsplash.com/photo-1752652015503-4ada94935172?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&w=200";

const tabs = [
  { id: "favorit", label: "Resep Favorit", icon: Heart },
  { id: "simpan", label: "Resep Tersimpan", icon: Bookmark },
  { id: "riwayat", label: "Riwayat Memasak", icon: Clock },
  { id: "mealplan", label: "Meal Plan", icon: Calendar },
];

const cookingHistory = [
  { recipe: recipes[0], date: "Hari ini, 12:30", rating: 5 },
  { recipe: recipes[2], date: "Kemarin, 19:00", rating: 4 },
  { recipe: recipes[4], date: "3 hari lalu", rating: 5 },
  { recipe: recipes[6], date: "5 hari lalu", rating: 3 },
];

const mealPlan = [
  { day: "Senin", breakfast: "Miso Soup", lunch: "Bibimbap", dinner: "Rendang Sapi" },
  { day: "Selasa", breakfast: "Nasi Goreng", lunch: "Pad Thai", dinner: "Spaghetti Carbonara" },
  { day: "Rabu", breakfast: "Miso Soup", lunch: "Pizza Margherita", dinner: "Ramen Shoyu" },
  { day: "Kamis", breakfast: "Nasi Goreng", lunch: "Bibimbap", dinner: "Pad Thai" },
  { day: "Jumat", breakfast: "Miso Soup", lunch: "Rendang Sapi", dinner: "Spaghetti Carbonara" },
  { day: "Sabtu", breakfast: "Nasi Goreng", lunch: "Ramen Shoyu", dinner: "Pizza Margherita" },
  { day: "Minggu", breakfast: "Miso Soup", lunch: "Pad Thai", dinner: "Bibimbap" },
];

const stats = [
  { icon: ChefHat, label: "Resep Dimasak", value: "48", color: "#8B5E3C" },
  { icon: Heart, label: "Resep Favorit", value: "12", color: "#C4472A" },
  { icon: Leaf, label: "Food Waste Hemat", value: "2.1kg", color: "#6B7C45" },
  { icon: Wallet, label: "Total Hemat", value: "Rp 340K", color: "#C4872A" },
];

const achievements = [
  { title: "Chef Pemula", desc: "Memasak 10 resep pertama", icon: "🍳", earned: true },
  { title: "Zero Waste Hero", desc: "Manfaatkan 5 sisa bahan", icon: "♻️", earned: true },
  { title: "Budget Master", desc: "Masak 20 resep hemat", icon: "💰", earned: true },
  { title: "World Explorer", desc: "Coba masakan 5 negara", icon: "🌍", earned: false },
  { title: "AI Collaborator", desc: "Gunakan AI Assistant 10x", icon: "🤖", earned: false },
];

export function ProfilPengguna() {
  const [activeTab, setActiveTab] = useState("favorit");
  const [weeklyBudget, setWeeklyBudget] = useState(350000);

  const favoriteRecipes = recipes.slice(0, 4);
  const savedRecipes = recipes.slice(2, 6);

  return (
    <div style={{ backgroundColor: "#FDF6EC", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      {/* ─── PROFILE HEADER ─── */}
      <div style={{ background: "linear-gradient(135deg, #2C1810 0%, #4A3420 100%)" }} className="px-8 py-12">
        <div className="max-w-[1440px] mx-auto">
          <div className="grid grid-cols-12 gap-8 items-center">
            {/* Avatar + Info */}
            <div className="col-span-12 md:col-span-6 flex items-center gap-6">
              <div className="relative">
                <div className="w-24 h-24 rounded-full overflow-hidden" style={{ border: "3px solid #D4A96A" }}>
                  <img src={AVATAR_URL} alt="Avatar" className="w-full h-full object-cover" />
                </div>
                <button
                  className="absolute bottom-0 right-0 w-8 h-8 rounded-full flex items-center justify-center"
                  style={{ backgroundColor: "#8B5E3C", border: "2px solid #2C1810" }}
                >
                  <Camera className="w-4 h-4 text-white" />
                </button>
              </div>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#F5ECD7", fontSize: "24px", fontWeight: 700 }}>
                    Sari Dewi
                  </h1>
                  <div className="px-2 py-0.5 rounded-full text-xs font-semibold" style={{ backgroundColor: "rgba(212, 169, 106, 0.25)", color: "#D4A96A" }}>
                    ⭐ Pro
                  </div>
                </div>
                <p style={{ color: "#A08060", fontSize: "14px", marginBottom: "8px" }}>sari.dewi@email.com</p>
                <p style={{ color: "#8B7355", fontSize: "13px" }}>
                  📍 Jakarta, Indonesia · Bergabung Maret 2024
                </p>
                <p style={{ color: "#D4A96A", fontSize: "13px", marginTop: "6px", fontStyle: "italic" }}>
                  "Memasak adalah bahasa cinta yang universal" 🍳
                </p>
              </div>
            </div>

            {/* Stats */}
            <div className="col-span-12 md:col-span-6 grid grid-cols-4 gap-3">
              {stats.map((stat) => (
                <div
                  key={stat.label}
                  className="rounded-2xl p-4 text-center"
                  style={{ backgroundColor: "rgba(255, 251, 245, 0.05)", border: "1px solid rgba(212, 169, 106, 0.15)" }}
                >
                  <div className="w-9 h-9 rounded-full flex items-center justify-center mx-auto mb-2" style={{ backgroundColor: stat.color + "22" }}>
                    <stat.icon className="w-4 h-4" style={{ color: stat.color }} />
                  </div>
                  <p style={{ color: "#F5ECD7", fontSize: "20px", fontWeight: 700, fontFamily: "'Playfair Display', serif" }}>
                    {stat.value}
                  </p>
                  <p style={{ color: "#8B7355", fontSize: "11px", marginTop: "2px" }}>{stat.label}</p>
                </div>
              ))}
            </div>
          </div>

          {/* Achievements */}
          <div className="mt-8 pt-6" style={{ borderTop: "1px solid rgba(212, 169, 106, 0.15)" }}>
            <p style={{ color: "#A08060", fontSize: "13px", marginBottom: "10px" }}>🏆 Pencapaian</p>
            <div className="flex flex-wrap gap-3">
              {achievements.map((ach) => (
                <div
                  key={ach.title}
                  className="flex items-center gap-2 px-3 py-2 rounded-xl"
                  style={{
                    backgroundColor: ach.earned ? "rgba(212, 169, 106, 0.15)" : "rgba(255, 251, 245, 0.04)",
                    border: `1px solid ${ach.earned ? "rgba(212, 169, 106, 0.3)" : "rgba(255, 251, 245, 0.08)"}`,
                    opacity: ach.earned ? 1 : 0.5,
                  }}
                >
                  <span style={{ fontSize: "16px" }}>{ach.icon}</span>
                  <div>
                    <p style={{ color: ach.earned ? "#D4A96A" : "#6B5040", fontSize: "12px", fontWeight: 600 }}>{ach.title}</p>
                    <p style={{ color: "#6B5040", fontSize: "10px" }}>{ach.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>

      <div className="max-w-[1440px] mx-auto px-8 py-10">
        <div className="grid grid-cols-12 gap-8">
          {/* ─── LEFT SIDEBAR ─── */}
          <div className="col-span-12 lg:col-span-3 space-y-5">
            {/* Account Settings */}
            <div
              className="rounded-2xl overflow-hidden"
              style={{ backgroundColor: "#FFFBF5", border: "1px solid rgba(212, 169, 106, 0.15)", boxShadow: "0 2px 12px rgba(44, 24, 16, 0.06)" }}
            >
              <div className="px-5 py-4" style={{ borderBottom: "1px solid rgba(212, 169, 106, 0.1)" }}>
                <h3 style={{ color: "#2C1810", fontSize: "15px", fontWeight: 600 }}>Pengaturan Akun</h3>
              </div>
              {[
                { icon: User, label: "Edit Profil" },
                { icon: Settings, label: "Preferensi" },
                { icon: Wallet, label: "Langganan" },
                { icon: BarChart2, label: "Statistik Memasak" },
              ].map((item) => (
                <button
                  key={item.label}
                  className="w-full flex items-center gap-3 px-5 py-3 transition-all text-left"
                  style={{ borderBottom: "1px solid rgba(212, 169, 106, 0.08)" }}
                  onMouseEnter={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "#FDF6EC"; }}
                  onMouseLeave={(e) => { (e.currentTarget as HTMLElement).style.backgroundColor = "transparent"; }}
                >
                  <item.icon className="w-4 h-4" style={{ color: "#8B5E3C" }} />
                  <span style={{ color: "#5C4030", fontSize: "13px" }}>{item.label}</span>
                  <ArrowRight className="w-3 h-3 ml-auto" style={{ color: "#C4A882" }} />
                </button>
              ))}
            </div>

            {/* Weekly Budget */}
            <div
              className="rounded-2xl p-5"
              style={{ background: "linear-gradient(135deg, #2C1810, #3D2415)", border: "1px solid rgba(212, 169, 106, 0.15)" }}
            >
              <div className="flex items-center justify-between mb-4">
                <h3 style={{ color: "#F5ECD7", fontSize: "15px", fontWeight: 600 }}>Budget Mingguan</h3>
                <button style={{ color: "#D4A96A" }}>
                  <Edit3 className="w-4 h-4" />
                </button>
              </div>
              <p style={{ fontFamily: "'Playfair Display', serif", color: "#D4A96A", fontSize: "26px", fontWeight: 700, marginBottom: "8px" }}>
                Rp {weeklyBudget.toLocaleString("id-ID")}
              </p>
              <div className="w-full rounded-full h-2 mb-3" style={{ backgroundColor: "rgba(255, 251, 245, 0.1)" }}>
                <div
                  className="h-2 rounded-full"
                  style={{ width: "68%", backgroundColor: "#D4A96A" }}
                />
              </div>
              <div className="flex justify-between">
                <span style={{ color: "#A08060", fontSize: "12px" }}>Terpakai: Rp 238K</span>
                <span style={{ color: "#8FBF52", fontSize: "12px" }}>Sisa: Rp 112K</span>
              </div>
              <Link
                to="/budget"
                className="block mt-4 text-center py-2 rounded-xl text-xs font-medium"
                style={{ backgroundColor: "rgba(212, 169, 106, 0.2)", color: "#D4A96A" }}
              >
                Cari Resep Sesuai Budget
              </Link>
            </div>

            {/* AI Recommendation */}
            <div
              className="rounded-2xl p-5"
              style={{ backgroundColor: "#EFF4E8", border: "1px solid rgba(107, 124, 69, 0.25)" }}
            >
              <div className="flex items-center gap-2 mb-3">
                <Leaf className="w-4 h-4" style={{ color: "#6B7C45" }} />
                <h3 style={{ color: "#3D2B1F", fontSize: "14px", fontWeight: 600 }}>Dampak Lingkunganmu</h3>
              </div>
              <div className="space-y-2">
                <div className="flex justify-between">
                  <span style={{ color: "#6B7355", fontSize: "13px" }}>Food waste hemat</span>
                  <span style={{ color: "#6B7C45", fontWeight: 600, fontSize: "13px" }}>2.1 kg</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B7355", fontSize: "13px" }}>CO₂ dikurangi</span>
                  <span style={{ color: "#6B7C45", fontWeight: 600, fontSize: "13px" }}>4.8 kg</span>
                </div>
                <div className="flex justify-between">
                  <span style={{ color: "#6B7355", fontSize: "13px" }}>Resep zero waste</span>
                  <span style={{ color: "#6B7C45", fontWeight: 600, fontSize: "13px" }}>8 resep</span>
                </div>
              </div>
            </div>
          </div>

          {/* ─── MAIN CONTENT ─── */}
          <div className="col-span-12 lg:col-span-9">
            {/* Tabs */}
            <div
              className="flex gap-1 p-1 rounded-2xl mb-7"
              style={{ backgroundColor: "#FFFBF5", border: "1px solid rgba(212, 169, 106, 0.15)", display: "inline-flex", width: "100%" }}
            >
              {tabs.map((tab) => {
                const isActive = activeTab === tab.id;
                return (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl text-sm font-medium flex-1 justify-center transition-all"
                    style={{
                      backgroundColor: isActive ? "#8B5E3C" : "transparent",
                      color: isActive ? "white" : "#8B7355",
                    }}
                  >
                    <tab.icon className="w-4 h-4" />
                    <span className="hidden sm:inline">{tab.label}</span>
                  </button>
                );
              })}
            </div>

            {/* Resep Favorit */}
            {activeTab === "favorit" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "22px", fontWeight: 600 }}>
                    Resep Favorit Saya
                  </h2>
                  <span style={{ color: "#8B7355", fontSize: "13px" }}>{favoriteRecipes.length} resep</span>
                </div>
                <div className="grid grid-cols-12 gap-5">
                  {favoriteRecipes.map((r) => (
                    <div key={r.id} className="col-span-12 md:col-span-6">
                      <RecipeCard recipe={r} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Resep Tersimpan */}
            {activeTab === "simpan" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "22px", fontWeight: 600 }}>
                    Resep Tersimpan
                  </h2>
                  <span style={{ color: "#8B7355", fontSize: "13px" }}>{savedRecipes.length} resep</span>
                </div>
                <div className="grid grid-cols-12 gap-5">
                  {savedRecipes.map((r) => (
                    <div key={r.id} className="col-span-12 md:col-span-6">
                      <RecipeCard recipe={r} />
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Riwayat Memasak */}
            {activeTab === "riwayat" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "22px", fontWeight: 600 }}>
                    Riwayat Memasak
                  </h2>
                  <span style={{ color: "#8B7355", fontSize: "13px" }}>48 resep total</span>
                </div>
                <div className="space-y-4">
                  {cookingHistory.map((entry, i) => (
                    <div
                      key={i}
                      className="flex gap-4 p-4 rounded-2xl"
                      style={{ backgroundColor: "#FFFBF5", border: "1px solid rgba(212, 169, 106, 0.15)", boxShadow: "0 2px 8px rgba(44, 24, 16, 0.04)" }}
                    >
                      <img
                        src={entry.recipe.image}
                        alt={entry.recipe.name}
                        className="w-20 h-20 rounded-xl object-cover flex-shrink-0"
                      />
                      <div className="flex-1">
                        <div className="flex items-start justify-between">
                          <div>
                            <h3 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "17px", fontWeight: 600 }}>
                              {entry.recipe.name}
                            </h3>
                            <p style={{ color: "#8B7355", fontSize: "13px", marginBottom: "6px" }}>
                              {entry.recipe.flag} {entry.recipe.origin} · {entry.recipe.cookTime}
                            </p>
                          </div>
                          <span style={{ color: "#A08060", fontSize: "12px" }}>{entry.date}</span>
                        </div>
                        <div className="flex items-center gap-1">
                          {Array.from({ length: 5 }).map((_, j) => (
                            <Star
                              key={j}
                              className="w-4 h-4"
                              style={{ color: j < entry.rating ? "#D4A96A" : "#E5D5C0", fill: j < entry.rating ? "#D4A96A" : "none" }}
                            />
                          ))}
                          <span style={{ color: "#A08060", fontSize: "12px", marginLeft: "4px" }}>{entry.rating}/5</span>
                        </div>
                      </div>
                      <Link
                        to={`/resep/${entry.recipe.id}`}
                        className="flex-shrink-0 px-4 py-2 rounded-xl text-xs font-medium self-center"
                        style={{ backgroundColor: "#F5ECD7", color: "#8B5E3C" }}
                      >
                        Masak Lagi
                      </Link>
                    </div>
                  ))}
                </div>
              </div>
            )}

            {/* Meal Plan */}
            {activeTab === "mealplan" && (
              <div>
                <div className="flex items-center justify-between mb-6">
                  <h2 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "22px", fontWeight: 600 }}>
                    Meal Plan Mingguan
                  </h2>
                  <div className="flex items-center gap-2">
                    <span style={{ color: "#8B7355", fontSize: "13px" }}>Budget: Rp {weeklyBudget.toLocaleString("id-ID")}</span>
                    <Link to="/budget" className="px-3 py-1.5 rounded-lg text-xs" style={{ backgroundColor: "#8B5E3C", color: "white" }}>
                      Sesuaikan
                    </Link>
                  </div>
                </div>
                <div className="overflow-x-auto rounded-2xl" style={{ border: "1px solid rgba(212, 169, 106, 0.15)" }}>
                  <table className="w-full min-w-[600px]">
                    <thead>
                      <tr style={{ backgroundColor: "#2C1810" }}>
                        <th className="px-5 py-3 text-left text-sm" style={{ color: "#D4A96A", fontWeight: 600 }}>Hari</th>
                        <th className="px-5 py-3 text-left text-sm" style={{ color: "#D4A96A", fontWeight: 600 }}>Sarapan</th>
                        <th className="px-5 py-3 text-left text-sm" style={{ color: "#D4A96A", fontWeight: 600 }}>Makan Siang</th>
                        <th className="px-5 py-3 text-left text-sm" style={{ color: "#D4A96A", fontWeight: 600 }}>Makan Malam</th>
                      </tr>
                    </thead>
                    <tbody>
                      {mealPlan.map((row, i) => (
                        <tr
                          key={row.day}
                          style={{
                            backgroundColor: i % 2 === 0 ? "#FFFBF5" : "#FDF6EC",
                            borderBottom: "1px solid rgba(212, 169, 106, 0.08)",
                          }}
                        >
                          <td className="px-5 py-3">
                            <span style={{ color: "#2C1810", fontSize: "13px", fontWeight: 600 }}>{row.day}</span>
                          </td>
                          {[row.breakfast, row.lunch, row.dinner].map((meal, j) => (
                            <td key={j} className="px-5 py-3">
                              <span
                                className="inline-block px-2 py-1 rounded-lg text-xs"
                                style={{ backgroundColor: "#F5ECD7", color: "#8B5E3C" }}
                              >
                                {meal}
                              </span>
                            </td>
                          ))}
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
                <div className="mt-5 flex justify-center">
                  <Link
                    to="/budget"
                    className="flex items-center gap-2 px-6 py-3 rounded-xl font-medium"
                    style={{ backgroundColor: "#8B5E3C", color: "white" }}
                  >
                    <Wallet className="w-4 h-4" />
                    Generate Meal Plan dari Budget
                  </Link>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
