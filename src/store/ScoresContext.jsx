import { useState, createContext } from 'react';

const ScoresContext = createContext([]);

export const ScoresContextProvider = ({ children }) => {
  const [scores, setScores] = useState([]);
  return <ScoresContext.Provider value={{ scores, setScores }}>{children}</ScoresContext.Provider>;
};

export default ScoresContext;
