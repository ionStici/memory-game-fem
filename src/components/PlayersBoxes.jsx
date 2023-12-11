import styles from './../styles/PlayersBoxes.module.scss';
import { useState, useEffect } from 'react';

function PlayersBoxes({ num }) {
  const [less768px, setLess768px] = useState(window.matchMedia('(min-width: 768px)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = e => setLess768px(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {Array.from({ length: num }, (_, i) => i + 1).map(player => {
          return (
            <div key={player} className={`${styles.box} ${player === 1 ? styles.active : ''}`}>
              <p>{less768px ? `Player ${player}` : `P${player}`}</p>
              <p>{'0'}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PlayersBoxes;
