import styles from "./../styles/Dots.module.scss";
import { useState } from "react";

function Dots({ grid, gridSize }) {
  const gridStyles = {
    gridTemplateColumns: `repeat(${
      +gridSize === 4 ? "4, minmax(0, 118px)" : "6, minmax(0, 82px)"
    })`,
    gridTemplateRows: `repeat(${
      +gridSize === 4 ? "4, minmax(0, 118px)" : "6, minmax(0, 82px)"
    })`,
    gap: `${+gridSize === 4 ? "12.3px" : "9.1px"}`,
  };

  return (
    <ul className={styles.ul} style={gridStyles}>
      {grid.map((dot, i) => {
        return <li key={i}>{dot}</li>;
      })}
    </ul>
  );
}

export default Dots;
