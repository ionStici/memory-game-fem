function App() {
  const theme = "numbers";
  const numberOfPlayers = 1;
  const gridSize = 4;

  const gridArray = [
    ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => i),
    ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => i),
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const grid = shuffleArray(gridArray);

  return (
    <>
      <main>
        <img src="/logo.svg" alt="Memory Logo" />
      </main>
    </>
  );
}

export default App;
