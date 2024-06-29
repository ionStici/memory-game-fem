import styles from './../../styles/StartGame.module.scss';
import { useGameSettings } from '../../GameSettings';
import Select from './Select';

function StartGame() {
  const { setGameSettings } = useGameSettings();
  // setGameSettings({ theme: 'Numbers', numberOfPlayers: '1', gridSize: '4', tilesShape: 'Circle' });

  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src="logo-white.svg" alt="Logo" />
        <section className={styles.section}>
          <h1>Memory Game</h1>

          <div className={styles.container}>
            <Select title="Select Theme" options={['Numbers', 'Icons']} />
            <Select title="Number of Players" options={['1', '2', '3', '4']} />
            <Select title="Grid Size" options={['4x4', '6x6']} />
            <Select title="Tiles Shape" options={['Circle', 'Squircle']} />
            <button className={styles.btn_start}>Start Game</button>
          </div>
        </section>
      </div>
    </div>
  );
}

export default StartGame;
