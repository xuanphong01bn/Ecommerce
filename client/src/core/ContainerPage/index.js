import React from "react";
import styles from "./styles.module.scss";
const ContainerPage = ({ children }) => {
  return (
    <div className={styles.containterPage}>
      <div style={{ padding: "0px 24px" }}>{children}</div>
    </div>
  );
};

export default ContainerPage;
