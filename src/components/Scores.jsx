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
          <button onClick={clearHistory}>Clear</button>
        </div>

        <ul className={styles.ul}>
          {data.map((score, i, arr) => {
            return (
              <li key={i}>
                <div>
                  <p>Game</p>
                  <p>{arr.length - i}</p>
                </div>

                <div>
                  <p>Theme</p>
                  <p>{score.theme}</p>
                </div>

                <div>
                  <p>Players</p>
                  <p>{score.numberOfPlayers}</p>
                </div>

                <div>
                  <p>Grid Size</p>
                  <p>{score.gridSize}</p>
                </div>

                {+score.numberOfPlayers === 1 && (
                  <>
                    <div>
                      <p>Time</p>
                      <p>{score.time}</p>
                    </div>

                    <div>
                      <p>Moves</p>
                      <p>{score.moves}</p>
                    </div>
                  </>
                )}

                {+score.numberOfPlayers > 1 && (
                  <>
                    {score.score.map((score, i) => {
                      return (
                        <div key={i}>
                          <p>P{i + 1}</p>
                          <p>{score}</p>
                        </div>
                      );
                    })}
                  </>
                )}
              </li>
            );
          })}
        </ul>
      </div>
    </section>
  );
}

export default Scores;
