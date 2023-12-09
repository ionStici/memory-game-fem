import StartGame from "./components/StartGame";
import { useState } from "react";

function App() {
  const [gameSettings, setGameSettings] = useState(null);
  console.log(gameSettings);

  return (
    <main>
      {!gameSettings && <StartGame setGameSettings={setGameSettings} />}
    </main>
  );
}

export default App;
