import styles from './../styles/PlayersBoxes.module.scss';

function PlayersBoxes({ num }) {
  return (
    <section className={styles.section}>
      <div className={styles.wrapper}>
        {Array.from({ length: num }, (_, i) => i + 1).map(player => {
          return (
            <div key={player} className={`${styles.box} ${player === 1 ? styles.active : ''}`}>
              <p>P{player}</p>
              <p>{'0'}</p>
            </div>
          );
        })}
      </div>
    </section>
  );
}

export default PlayersBoxes;
