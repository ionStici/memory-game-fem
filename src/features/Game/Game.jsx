import styles from './../../styles/Game.module.scss';

import Header from './Header';
import Dots from './Dots';
import Stats from './Stats';
import PlayersBoxes from './PlayersBoxes';
import GameOver from './GameOver';

import { useState, useRef, useEffect } from 'react';
import { useGameSettings } from '../../GameSettings';
import { shuffleArray } from '../../lib/shuffleArray';
import { generateGrid } from '../../lib/generateGrid';
import { icons } from '../../assets/icons';

function Game() {
  const { gameSettings } = useGameSettings();

  const { theme, players, grid: gridSize, tiles } = gameSettings;
  const dotsRef = useRef(null);

  const [grid, setGrid] = useState(generateGrid(theme, gridSize, icons, shuffleArray));
  const [gameOver, setGameOver] = useState(false);

  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  const [score, setScore] = useState([]);
  const [names, setNames] = useState([]);
  const [activePlayer, setActivePlayer] = useState(1);

  useEffect(() => {
    if (+players > 1) {
      setScore(Array.from({ length: +players }, () => 0));
      setNames(Array.from({ length: +players }, () => undefined));
    }
  }, [players]);

  useEffect(() => {
    if (tiles === 'Squircle' && +gridSize === 4) document.documentElement.style.setProperty('--tile-border-radius', '25px');
    if (tiles === 'Squircle' && +gridSize === 6) document.documentElement.style.setProperty('--tile-border-radius', '20px');
    if (tiles === 'Circle') document.documentElement.style.setProperty('--tile-border-radius', '50%');
  }, [tiles]);

  const generateNewGrid = () => {
    setGrid(() => generateGrid(theme, gridSize, icons, shuffleArray));
  };

  const resetGrid = () => {
    if (dotsRef.current) dotsRef.current.resetGrid();
  };

  const resetStats = () => {
    setMoves(0);
    setTime(0);
  };

  const resetScore = () => {
    setScore(Array.from({ length: +players }, () => 0));
    setActivePlayer(1);
  };

  const restart = () => {
    generateNewGrid();
    resetGrid();
    resetStats();
    setGameOver(false);
    resetScore();
  };

  return (
    <section className={styles.container}>
      <Header restart={restart} />

      <Dots
        ref={dotsRef}
        grid={grid}
        gridSize={gridSize}
        setMoves={setMoves}
        setGameOver={setGameOver}
        score={score}
        setScore={setScore}
        activePlayer={activePlayer}
        setActivePlayer={setActivePlayer}
        players={players}
      />

      {+players === 1 && <Stats moves={moves} time={time} setTime={setTime} gameOver={gameOver} />}

      {+players > 1 && (
        <PlayersBoxes num={players} score={score} activePlayer={activePlayer} names={names} setNames={setNames} />
      )}

      {gameOver && <GameOver moves={moves} time={time} restart={restart} score={score} players={players} names={names} />}
    </section>
  );
}

export default Game;
