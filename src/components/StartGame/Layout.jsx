import styles from './../../styles/StartGame.module.scss';

function Layout({ children }) {
  return (
    <div className={styles.layout}>
      <div className={styles.wrapper}>
        <img className={styles.logo} src="/logo-white.svg" alt="" />
        <section className={styles.section}>{children}</section>
      </div>
    </div>
  );
}

export default Layout;
