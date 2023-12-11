import styles from './../styles/Stats.module.scss';
import { useEffect } from 'react';

function Stats({ moves, time, setTime }) {
  useEffect(() => {
    let timer = setInterval(() => setTime(prev => prev + 1), 1000);
    return () => clearInterval(timer);
  }, []);

  const formattedTime = `${Math.trunc(time / 60)}:${String(time % 60).padStart(2, '0')}`;

  return (
    <div className={styles.wrapper}>
      <div>
        <p className={styles.label}>Time</p>
        <time className={styles.field}>{formattedTime}</time>
      </div>
      <div>
        <p className={styles.label}>Moves</p>
        <p className={styles.field}>{moves}</p>
      </div>
    </div>
  );
}

export default Stats;
