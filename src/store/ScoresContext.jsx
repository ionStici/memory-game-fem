import { useState, createContext } from 'react';

const ScoresContext = createContext([]);

export const ScoresContextProvider = ({ children }) => {
  //   const [scores, setScores] = useState([]);

  const [scores, setScores] = useState([
    {
      theme: 'Numbers',
      numberOfPlayers: '1',
      gridSize: '4',
      moves: 28,
      time: 45,
    },
    {
      theme: 'Icons',
      numberOfPlayers: '1',
      gridSize: '4',
      moves: 26,
      time: 31,
    },
    {
      theme: 'Numbers',
      numberOfPlayers: '3',
      gridSize: '4',
      score: [4, 0, 4],
    },
  ]);

  return <ScoresContext.Provider value={{ scores, setScores }}>{children}</ScoresContext.Provider>;
};

export default ScoresContext;
