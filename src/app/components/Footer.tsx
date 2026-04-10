import { Link } from "react-router-dom";
import { ChefHat, Mail, Instagram, Twitter, Leaf } from "lucide-react";

export function Footer() {
  return (
    <footer
      style={{ backgroundColor: "#023820", fontFamily: "'Inter', sans-serif" }}
      className="w-full"
    >
      <div className="max-w-[1440px] mx-auto px-8 py-14">
        <div className="grid grid-cols-12 gap-8">
          {/* Brand */}
          <div className="col-span-12 md:col-span-4">
            <div className="flex items-center gap-2 mb-4">
              <div style={{ backgroundColor: "#EE3F24" }} className="w-9 h-9 rounded-full flex items-center justify-center">
                <ChefHat className="w-5 h-5 text-white" />
              </div>
              <span style={{ fontFamily: "'Playfair Display', serif", color: "#FFEFCB" }} className="text-lg font-semibold">
                Cook Smart, Waste Less
              </span>
            </div>
            <p style={{ color: "#E8F5E9" }} className="text-sm leading-relaxed mb-5">
              Platform resep makanan internasional yang mendorong gaya hidup memasak yang lebih cerdas, hemat, dan berkelanjutan.
            </p>
            <div className="flex items-center gap-2">
              <Leaf className="w-4 h-4" style={{ color: "#F9A11B" }} />
              <span style={{ color: "#F9A11B" }} className="text-xs">Mendukung Zero Food Waste</span>
            </div>
            <div className="flex gap-3 mt-5">
              {[Instagram, Twitter, Mail].map((Icon, i) => (
                <button
                  key={i}
                  className="w-9 h-9 rounded-full flex items-center justify-center transition-all"
                  style={{ backgroundColor: "rgba(238, 63, 36, 0.3)", color: "#FFEFCB" }}
                  onMouseEnter={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "#EE3F24";
                  }}
                  onMouseLeave={(e) => {
                    (e.currentTarget as HTMLElement).style.backgroundColor = "rgba(238, 63, 36, 0.3)";
                  }}
                >
                  <Icon className="w-4 h-4" />
                </button>
              ))}
            </div>
          </div>

          {/* Navigasi */}
          <div className="col-span-6 md:col-span-2">
            <h4 style={{ color: "#FFEFCB", fontFamily: "'Playfair Display', serif" }} className="font-semibold mb-4">
              Navigasi
            </h4>
            <ul className="space-y-2">
              {[
                { label: "Beranda", to: "/" },
                { label: "Jelajahi Resep", to: "/resep" },
                { label: "Masak by Budget", to: "/budget" },
                { label: "Mood Finder", to: "/mood" },
              ].map((item) => (
                <li key={item.to}>
                  <Link
                    to={item.to}
                    style={{ color: "#E8F5E9" }}
                    className="text-sm hover:text-[#FFEFCB] transition-colors"
                  >
                    {item.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Tentang */}
          <div className="col-span-6 md:col-span-3">
            <h4 style={{ color: "#FFEFCB", fontFamily: "'Playfair Display', serif" }} className="font-semibold mb-4">
              Tentang Kami
            </h4>
            <ul className="space-y-2">
              {["Tentang Platform", "Misi Sustainability", "Tim Kami", "Karir", "Blog"].map((item) => (
                <li key={item}>
                  <a
                    href="#"
                    style={{ color: "#E8F5E9" }}
                    className="text-sm hover:text-[#FFEFCB] transition-colors"
                  >
                    {item}
                  </a>
                </li>
              ))}
            </ul>
          </div>

          {/* Legal */}
          <div className="col-span-12 md:col-span-3">
            <h4 style={{ color: "#FFEFCB", fontFamily: "'Playfair Display', serif" }} className="font-semibold mb-4">
              Legal & Kontak
            </h4>
            <ul className="space-y-2">
              {["Kebijakan Privasi", "Syarat & Ketentuan", "Kontak Kami", "FAQ"].map((item) => (
                <li key={item}>
                  <a href="#" style={{ color: "#E8F5E9" }} className="text-sm hover:text-[#FFEFCB] transition-colors">
                    {item}
                  </a>
                </li>
              ))}
            </ul>
            <div className="mt-5 p-4 rounded-xl" style={{ backgroundColor: "rgba(255, 239, 203, 0.15)", border: "1px solid rgba(255, 239, 203, 0.3)" }}>
              <p style={{ color: "#F9A11B" }} className="text-xs font-semibold mb-1">📧 Hubungi Kami</p>
              <p style={{ color: "#E8F5E9" }} className="text-xs">hello@cooksmart.id</p>
            </div>
          </div>
        </div>

        <div style={{ borderColor: "rgba(255, 239, 203, 0.15)" }} className="border-t mt-10 pt-6 flex flex-col md:flex-row items-center justify-between gap-3">
          <p style={{ color: "#A8B5A0" }} className="text-xs">
            © 2026 Cook Smart, Waste Less. Hak cipta dilindungi.
          </p>
          <p style={{ color: "#A8B5A0" }} className="text-xs flex items-center gap-1">
            <Leaf className="w-3 h-3" style={{ color: "#F9A11B" }} />
            Dibuat dengan cinta untuk bumi yang lebih baik
          </p>
        </div>
      </div>
    </footer>
  );
}
