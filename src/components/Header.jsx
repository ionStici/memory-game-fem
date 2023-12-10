import styles from "./../styles/Header.module.scss";
import logo from "/logo.svg";
import { useState } from "react";

function Header() {
  //   const [match, setMatch] = useState(
  //     window.matchMedia("(max-width: 767px)").matches
  //   );

  const [navIsOpen, setNavIsOpen] = useState(false);
  const handleToggleNav = () => setNavIsOpen((prev) => !prev);

  return (
    <header className={styles.header}>
      <div className={styles.wrapper}>
        <div className={styles.logo_wrapper}>
          <img src={logo} alt="Memory Logo" />
        </div>
        <button className={styles.menu_btn} onClick={handleToggleNav}>
          Menu
        </button>

        {navIsOpen && (
          <>
            <div className={styles.layout}></div>
            <nav className={styles.nav}>
              <ul>
                <li>
                  <button className={styles.btn_restart}>Restart</button>
                </li>
                <li>
                  <button>New Game</button>
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
