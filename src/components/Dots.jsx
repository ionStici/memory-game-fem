import styles from "./Dots.module.scss";
import { useEffect, useState } from "react";

import { icons } from "./data/icons";
import { shuffleArray } from "./lib/shuffleArray";

function Dots({ grid, theme }) {
  const numberOfPlayers = 1; // 1 2 3 4
  //   const theme = "icons";
  const theme = "nums";
  //   const gridSize = 6;
  const gridSize = 4;

  const randomIconsSet = new Set([]);

  if (gridSize === 4 && theme === "icons") {
    while (randomIconsSet.size < 8)
      randomIconsSet.add(Math.floor(Math.random() * 18));
  }

  const randomIcons = [...randomIconsSet];

  const grid = shuffleArray([
    ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => {
      if (theme === "nums") return i;
      if (theme === "icons") return icons[gridSize === 4 ? randomIcons[i] : i];
    }),
    ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => {
      if (theme === "nums") return i;
      if (theme === "icons") return icons[gridSize === 4 ? randomIcons[i] : i];
    }),
  ]);

  const [tiles, setTiles] = useState([undefined, undefined]);
  const [pause, setPause] = useState(false);
  const [pairedTiles, setPairedTiles] = useState([]);

  const handleClick = ({ target }) => {
    const tile = target.dataset.tile;

    if (!tiles[0] || !tiles[1]) {
      setTiles((prev) => {
        if (!prev[0]) {
          const newTiles = [...prev];
          newTiles[0] = tile;
          return newTiles;
        }
        if (!prev[1]) {
          const newTiles = [...prev];
          newTiles[1] = tile;
          return newTiles;
        }
      });
    }
  };

  useEffect(() => {
    let tile1, tile2;
    if (tiles[0]) tile1 = String(grid[tiles[0]]);
    if (tiles[1]) tile2 = String(grid[tiles[1]]);

    console.log(tile1);
    console.log(tile2);

    if (tile1 && tile2 && tile1 !== tile2) {
      if (pause) return;
      setPause(true);
      setTimeout(() => {
        setTiles([undefined, undefined]);
        setPause(false);
      }, 250);
    }

    if (tile1 && tile2 && tile1 === tile2) {
      setPairedTiles((prev) => {
        const newTiles = [...prev];
        newTiles.push(+tile1, +tile2);
      });
      setTiles([undefined, undefined]);
      console.log("=");
    }
  }, [tiles]);

  return (
    <ul className={styles.ul}>
      {grid.map((tile, i) => {
        return (
          <li key={i} data-tile={i} onClick={handleClick}>
            {theme === "nums" && (+tiles[0] === i || +tiles[1] === i)
              ? tile
              : ""}

            {pairedTiles}
            {theme === "icons" && true && tile}
          </li>
        );
      })}
    </ul>
  );
}

export default Dots;
