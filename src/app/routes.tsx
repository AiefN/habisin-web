import { createBrowserRouter } from "react-router-dom";
import { Layout } from "./components/Layout";
import { LandingPage } from "./pages/LandingPage.tsx";
import { JelajahiResep } from "./pages/JelajahiResep.tsx";
import { DetailResep } from "./pages/DetailResep.tsx";
import { WasteRecipe } from "./pages/WasteRecipe.tsx";
import { BudgetRecipe } from "./pages/BudgetRecipe.tsx";
import { MoodFinder } from "./pages/MoodFinder.tsx";
import { CookingAssistant } from "./pages/CookingAssistant.tsx";
import { ProfilPengguna } from "./pages/ProfilPengguna.tsx";
import { Login } from "./pages/Login.tsx";
import { Register } from "./pages/Register.tsx";

function NotFound() {
  return (
    <div
      style={{ fontFamily: "'Inter', sans-serif", backgroundColor: "#FDF6EC", minHeight: "60vh" }}
      className="flex flex-col items-center justify-center py-32 px-8 text-center"
    >
      <p style={{ fontSize: "72px", marginBottom: "16px" }}>🍽️</p>
      <h1 style={{ fontFamily: "'Playfair Display', serif", color: "#2C1810", fontSize: "36px", marginBottom: "12px" }}>
        Halaman Tidak Ditemukan
      </h1>
      <p style={{ color: "#8B7355", fontSize: "16px", marginBottom: "28px" }}>
        Sepertinya halaman yang Anda cari tidak ada. Kembali ke beranda?
      </p>
      <a href="/" className="px-6 py-3 rounded-xl text-white font-medium" style={{ backgroundColor: "#8B5E3C" }}>
        Kembali ke Beranda
      </a>
    </div>
  );
}

export const router = createBrowserRouter([
  {
    path: "/",
    Component: Layout,
    children: [
      { index: true, Component: LandingPage },
      { path: "resep", Component: JelajahiResep },
      { path: "resep/:id", Component: DetailResep },
      { path: "waste-recipe/:slug", Component: WasteRecipe },
      { path: "budget", Component: BudgetRecipe },
      { path: "mood", Component: MoodFinder },
      { path: "assistant", Component: CookingAssistant },
      { path: "login", Component: Login },
      { path: "register", Component: Register },
      { path: "profil", Component: ProfilPengguna },
      { path: "*", Component: NotFound },
    ],
  },
]);
