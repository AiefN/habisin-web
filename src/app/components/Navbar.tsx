import { useState } from "react";
import { Link, useLocation } from "react-router";
import { Leaf, Menu, X, ChefHat } from "lucide-react";

const navLinks = [
  { label: "Beranda", path: "/" },
  { label: "Resep", path: "/resep" },
  { label: "Masak Sesuai Budget", path: "/budget" },
  { label: "Mood Finder", path: "/mood" },
  { label: "AI Assistant", path: "/ai-assistant" },
];

export function Navbar() {
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav
      style={{ backgroundColor: "#2C1810", fontFamily: "'Inter', sans-serif" }}
      className="sticky top-0 z-50 w-full shadow-lg"
    >
      <div className="max-w-[1440px] mx-auto px-8 py-4 flex items-center justify-between">
        {/* Logo */}
        <Link to="/" className="flex items-center gap-2 group">
          <div
            style={{ backgroundColor: "#8B5E3C" }}
            className="w-9 h-9 rounded-full flex items-center justify-center"
          >
            <ChefHat className="w-5 h-5 text-white" />
          </div>
          <div className="flex flex-col leading-tight">
            <span
              className="text-white font-semibold"
              style={{ fontFamily: "'Playfair Display', serif", fontSize: "15px" }}
            >
              Cook Smart
            </span>
            <span style={{ color: "#D4A96A", fontSize: "11px", letterSpacing: "1px" }}>
              WASTE LESS
            </span>
          </div>
        </Link>

        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center gap-1">
          {navLinks.map((link) => {
            const isActive = location.pathname === link.path;
            return (
              <Link
                key={link.path}
                to={link.path}
                className="px-4 py-2 rounded-lg text-sm transition-all duration-200"
                style={{
                  color: isActive ? "#D4A96A" : "#D4C5B0",
                  backgroundColor: isActive ? "rgba(212, 169, 106, 0.15)" : "transparent",
                  fontWeight: isActive ? "600" : "400",
                }}
                onMouseEnter={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#D4A96A";
                    e.currentTarget.style.backgroundColor = "rgba(212, 169, 106, 0.08)";
                  }
                }}
                onMouseLeave={(e) => {
                  if (!isActive) {
                    e.currentTarget.style.color = "#D4C5B0";
                    e.currentTarget.style.backgroundColor = "transparent";
                  }
                }}
              >
                {link.label}
              </Link>
            );
          })}
        </div>

        {/* Auth Buttons */}
        <div className="hidden lg:flex items-center gap-3">
          <Link
            to="/profil"
            className="px-5 py-2 rounded-lg text-sm border transition-all duration-200"
            style={{ borderColor: "#8B5E3C", color: "#D4A96A" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "rgba(139, 94, 60, 0.2)";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "transparent";
            }}
          >
            Masuk
          </Link>
          <Link
            to="/profil"
            className="px-5 py-2 rounded-lg text-sm text-white transition-all duration-200"
            style={{ backgroundColor: "#8B5E3C" }}
            onMouseEnter={(e) => {
              e.currentTarget.style.backgroundColor = "#7A5234";
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.backgroundColor = "#8B5E3C";
            }}
          >
            Daftar
          </Link>
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="lg:hidden text-white"
          onClick={() => setMenuOpen(!menuOpen)}
        >
          {menuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
        </button>
      </div>

      {/* Mobile Menu */}
      {menuOpen && (
        <div style={{ backgroundColor: "#3D2010" }} className="lg:hidden px-6 pb-4">
          {navLinks.map((link) => (
            <Link
              key={link.path}
              to={link.path}
              className="block py-3 text-sm border-b"
              style={{ color: "#D4C5B0", borderColor: "rgba(212, 197, 176, 0.1)" }}
              onClick={() => setMenuOpen(false)}
            >
              {link.label}
            </Link>
          ))}
          <div className="flex gap-3 mt-4">
            <Link to="/profil" className="flex-1 text-center py-2 rounded-lg text-sm border" style={{ borderColor: "#8B5E3C", color: "#D4A96A" }} onClick={() => setMenuOpen(false)}>
              Masuk
            </Link>
            <Link to="/profil" className="flex-1 text-center py-2 rounded-lg text-sm text-white" style={{ backgroundColor: "#8B5E3C" }} onClick={() => setMenuOpen(false)}>
              Daftar
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
}
