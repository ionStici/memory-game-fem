import { useState, useRef, useEffect } from 'react';

import { shuffleArray } from '../../lib/shuffleArray';
import { generateGrid } from '../../lib/generateGrid';
import { icons } from '../../data/icons';
import styles from './../../styles/Game.module.scss';
import Dots from './Dots';
import Header from './Header';
import Stats from './Stats';
import GameOver from './GameOver';
import PlayersBoxes from './PlayersBoxes';

function Game({ gameSettings, setGameSettings }) {
  // // // // // // // // // // // // // // // // // // // //

  // { theme, numberOfPlayers, gridSize, tilesShape };

  const { theme, numberOfPlayers, gridSize, tilesShape } = gameSettings;
  const dotsRef = useRef(null);

  const [grid, setGrid] = useState(generateGrid(theme, gridSize, icons, shuffleArray));
  const [gameOver, setGameOver] = useState(false);

  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  // // // // // // // // // // // // // // // // // // // //

  const [score, setScore] = useState([]);
  const [names, setNames] = useState([]);
  const [activePlayer, setActivePlayer] = useState(1);

  useEffect(() => {
    if (+numberOfPlayers > 1) {
      setScore(Array.from({ length: +numberOfPlayers }, () => 0));
      setNames(Array.from({ length: +numberOfPlayers }, () => undefined));
    }
  }, [numberOfPlayers]);

  // // // // // // // // // // // // // // // // // // // //

  useEffect(() => {
    if (tilesShape === 'Squircle' && +gridSize === 4)
      document.documentElement.style.setProperty('--tile-border-radius', '25px');
    if (tilesShape === 'Squircle' && +gridSize === 6)
      document.documentElement.style.setProperty('--tile-border-radius', '20px');
    if (tilesShape === 'Circle') document.documentElement.style.setProperty('--tile-border-radius', '50%');
  }, [tilesShape]);

  // // // // // // // // // // // // // // // // // // // //

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
    setScore(Array.from({ length: +numberOfPlayers }, () => 0));
    setActivePlayer(1);
  };

  const restart = () => {
    generateNewGrid();
    resetGrid();
    resetStats();
    setGameOver(false);
    resetScore();
  };

  // // // // // // // // // // // // // // // // // // // //

  return (
    <section className={styles.container}>
      <Header setGameSettings={setGameSettings} restart={restart} />

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
        numberOfPlayers={numberOfPlayers}
      />

      {+numberOfPlayers === 1 && <Stats moves={moves} time={time} setTime={setTime} gameOver={gameOver} />}

      {+numberOfPlayers > 1 && (
        <PlayersBoxes num={numberOfPlayers} score={score} activePlayer={activePlayer} names={names} setNames={setNames} />
      )}

      {gameOver && (
        <GameOver
          moves={moves}
          time={time}
          setGameSettings={setGameSettings}
          restart={restart}
          score={score}
          numberOfPlayers={numberOfPlayers}
          names={names}
        />
      )}
    </section>
  );
}

export default Game;
