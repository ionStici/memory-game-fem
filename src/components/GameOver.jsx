import styles from './../styles/GameOver.module.scss';

function GameOver({ moves, time, setGameSettings, restart, score, numberOfPlayers }) {
  const formattedTime = `${Math.trunc(time / 60)}:${String(time % 60).padStart(2, '0')}`;

  const winnerPoint = score.reduce((acc, point) => (acc > point ? acc : point), 0);

  const results = score.map((score, i) => ({ player: i + 1, score })).sort((a, b) => b.score - a.score);

  const isTie =
    score.reduce((acc, point) => {
      if (point === winnerPoint) acc.push(point);
      return acc;
    }, []).length > 1;

  let winner;
  if (!isTie) winner = score.indexOf(winnerPoint) + 1;

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.layout}></div>
        <div className={styles.wrapper}>
          <h1>{+numberOfPlayers === 1 ? 'You did it!' : isTie ? 'It’s a tie!' : `Player ${winner} Wins!`}</h1>
          <p className={styles.text}>
            {+numberOfPlayers === 1 ? 'Game over! Here’s how you got on...' : 'Game over! Here are the results...'}
          </p>

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
                {results.map((result, i) => {
                  return (
                    <li key={i} className={result.score === winnerPoint ? styles.winner : ''}>
                      <p>
                        Player {result.player} {result.score === winnerPoint && '(Winner!)'}
                      </p>
                      <p>{result.score} Pairs</p>
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
