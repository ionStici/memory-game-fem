import { useState, useEffect, createContext } from 'react';

const ScoresContext = createContext([]);

export const ScoresContextProvider = ({ children }) => {
  const [scores, setScores] = useState(() => {
    const localData = localStorage.getItem('scores');
    return localData ? JSON.parse(localData) : [];
  });

  useEffect(() => {
    localStorage.setItem('scores', JSON.stringify(scores));
  }, [scores]);

  return <ScoresContext.Provider value={{ scores, setScores }}>{children}</ScoresContext.Provider>;
};

export default ScoresContext;
