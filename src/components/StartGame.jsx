import styles from './../styles/StartGame.module.scss';
import { logoWhite } from '../data/logo';
import { useEffect } from 'react';

function StartGame({ setGameSettings }) {
  function handleActiveStates({ target }) {
    if (target.nodeName !== 'BUTTON') return;
    if (target.classList.contains(styles.active)) return;

    const btns = [...target.closest('div').querySelectorAll('button')];
    btns.forEach(btn => btn.classList.remove(styles.active));
    target.classList.add(styles.active);
  }

  function handleStartGame({ target }) {
    const divs = [...target.closest(`.${styles.section}`).querySelectorAll('div')];

    const theme = [...divs[0].querySelectorAll('button')].find(btn => btn.classList.contains(styles.active)).textContent;
    const numberOfPlayers = [...divs[1].querySelectorAll('button')].find(btn => btn.classList.contains(styles.active)).textContent;
    const gridSize = [...divs[2].querySelectorAll('button')].find(btn => btn.classList.contains(styles.active)).textContent[0];

    setGameSettings({ theme, numberOfPlayers, gridSize });
  }

  useEffect(() => {
    document.body.style.setProperty('background-color', '#152938');
    return () => document.body.style.setProperty('background-color', '#FCFCFC');
  }, []);

  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        {logoWhite}

        <section className={styles.section}>
          <p>Select Theme</p>
          <div onClick={handleActiveStates}>
            <button className={styles.active}>Numbers</button>
            <button>Icons</button>
          </div>

          <p>Number of Players</p>
          <div onClick={handleActiveStates} className={styles.nums}>
            {Array.from({ length: 4 }, () => null).map((_, i) => (
              <button key={i} className={i === 0 ? styles.active : ''}>
                {i + 1}
              </button>
            ))}
          </div>

          <p>Grid Size</p>
          <div onClick={handleActiveStates}>
            <button className={styles.active}>4x4</button>
            <button>6x6</button>
          </div>

          <button onClick={handleStartGame} className={styles.btn_start}>
            Start Game
          </button>
        </section>
      </div>
    </div>
  );
}

export default StartGame;
