import styles from './../styles/GameOver.module.scss';
import { filterElByIndexes } from '../lib/filterElByIndexes';

function GameOver({ moves, time, setGameSettings, restart, score, numberOfPlayers }) {
  const isTie = score.slice(1, 4).some((point, _, arr) => point === arr[0]);

  const winnerPoint = score.reduce((acc, point) => (acc > point ? acc : point), 0);

  const winnerIndexes = score.reduce((acc, point, i) => {
    if (point === winnerPoint) acc.push(i);
    return acc;
  }, []);

  const scores = score.slice();

  filterElByIndexes(scores, winnerIndexes);

  winnerIndexes.forEach(idx => {
    scores.unshift(score[idx]);
  });

  const previousIndexes = [...winnerIndexes];
  console.log(previousIndexes);

  const formattedTime = `${Math.trunc(time / 60)}:${String(time % 60).padStart(2, '0')}`;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}></div>
        <div className={styles.wrapper}>
          <h1>You did it!</h1>
          <p className={styles.text}>Game over! Here’s how you got on…</p>

          {+numberOfPlayers === 1 && (
            <>
              <ul>
                <li>
                  <p>Time Elapsed</p>
                  <p>{formattedTime}</p>
                </li>

                <li>
                  <p>Moves Taken</p>
                  <p>{moves} Moves</p>
                </li>
              </ul>
            </>
          )}

          {+numberOfPlayers > 1 && (
            <>
              <ul>
                {scores.map((score, i) => {
                  return (
                    <li key={i}>
                      <p>
                        Player {'1'} {score === winnerPoint && '(Winner!)'}
                      </p>
                      <p>{score} Pairs</p>
                    </li>
                  );
                })}
              </ul>
            </>
          )}

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
