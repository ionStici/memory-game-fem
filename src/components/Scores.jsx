import styles from './../styles/Scores.module.scss';
import ScoresContext from '../store/ScoresContext';
import { useContext } from 'react';

function Scores({ setShowScores }) {
  const { scores, setScores } = useContext(ScoresContext);

  console.log(scores);

  const clearHistory = () => {
    setScores([]);
  };

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div>
          <button onClick={() => setShowScores(false)}>Back</button>
          <button onClick={clearHistory}>Clear Scores</button>
        </div>

        <div>
          {scores.map((score, i) => {
            return <div key={i}>{i}</div>;
          })}
        </div>
      </div>
    </section>
  );
}

export default Scores;
