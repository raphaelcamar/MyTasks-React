import React, { ButtonHTMLAttributes, ReactNode } from 'react';
import styles from './button.module.scss';

type buttonProps = {
  children?: ReactNode;
  onClick: () => void;
  buttonProps?: ButtonHTMLAttributes<any>;
}

export default function Button(props: buttonProps){

  const {children, onClick, buttonProps} = props;

  return (
    <button className={styles.button} onClick={() =>{ onClick() }} {...buttonProps}>
      <div className={children === Symbol ? styles.loader : ''}>
      {children}
      </div>
    </button>
  )
}