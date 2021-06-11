import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

type buttonProps = {
  children: ReactNode;
  onClick: () => void;
  buttonProps?: ButtonHTMLAttributes<any>;
}

export function Button(props: buttonProps){

  const {children, onClick, buttonProps} = props;

  return (
    <button {...buttonProps} className={styles.button} onClick={() =>{ onClick() }}>
      <div className={children === Symbol ? styles.loader : ''}>
      {children}
      </div>
    </button>
  )
}