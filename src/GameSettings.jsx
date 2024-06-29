import { createContext, useContext, useState } from 'react';

const GameSettingsContext = createContext();

export default function GameSettingsProvider({ children }) {
  const [gameSettings, setGameSettings] = useState(null);
  return <GameSettingsContext.Provider value={{ gameSettings, setGameSettings }}>{children}</GameSettingsContext.Provider>;
}

export function useGameSettings() {
  const context = useContext(GameSettingsContext);
  if (!context) throw new Error('Settings Context Error');
  return context;
}
