import styles from "./../styles/StartGame.module.scss";
import { logoWhite } from "../data/logo";

function StartGame() {
  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        {logoWhite}

        <section className={styles.section}>
          <p>SelectTheme</p>
          <div>
            <button className={styles.active}>Numbers</button>
            <button>Icons</button>
          </div>

          <p>Number of Players</p>
          <div>
            <button className={styles.active}>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
          </div>

          <p>Grid Size</p>
          <div>
            <button className={styles.active}>4x4</button>
            <button>6x6</button>
          </div>

          <button className={styles.btn_start}>Start Game</button>
        </section>
      </div>
    </div>
  );
}

export default StartGame;
