import styles from './../styles/Game.module.scss';
import { useState, useRef, useEffect } from 'react';
import { shuffleArray } from '../lib/shuffleArray';
import { icons } from '../data/icons';
import Dots from './Dots';
import Header from './Header';
import Stats from './Stats';
import GameOver from './GameOver';
import PlayersBoxes from './PlayersBoxes';

function Game({ gameSettings, setGameSettings }) {
  const dotsRef = useRef(null);

  const [gameOver, setGameOver] = useState(false);

  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  //   useEffect(() => { if (gameOver) { console.log(gameOver); } }, [gameOver]);

  const { theme, numberOfPlayers, gridSize } = gameSettings;

  // // // // //

  const [score, setScore] = useState([]);
  const [activePlayer, setActivePlayer] = useState(1);

  useEffect(() => {
    if (+numberOfPlayers > 1) setScore(Array.from({ length: +numberOfPlayers }, () => 0));
  }, [numberOfPlayers]);

  // // // // //

  function generateGrid() {
    const randomIconsSet = new Set([]);

    if (+gridSize === 4 && theme === 'Icons') {
      while (randomIconsSet.size < 8) randomIconsSet.add(Math.floor(Math.random() * 18));
    }

    const randomIcons = [...randomIconsSet];

    return shuffleArray([
      ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => {
        if (theme === 'Numbers') return i;
        if (theme === 'Icons') return icons[+gridSize === 4 ? randomIcons[i] : i];
      }),
      ...Array.from({ length: (gridSize * gridSize) / 2 }, (_, i) => {
        if (theme === 'Numbers') return i;
        if (theme === 'Icons') return icons[+gridSize === 4 ? randomIcons[i] : i];
      }),
    ]);
  }

  const [grid, setGrid] = useState(generateGrid());

  const generateNewGrid = () => {
    setGrid(() => generateGrid());
  };

  const resetGrid = () => {
    if (dotsRef.current) {
      dotsRef.current.resetGrid();
    }
  };

  const resetStats = () => {
    setMoves(0);
    setTime(0);
  };

  const restart = () => {
    generateNewGrid();
    resetGrid();
    resetStats();
    setGameOver(false);
  };

  return (
    <section className={styles.wrapper}>
      <Header setGameSettings={setGameSettings} restart={restart} />
      <Dots
        grid={grid}
        gridSize={gridSize}
        ref={dotsRef}
        setMoves={setMoves}
        setGameOver={setGameOver}
        score={score}
        setScore={setScore}
        activePlayer={activePlayer}
        setActivePlayer={setActivePlayer}
        numberOfPlayers={numberOfPlayers}
      />
      {+numberOfPlayers === 1 && <Stats moves={moves} time={time} setTime={setTime} gameOver={gameOver} />}
      {+numberOfPlayers > 1 && <PlayersBoxes num={numberOfPlayers} score={score} activePlayer={activePlayer} />}
      {gameOver && <GameOver moves={moves} time={time} setGameSettings={setGameSettings} restart={restart} />}
    </section>
  );
}

export default Game;
