import { useState } from "react";
import { icons } from "./icons";

function App() {
  const theme = "icons";
  const numberOfPlayers = 1;
  const gridSize = 4;

  const gridArray = [
    ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) =>
      theme === "numbers" ? i : icons[i]
    ),
    ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) =>
      theme === "numbers" ? i : icons[i]
    ),
  ];

  function shuffleArray(array) {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  }

  const grid = shuffleArray(gridArray);
  console.log(grid);

  // // // // //

  let tile1, tile2, idx1, idx2, pause;

  function handleClick({ target }) {
    const lis = [...target.closest("ul").querySelectorAll("li")];

    const index = +target.dataset.idx;
    const value = grid[index];

    const check = lis.every((li) => li.classList.contains("tile-paired"));

    if (check) {
      return;
    }

    if (pause) {
      return;
    }

    if (!tile1) {
      tile1 = String(value);
      idx1 = index;
      lis[index].textContent = value;
    } else if (!tile2) {
      tile2 = String(value);
      idx2 = index;
      lis[index].textContent = value;
    }

    if (tile1 && tile2 && tile1 !== tile2) {
      pause = true;

      setTimeout(() => {
        lis[idx1].textContent = "";
        lis[idx2].textContent = "";

        tile1 = undefined;
        tile2 = undefined;
        idx1 = undefined;
        idx2 = undefined;

        pause = false;
      }, 250);
    }

    if (tile1 && tile2 && tile1 === tile2) {
      pause = true;

      setTimeout(() => {
        lis[idx1].classList.add("tile-paired");
        lis[idx2].classList.add("tile-paired");

        tile1 = undefined;
        tile2 = undefined;
        idx1 = undefined;
        idx2 = undefined;

        pause = false;
      }, 150);
    }
  }

  return (
    <>
      <main>
        <img src="/logo.svg" alt="Memory Logo" />

        <ul style={{ listStyle: "none" }}>
          {grid.map((num, i) => {
            return <li key={i} onClick={handleClick} data-idx={i}></li>;
          })}
        </ul>
      </main>
    </>
  );
}

export default App;
