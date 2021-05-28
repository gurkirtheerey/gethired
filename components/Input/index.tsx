import React from "react";
import styles from "./Input.module.scss";

interface InputProps {
  onChange: (e: any) => void;
  value: string;
  placeholder: string;
}

const Input: React.FC<InputProps> = ({ onChange, value, placeholder }) => {
  return (
    <input
      className={styles.container}
      type="text"
      onChange={onChange}
      value={value}
      placeholder={placeholder}
    />
  );
};

export default Input;
