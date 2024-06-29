import { useState } from 'react';
import styles from './../../styles/StartGame.module.scss';

function Select({ title, options }) {
  const [current, setCurrent] = useState(options[0]);

  const handleClick = ({ target }) => {
    if (target.nodeName === 'BUTTON') setCurrent(target.textContent);
  };

  return (
    <div className={styles.box}>
      <p>{title}</p>
      <div onClick={handleClick}>
        {options.map((option) => {
          return (
            <button key={option} className={option === current ? styles.active : ''}>
              {option}
            </button>
          );
        })}
      </div>
    </div>
  );
}

export default Select;
