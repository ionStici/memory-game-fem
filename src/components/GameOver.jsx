import styles from './../styles/GameOver.module.scss';

function GameOver({ moves, time, setGameSettings, restart }) {
  const formattedTime = `${Math.trunc(time / 60)}:${String(time % 60).padStart(2, '0')}`;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}></div>
        <div className={styles.wrapper}>
          <h1>You did it!</h1>
          <p className={styles.text}>Game over! Here’s how you got on…</p>

          <div className={styles.time_box}>
            <p>Time Elapsed</p>
            <p>{formattedTime}</p>
          </div>

          <div className={styles.moves_box}>
            <p>Moves Taken</p>
            <p>{moves} Moves</p>
          </div>

          <span className={styles.btns_wrapper}>
            <button className={styles.btn_restart} onClick={restart}>
              Restart
            </button>
            <button className={styles.btn_new_game} onClick={() => setGameSettings(null)}>
              Setup New Game
            </button>
          </span>
        </div>
      </div>
    </section>
  );
}

export default GameOver;
