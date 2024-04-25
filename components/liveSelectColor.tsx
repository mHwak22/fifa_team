import React from "react";
import styles from "./index.module.css";

const LiveSelectColor = ({ name, color }: any) => {
  return (
    <div
      className={styles.border_overlay}
      style={{ borderColor: `${color}` }}
    ></div>
  );
};

export default LiveSelectColor;
