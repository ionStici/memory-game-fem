import StartGame from './components/StartGame';
import Game from './components/Game';
import React from 'react';

function App() {
  const [gameSettings, setGameSettings] = React.useState(null);

  //   React.useEffect(() => {
  //     setGameSettings({ theme: 'Numbers', numberOfPlayers: '1', gridSize: '4' });
  //   }, []);

  return (
    <main>
      {!gameSettings && <StartGame setGameSettings={setGameSettings} />}
      {gameSettings && <Game gameSettings={gameSettings} setGameSettings={setGameSettings} />}
    </main>
  );
}

export default App;
