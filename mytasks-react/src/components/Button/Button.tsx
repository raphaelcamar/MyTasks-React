import React, { ReactNode } from 'react';
import styles from './button.module.scss';

type buttonProps = {
  children: ReactNode;
  onClick: () => void;
}

export function Button(props: buttonProps){

  const {children, onClick} = props;

  return (
    <button className={styles.button} onClick={() =>{ onClick() }}>
      <div className={children === Symbol ? styles.loader : ''}>
      {children}
      </div>
    </button>
  )
}