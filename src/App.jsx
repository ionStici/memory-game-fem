import StartGame from './components/StartGame';
import Game from './components/Game';
import { useState, useEffect } from 'react';

function App() {
  const [gameSettings, setGameSettings] = useState(null);

  useEffect(() => {
    setGameSettings({ theme: 'Numbers', numberOfPlayers: '1', gridSize: '4' });
  }, []);

  return (
    <main>
      {!gameSettings && <StartGame setGameSettings={setGameSettings} />}
      {gameSettings && <Game gameSettings={gameSettings} setGameSettings={setGameSettings} />}
    </main>
  );
}

export default App;
