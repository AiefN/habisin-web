import { createContext, useContext, useState, useEffect, ReactNode } from 'react';

interface Achievement {
  title: string;
  desc: string;
  icon: string;
  earned: boolean;
}

interface User {
  id?: string;
  name: string;
  email: string;
  bio?: string;
  location?: string;
  avatar?: string;
  favorites?: string[];
  saved?: string[];
  achievements?: Achievement[];
  cookedCount?: number;
  wasteSaved?: number;
  totalSaved?: number;
  created_at?: string;
  updated_at?: string;
}

interface AuthContextType {
  user: User | null;
  login: (email: string, password: string) => Promise<void>;
  register: (name: string, email: string, password: string) => Promise<void>;
  logout: () => void;
  updateProfile: (updates: Partial<User>) => Promise<void>;
  toggleFavorite: (recipeId: string) => Promise<void>;
  toggleSaved: (recipeId: string) => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

const API_BASE = window.location.hostname === 'localhost' 
  ? 'http://localhost:5000/api' 
  : '/api';

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);

  useEffect(() => {
    const storedEmail = localStorage.getItem('userEmail');
    if (storedEmail) {
      // Fetch user from API
      fetchUser(storedEmail);
    }
  }, []);

  const fetchUser = async (email: string) => {
    try {
      const response = await fetch(`${API_BASE}/users/${email}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
      }
    } catch (error) {
      console.error('Failed to fetch user:', error);
    }
  };

  const defaultAchievements: Achievement[] = [
    { title: "Chef Pemula", desc: "Masak 10 resep pertama", icon: "🍳", earned: false },
    { title: "Zero Waste Hero", desc: "Manfaatkan 5 sisa bahan", icon: "♻️", earned: false },
    { title: "Budget Master", desc: "Masak 20 resep hemat", icon: "💰", earned: false },
    { title: "World Explorer", desc: "Coba masakan 5 negara", icon: "🌍", earned: false },
  ];

  const login = async (email: string, password: string) => {
    try {
      const response = await fetch(`${API_BASE}/users/${email}`);
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('userEmail', email);
      } else {
        // If user not found, create a mock user (for demo)
        const mockUser: User = {
          name: 'User Name',
          email,
          favorites: [],
          saved: [],
          achievements: defaultAchievements,
          cookedCount: 0,
          wasteSaved: 0,
          totalSaved: 0,
        };
        await register(mockUser.name, email, password);
      }
    } catch (error) {
      console.error('Login failed:', error);
    }
  };

  const register = async (name: string, email: string, password: string) => {
    try {
      const newUser: User = {
        name,
        email,
        favorites: [],
        saved: [],
        achievements: defaultAchievements,
        cookedCount: 0,
        wasteSaved: 0,
        totalSaved: 0,
      };
      const response = await fetch(`${API_BASE}/users`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newUser),
      });
      if (response.ok) {
        const userData = await response.json();
        setUser(userData);
        localStorage.setItem('userEmail', email);
      }
    } catch (error) {
      console.error('Register failed:', error);
    }
  };

  const updateProfile = async (updates: Partial<User>) => {
    if (user) {
      try {
        const response = await fetch(`${API_BASE}/users/${user.email}`, {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify(updates),
        });
        if (response.ok) {
          const updatedUser = await response.json();
          setUser(updatedUser);
        }
      } catch (error) {
        console.error('Update profile failed:', error);
      }
    }
  };

  const toggleFavorite = async (recipeId: string) => {
    if (user) {
      const favorites = user.favorites || [];
      const updatedFavorites = favorites.includes(recipeId)
        ? favorites.filter(id => id !== recipeId)
        : [...favorites, recipeId];
      await updateProfile({ favorites: updatedFavorites });
    }
  };

  const toggleSaved = async (recipeId: string) => {
    if (user) {
      const saved = user.saved || [];
      const updatedSaved = saved.includes(recipeId)
        ? saved.filter(id => id !== recipeId)
        : [...saved, recipeId];
      await updateProfile({ saved: updatedSaved });
    }
  };

  const logout = () => {
    setUser(null);
    localStorage.removeItem('userEmail');
  };

  return (
    <AuthContext.Provider value={{ user, login, register, logout, updateProfile, toggleFavorite, toggleSaved }}>
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}