import React, { createContext, useContext, useState, useEffect } from "react";
import { GameItem, INITIAL_GAMES_DATA } from "./initialGamesData";

interface GamesContextType {
  games: GameItem[];
  addGame: (item: GameItem) => void;
  updateGame: (id: string, updates: Partial<GameItem>) => void;
  removeGame: (id: string) => void;
  adminResetGames: () => void; 
}

const GamesContext = createContext<GamesContextType | undefined>(undefined);

export const useGames = () => {
  const context = useContext(GamesContext);
  if (!context) throw new Error("useGames must be used within GamesProvider");
  return context;
};

// Initial state load synchronously to avoid layout flicker
const getInitialGamesState = (): GameItem[] => {
  try {
    const stored = localStorage.getItem("al-lord-games-data");
    if (stored) {
      return JSON.parse(stored) as GameItem[];
    }
  } catch {}
  return INITIAL_GAMES_DATA;
};

export const GamesProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [games, setGames] = useState<GameItem[]>(getInitialGamesState);

  const saveToStorage = (newGames: GameItem[]) => {
    setGames(newGames);
    localStorage.setItem("al-lord-games-data", JSON.stringify(newGames));
  };

  const addGame = (item: GameItem) => {
    saveToStorage([...games, item]);
  };

  const updateGame = (id: string, updates: Partial<GameItem>) => {
    const updated = games.map((g) => (g.id === id ? { ...g, ...updates } : g));
    saveToStorage(updated);
  };

  const removeGame = (id: string) => {
    saveToStorage(games.filter((g) => g.id !== id));
  };

  const adminResetGames = () => {
    saveToStorage(INITIAL_GAMES_DATA);
  };

  return (
    <GamesContext.Provider value={{ games, addGame, updateGame, removeGame, adminResetGames }}>
      {children}
    </GamesContext.Provider>
  );
};
