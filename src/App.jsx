import StartGame from './components/StartGame/StartGame';
import Game from './components/Game/Game';
import { useGameSettings } from './GameSettings';

function App() {
  const { gameSettings } = useGameSettings();

  return (
    <main>
      {!gameSettings && <StartGame />}
      {/* {gameSettings && <Game gameSettings={gameSettings} setGameSettings={setGameSettings} />} */}
    </main>
  );
}

export default App;
