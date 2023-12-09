import { useState } from "react";
import { shuffleArray } from "../lib/shuffleArray";
import { icons } from "../data/icons";
import Dots from "./Dots";

function Game({ gameSettings }) {
  const { theme, numberOfPlayers, gridSize } = gameSettings;

  const [grid, _] = useState(() => {
    const randomIconsSet = new Set([]);

    if (gridSize === 4 && theme === "icons") {
      while (randomIconsSet.size < 8)
        randomIconsSet.add(Math.floor(Math.random() * 18));
    }

    const randomIcons = [...randomIconsSet];

    return shuffleArray([
      ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => {
        if (theme === "Numbers") return i;
        if (theme === "Icons")
          return icons[gridSize === 4 ? randomIcons[i] : i];
      }),
      ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => {
        if (theme === "Numbers") return i;
        if (theme === "Icons")
          return icons[gridSize === 4 ? randomIcons[i] : i];
      }),
    ]);
  });

  return (
    <>
      <Dots grid={grid} gridSize={gridSize} />
    </>
  );
}

export default Game;
