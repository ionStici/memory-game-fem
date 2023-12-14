import StartGame from './components/StartGame/StartGame';
import Game from './components/Game/Game';
import React from 'react';

function App() {
  const [gameSettings, setGameSettings] = React.useState(null);
  const [showScores, setShowScores] = React.useState(false);

  return (
    <main>
      {!gameSettings && (
        <StartGame
          setGameSettings={setGameSettings}
          setShowScores={setShowScores}
          showScores={showScores}
        />
      )}
      {gameSettings && <Game gameSettings={gameSettings} setGameSettings={setGameSettings} />}
    </main>
  );
}

export default App;
