import React from "react";
import styles from "./Button.module.scss";

interface ButtonProps {
  onClick: () => void;
  children: any;
  primary?: boolean;
}

const Button: React.FC<ButtonProps> = ({ onClick, children, primary }) => {
  return (
    <button
      className={`${styles.button} ${primary && styles.primary}`}
      onClick={onClick}
    >
      {children}
    </button>
  );
};

export default Button;
