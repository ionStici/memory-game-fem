import styles from './../styles/Scores.module.scss';
import ScoresContext from '../store/ScoresContext';
import { useContext } from 'react';

function Scores({ setShowScores }) {
  const { scores, setScores } = useContext(ScoresContext);

  const data = scores.slice().reverse();

  const clearHistory = () => setScores([]);

  return (
    <section className={styles.section}>
      <div className={styles.container}>
        <div className={styles.btns_wrapper}>
          <button onClick={() => setShowScores(false)}>
            <img src="/arrow-back.svg" alt="" />
          </button>

          {!(data.length === 0) && <button onClick={clearHistory}>Clear</button>}
        </div>

        {data.length === 0 ? (
          <>
            <p className={styles.message}>🎾 You don't have any previous games</p>
            <p className={styles.message}>📝 Your game scores will be listed here</p>
          </>
        ) : (
          ''
        )}

        <ul className={styles.ul}>
          {data.map((score, i, arr) => {
            return (
              <li key={i}>
                <table>
                  <thead>
                    <tr>
                      <th>Game</th>

                      <th>Theme</th>
                      <th>Players</th>
                      <th>Grid</th>

                      {+score.numberOfPlayers === 1 && (
                        <>
                          <th>Time</th>
                          <th>Moves</th>
                        </>
                      )}

                      {+score.numberOfPlayers > 1 && (
                        <>
                          {score.score.map((_, i) => (
                            <th key={i}>P{i + 1}</th>
                          ))}
                        </>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th>{arr.length - i}</th>

                      <th>{score.theme}</th>
                      <th>{score.numberOfPlayers}</th>
                      <th>{score.gridSize}</th>

                      {+score.numberOfPlayers === 1 && (
                        <>
                          <th>{score.time}</th>
                          <th>{score.moves}</th>
                        </>
                      )}

                      {+score.numberOfPlayers > 1 && (
                        <>
                          {score.score.map((score, i) => (
                            <th key={i}>{score}</th>
                          ))}
                        </>
                      )}
                    </tr>
                  </tbody>
                </table>
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Scores;
