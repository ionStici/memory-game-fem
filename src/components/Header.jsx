import styles from './../styles/Header.module.scss';
import logo from '/logo.svg';
import { useEffect, useState } from 'react';

function Header({ setGameSettings, generateNewGrid, resetGrid }) {
  const [match, setMatch] = useState(window.matchMedia('(min-width: 768px)').matches);

  useEffect(() => {
    const mediaQuery = window.matchMedia('(min-width: 768px)');
    const handleChange = e => setMatch(e.matches);
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, []);

  const [navIsOpen, setNavIsOpen] = useState(false);

  const handleToggleNav = () => setNavIsOpen(prev => !prev);

  const handleRestartNew = ({ target }) => {
    if (target.textContent === 'Restart') {
      generateNewGrid();
      resetGrid();
    }

    if (target.textContent === 'New Game') {
      setGameSettings(null);
    }
  };

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo_wrapper}>
          <img src={logo} alt="Memory Logo" />
        </div>
        <button className={styles.menu_btn} onClick={handleToggleNav}>
          Menu
        </button>

        {(navIsOpen || match) && (
          <>
            <div className={styles.layout}></div>
            <nav className={styles.nav}>
              <ul>
                <li>
                  <button className={styles.btn_restart} onClick={handleRestartNew}>
                    Restart
                  </button>
                </li>
                <li>
                  <button onClick={handleRestartNew}>New Game</button>
                </li>
                <li>
                  <button onClick={handleToggleNav}>Resume Game</button>
                </li>
              </ul>
            </nav>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
