import { Link } from "react-router-dom";
import { Clock, ChefHat, Wallet, Heart } from "lucide-react";
import { Recipe } from "../data/recipes";

interface RecipeCardProps {
  recipe: Recipe;
  compact?: boolean;
  isFavorite?: boolean;
  onFavorite?: () => void;
}

const difficultyColor: Record<string, string> = {
  Mudah: "#6B7C45",
  Sedang: "#C4872A",
  Sulit: "#B84040",
};

export function RecipeCard({ recipe, compact = false, isFavorite = false, onFavorite }: RecipeCardProps) {
  const handleFavorite = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    onFavorite?.();
  };
  return (
    <Link
      to={`/resep/${recipe.id}`}
      className="block group rounded-2xl overflow-hidden transition-all duration-300 hover:-translate-y-1"
      style={{
        backgroundColor: "#FFFBF5",
        boxShadow: "0 2px 12px rgba(44, 24, 16, 0.08)",
        border: "1px solid rgba(212, 169, 106, 0.15)",
        fontFamily: "'Inter', sans-serif",
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 30px rgba(44, 24, 16, 0.15)";
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.boxShadow = "0 2px 12px rgba(44, 24, 16, 0.08)";
      }}
    >
      {/* Image */}
      <div className="relative overflow-hidden" style={{ height: compact ? "160px" : "200px" }}>
        <img
          src={recipe.image}
          alt={recipe.name}
          className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
        />
        <div className="absolute inset-0" style={{ background: "linear-gradient(to top, rgba(44,24,16,0.4) 0%, transparent 50%)" }} />
        {/* Country badge */}
        <div
          className="absolute top-3 left-3 flex items-center gap-1 px-2 py-1 rounded-full text-xs"
          style={{ backgroundColor: "rgba(253, 246, 236, 0.9)", color: "#3D2B1F" }}
        >
          <span>{recipe.flag}</span>
          <span className="font-medium">{recipe.origin}</span>
        </div>
        {/* Difficulty badge */}
        <div
          className="absolute top-3 right-3 px-2 py-1 rounded-full text-xs font-semibold"
          style={{
            backgroundColor: difficultyColor[recipe.difficulty] + "22",
            color: difficultyColor[recipe.difficulty],
            border: `1px solid ${difficultyColor[recipe.difficulty]}44`,
            backdropFilter: "blur(4px)",
          }}
        >
          {recipe.difficulty}
        </div>
        {/* Favorite button */}
        <button
          onClick={handleFavorite}
          className="absolute bottom-3 right-3 w-8 h-8 rounded-full flex items-center justify-center transition-all"
          style={{
            backgroundColor: isFavorite ? "#EE3F24" : "rgba(255, 255, 255, 0.9)",
            border: "1px solid rgba(0, 0, 0, 0.1)",
          }}
        >
          <Heart className={`w-4 h-4 ${isFavorite ? 'fill-white text-white' : 'text-gray-600'}`} />
        </button>
      </div>

      {/* Content */}
      <div className="p-4">
        <h3
          className="mb-1 line-clamp-1"
          style={{ fontFamily: "'Playfair Display', serif", color: "#3D2B1F", fontSize: "17px" }}
        >
          {recipe.name}
        </h3>
        {!compact && (
          <p className="text-xs mb-3 line-clamp-2" style={{ color: "#8B7355" }}>
            {recipe.description}
          </p>
        )}

        {/* Meta */}
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="flex items-center gap-1">
              <Clock className="w-3.5 h-3.5" style={{ color: "#8B7355" }} />
              <span className="text-xs" style={{ color: "#8B7355" }}>{recipe.cookTime}</span>
            </div>
          </div>
          <div className="flex items-center gap-1">
            <Wallet className="w-3.5 h-3.5" style={{ color: "#6B7C45" }} />
            <span className="text-xs font-semibold" style={{ color: "#6B7C45" }}>
              Rp {recipe.pricePerServing.toLocaleString("id-ID")}
            </span>
          </div>
        </div>

        {/* Tags */}
        <div className="flex flex-wrap gap-1 mt-3">
          {recipe.tags.slice(0, 2).map((tag) => (
            <span
              key={tag}
              className="text-xs px-2 py-0.5 rounded-full"
              style={{ backgroundColor: "#F5ECD7", color: "#8B5E3C" }}
            >
              {tag}
            </span>
          ))}
        </div>
      </div>
    </Link>
  );
}
