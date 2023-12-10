import styles from "./../styles/Dots.module.scss";
import { useEffect, useState } from "react";

function Dots({ grid, gridSize }) {
  const [guessedTiles, setGuessedTiles] = useState(
    Array.from({ length: grid.length }, () => false)
  );

  const [tile1, setTile1] = useState(undefined);
  const [tile2, setTile2] = useState(undefined);

  const gridStyles = {
    gridTemplateColumns: `repeat(${
      +gridSize === 4 ? "4, minmax(0, 118px)" : "6, minmax(0, 82px)"
    })`,
    gridTemplateRows: `repeat(${
      +gridSize === 4 ? "4, minmax(0, 118px)" : "6, minmax(0, 82px)"
    })`,
    gap: `${+gridSize === 4 ? "12.3px" : "9.1px"}`,
  };

  function resetTiles() {
    setTile1(undefined);
    setTile2(undefined);
  }

  function handleDotClick(target) {
    if (guessedTiles.every((tile) => tile)) return;

    const tile = target.dataset.tile;

    if (!tile1) {
      setTile1(tile);
      return;
    }

    if (!tile2) {
      setTile2(tile);
      return;
    }
  }

  useEffect(() => {
    if (tile1 && tile2 && grid[+tile1] !== grid[+tile2]) {
      setTimeout(() => resetTiles(), 250);
    }

    if (tile1 && tile2 && grid[+tile1] === grid[+tile2]) {
      setGuessedTiles((prev) => {
        const arr = [...prev];
        arr[+tile1] = true;
        arr[+tile2] = true;
        return arr;
      });

      resetTiles();
    }
  }, [tile1, tile2]);

  const tileYellowStyles = {
    backgroundColor: "#FDA214",
  };

  const tileGreyStyles = {
    backgroundColor: "#BCCED9",
  };

  const opacityStyles = {
    opacity: 1,
  };

  return (
    <div className={styles.wrapper}>
      <ul className={styles.ul} style={gridStyles}>
        {grid.map((dot, i) => {
          return (
            <li
              key={i}
              data-tile={i}
              onClick={({ target }) =>
                !(+tile1 === i || +tile2 === i || guessedTiles[i]) &&
                handleDotClick(target)
              }
              style={
                +tile1 === i || +tile2 === i
                  ? tileYellowStyles
                  : guessedTiles[i]
                  ? tileGreyStyles
                  : {}
              }
            >
              <span
                style={
                  +tile1 === i || +tile2 === i || guessedTiles[i]
                    ? opacityStyles
                    : {}
                }
              >
                {+tile1 === i && dot}
                {+tile2 === i && dot}
                {guessedTiles[i] && dot}
              </span>
            </li>
          );
        })}
      </ul>
    </div>
  );
}

export default Dots;
