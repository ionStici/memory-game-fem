import styles from './../styles/GameOver.module.scss';

function GameOver({ moves, time, setGameSettings, restart }) {
  return (
    <section className={styles.section}>
      <div className={styles.layout}></div>
      <div className={styles.wrapper}>
        <h1>You did it!</h1>
        <p>Game over! Here’s how you got on…</p>

        <div>
          <p>Time Elapsed</p>
          <time>{'1:53'}</time>
        </div>

        <div>
          <p>Moves Taken</p>
          <p>{'39'} Moves</p>
        </div>

        <button onClick={restart}>Restart</button>
        <button onClick={() => setGameSettings(null)}>Setup New Game</button>
      </div>
    </section>
  );
}

export default GameOver;
