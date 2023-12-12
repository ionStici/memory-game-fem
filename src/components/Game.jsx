import { useState, useRef, useEffect } from 'react';
import { useContext } from 'react';
import { shuffleArray } from '../lib/shuffleArray';
import { generateGrid } from '../lib/generateGrid';
import { icons } from '../data/icons';
import styles from './../styles/Game.module.scss';
import Dots from './Dots';
import Header from './Header';
import Stats from './Stats';
import GameOver from './GameOver';
import PlayersBoxes from './PlayersBoxes';
import ScoresContext from '../store/ScoresContext';

function Game({ gameSettings, setGameSettings }) {
  const { _, setScores } = useContext(ScoresContext);

  const { theme, numberOfPlayers, gridSize } = gameSettings;
  const dotsRef = useRef(null);

  const [grid, setGrid] = useState(generateGrid(theme, gridSize, icons, shuffleArray));
  const [gameOver, setGameOver] = useState(false);

  const [moves, setMoves] = useState(0);
  const [time, setTime] = useState(0);

  // // // // // // // // // // // // // // // // // // // //

  const [score, setScore] = useState([]);
  const [activePlayer, setActivePlayer] = useState(1);

  useEffect(() => {
    if (+numberOfPlayers > 1) setScore(Array.from({ length: +numberOfPlayers }, () => 0));
  }, [numberOfPlayers]);

  // // // // // // // // // // // // // // // // // // // //

  useEffect(() => {
    if (+numberOfPlayers === 1 && gameOver) {
      const game = { theme, numberOfPlayers, gridSize, moves, time };
      setScores(prev => [...prev, game]);
    }

    if (+numberOfPlayers > 1 && gameOver) {
      const game = { theme, numberOfPlayers, gridSize, score };
      setScores(prev => [...prev, game]);
    }
  }, [gameOver]);

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

      {+numberOfPlayers === 1 && (
        <Stats moves={moves} time={time} setTime={setTime} gameOver={gameOver} />
      )}

      {+numberOfPlayers > 1 && (
        <PlayersBoxes num={numberOfPlayers} score={score} activePlayer={activePlayer} />
      )}

      {gameOver && (
        <GameOver
          moves={moves}
          time={time}
          setGameSettings={setGameSettings}
          restart={restart}
          score={score}
          numberOfPlayers={numberOfPlayers}
        />
      )}
    </section>
  );
}

export default Game;
