import styles from './../../styles/Scores.module.scss';
import ScoresContext from '../../store/ScoresContext';
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
            <img src="/arrow.svg" alt="" />
          </button>
          {!(data.length === 0) && <button onClick={clearHistory}>Clear</button>}
        </div>

        {data.length === 0 && (
          <>
            <p className={styles.message}>🎾 You don't have any previous games</p>
            <p className={styles.message}>📝 Your game scores will be listed here</p>
          </>
        )}

        <ul className={styles.ul}>
          {data.map((score, i, arr) => {
            let biggestScore, biggestTime, biggestMoves;

            if (+score.numberOfPlayers > 1) {
              biggestScore = score.score.reduce((acc, point) => {
                return acc > point ? acc : point;
              }, 0);
            }

            if (+score.numberOfPlayers === 1) {
              biggestTime = arr
                .filter(score => score.time)
                .reduce(({ time }, arr) => {
                  return time < arr.time ? time : arr.time;
                });

              biggestMoves = arr
                .filter(score => score.moves)
                .reduce(({ moves }, arr) => {
                  return moves < arr.moves ? moves : arr.moves;
                });
            }

            const formattedTime = `${Math.trunc(score.time / 60)}:${score.time % 60}`;

            return (
              <li key={i}>
                <table>
                  <thead>
                    <tr>
                      <th>Game</th>
                      {/* <th>Theme</th> */}
                      {/* <th>Players</th> */}
                      {+score.numberOfPlayers === 1 && (
                        <>
                          <th>Grid</th>
                          <th>Time</th>
                          <th>Moves</th>
                        </>
                      )}
                      {+score.numberOfPlayers > 1 && (
                        <>
                          {score.score.map((_, i) => {
                            return (
                              <th key={i}>
                                {!score.names[i] && `P${i + 1}`}
                                {score.names[i] && score.names[i]}
                              </th>
                            );
                          })}
                        </>
                      )}
                    </tr>
                  </thead>

                  <tbody>
                    <tr>
                      <th>{arr.length - i}</th>
                      {/* <th>{score.theme}</th> */}
                      {/* <th>{score.numberOfPlayers}</th> */}
                      {+score.numberOfPlayers === 1 && (
                        <>
                          <th>{+score.gridSize === 4 ? '4x4' : '6x6'}</th>
                          <th className={biggestTime === score.time ? styles.biggest : ''}>
                            {formattedTime}
                          </th>
                          <th className={biggestMoves === score.moves ? styles.biggest : ''}>
                            {score.moves}
                          </th>
                        </>
                      )}
                      {+score.numberOfPlayers > 1 && (
                        <>
                          {score.score.map((score, i) => (
                            <th key={i} className={score === biggestScore ? styles.biggest : ''}>
                              {score}
                            </th>
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
