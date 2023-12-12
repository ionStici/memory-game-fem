import styles from './../styles/Score.module.scss';
import ScoresContext from '../store/ScoresContext';
import { useContext } from 'react';

function Score() {
  const { scores, setScores } = useContext(ScoresContext);
  console.log(scores);

  const clearHistory = () => {
    setScores([]);
  };

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}></div>
    </section>
  );
}

export default Score;
