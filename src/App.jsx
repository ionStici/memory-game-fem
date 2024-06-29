import StartGame from './components/StartGame/StartGame';
// import Game from './components/Game/Game';
import { useGameSettings } from './GameSettings';

function App() {
  const { play } = useGameSettings();

  return (
    <main>
      {!play && <StartGame />}
      {/* <Game gameSettings={gameSettings} setGameSettings={setGameSettings} /> */}
    </main>
  );
}

export default App;
