import { useState, FormEvent } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Mail, Lock } from "lucide-react";
import { useAuth } from "../AuthContext";

export function Login() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    await login(email, password);
    navigate("/profil");
  };

  return (
    <div style={{ backgroundColor: "#F5F5F5", minHeight: "100vh", fontFamily: "'Inter', sans-serif" }}>
      <div className="max-w-4xl mx-auto px-8 py-20">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 items-center">
          <div>
            <p className="text-sm font-semibold" style={{ color: "#8B7355" }}>
              Selamat datang kembali!
            </p>
            <h1 className="mt-4 text-4xl font-semibold" style={{ color: "#023820", fontFamily: "'Playfair Display', serif" }}>
              Masuk ke akun Habisin
            </h1>
            <p className="mt-4 text-sm" style={{ color: "#5C4030" }}>
              Akses resep, simpan menu favorit, dan temukan rekomendasi masak hemat.
            </p>
          </div>
          <div className="rounded-3xl p-8" style={{ backgroundColor: "#FFFFFF", boxShadow: "0 18px 40px rgba(0,0,0,0.08)" }}>
            <form onSubmit={handleSubmit} className="space-y-5">
              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#3D2B1F" }}>
                  Email
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]" />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="email@domain.com"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border outline-none"
                    style={{ borderColor: "#E0E0E0", backgroundColor: "#FFFBF5", color: "#3D2B1F" }}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium mb-2" style={{ color: "#3D2B1F" }}>
                  Password
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 text-[#8B7355]" />
                  <input
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    placeholder="Masukkan password"
                    className="w-full pl-12 pr-4 py-3 rounded-2xl border outline-none"
                    style={{ borderColor: "#E0E0E0", backgroundColor: "#FFFBF5", color: "#3D2B1F" }}
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3 rounded-2xl text-white font-semibold"
                style={{ backgroundColor: "#8B5E3C" }}
              >
                Masuk
              </button>

              <p className="text-center text-sm" style={{ color: "#8B7355" }}>
                Belum punya akun? <Link to="/register" style={{ color: "#023820", fontWeight: 600 }}>Daftar</Link>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
