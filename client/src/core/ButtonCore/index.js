import React from "react";
import { Button } from "antd";
import styles from "./styles.module.scss";
import { ColorApp } from "../../shared/AppConst/Color";
const ButtonCore = (props) => {
  const { text, isGhost, styleAdd } = props;
  return (
    <Button
      style={
        !isGhost
          ? { background: ColorApp.colorItem, color: "#FFFFFF", ...styleAdd }
          : {
              color: "#3366cc",
              borderColor: "#3366cc",
              ...styleAdd,
            }
      }
      {...props}
      className={styles.buttonCore}
    >
      {text}
    </Button>
  );
};

export default ButtonCore;
