import styles from './../../styles/StartGame.module.scss';
import Scores from './Scores';
import Layout from './Layout';
import { useState, useEffect } from 'react';

function StartGame({ setGameSettings }) {
  const [showScores, setShowScores] = useState(false);

  function handleActiveStates({ target }) {
    if (target.nodeName !== 'BUTTON') return;
    if (target.classList.contains(styles.active)) return;

    const btns = [...target.closest('div').querySelectorAll('button')];
    btns.forEach(btn => btn.classList.remove(styles.active));
    target.classList.add(styles.active);
  }

  function handleStartGame({ target }) {
    const divs = [...target.closest(`.${styles.section}`).querySelectorAll(`.${styles.box}`)];

    const theme = [...divs[0].querySelectorAll('button')].find(btn =>
      btn.classList.contains(styles.active)
    ).textContent;
    const numberOfPlayers = [...divs[1].querySelectorAll('button')].find(btn =>
      btn.classList.contains(styles.active)
    ).textContent;
    const gridSize = [...divs[2].querySelectorAll('button')].find(btn =>
      btn.classList.contains(styles.active)
    ).textContent[0];
    const tilesShape = [...divs[3].querySelectorAll('button')].find(btn =>
      btn.classList.contains(styles.active)
    ).textContent;

    setGameSettings({ theme, numberOfPlayers, gridSize, tilesShape });
  }

  useEffect(() => {
    document.body.style.setProperty('background-color', '#152938');
    return () => document.body.style.setProperty('background-color', '#FCFCFC');
  }, []);

  if (showScores) {
    return (
      <Layout>
        <Scores setShowScores={setShowScores} />
      </Layout>
    );
  }

  return (
    <Layout>
      <h1>Memory Game</h1>
      <div className={styles.container}>
        <div className={styles.box}>
          <p>Select Theme</p>
          <div onClick={handleActiveStates}>
            <button className={styles.active}>Numbers</button>
            <button>Icons</button>
          </div>
        </div>

        <div className={styles.box}>
          <p>Number of Players</p>
          <div onClick={handleActiveStates} className={styles.nums}>
            {Array.from({ length: 4 }, () => null).map((_, i) => (
              <button key={i} className={i === 0 ? styles.active : ''}>
                {i + 1}
              </button>
            ))}
          </div>
        </div>

        <div className={styles.box}>
          <p>Grid Size</p>
          <div onClick={handleActiveStates}>
            <button className={styles.active}>4x4</button>
            <button>6x6</button>
          </div>
        </div>

        <div className={styles.box}>
          <p>Tiles Shape</p>
          <div onClick={handleActiveStates}>
            <button className={styles.active}>Circle</button>
            <button>Squircle</button>
          </div>
        </div>

        <div className={styles.btns_wrapper}>
          <button onClick={handleStartGame} className={styles.btn_start}>
            Start Game
          </button>
          <button
            className={styles.scores_btn}
            onClick={() => setShowScores(true)}
            aria-label="See Previous Game Results"
          >
            <img src="/reader.svg" alt="" />
          </button>
        </div>
      </div>
    </Layout>
  );
}

export default StartGame;
