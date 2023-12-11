import styles from './../styles/Game.module.scss';
import { useState, useRef } from 'react';
import { shuffleArray } from '../lib/shuffleArray';
import { icons } from '../data/icons';
import Dots from './Dots';
import Header from './Header';

function Game({ gameSettings, setGameSettings }) {
  const dotsRef = useRef(null);

  const { theme, numberOfPlayers, gridSize } = gameSettings;

  function generateGrid() {
    const randomIconsSet = new Set([]);

    if (gridSize === 4 && theme === 'icons') {
      while (randomIconsSet.size < 8) randomIconsSet.add(Math.floor(Math.random() * 18));
    }

    const randomIcons = [...randomIconsSet];

    return shuffleArray([
      ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => {
        if (theme === 'Numbers') return i;
        if (theme === 'Icons') return icons[gridSize === 4 ? randomIcons[i] : i];
      }),
      ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => {
        if (theme === 'Numbers') return i;
        if (theme === 'Icons') return icons[gridSize === 4 ? randomIcons[i] : i];
      }),
    ]);
  }

  const [grid, setGrid] = useState(generateGrid());

  function generateNewGrid() {
    setGrid(() => generateGrid());
  }

  const resetGrid = () => {
    if (dotsRef.current) {
      dotsRef.current.resetGrid();
    }
  };

  return (
    <div className={styles.wrapper}>
      <Header setGameSettings={setGameSettings} generateNewGrid={generateNewGrid} resetGrid={resetGrid} />
      <Dots grid={grid} gridSize={gridSize} ref={dotsRef} />
    </div>
  );
}

export default Game;
