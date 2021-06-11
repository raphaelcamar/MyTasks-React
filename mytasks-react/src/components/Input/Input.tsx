import { HTMLAttributes, InputHTMLAttributes } from 'react'
import styles from './input.module.scss'


type inputProps = {
  label: string;
  onChange : (arg: any) => void;
  inputprops?: InputHTMLAttributes<any>;
  validator?: boolean;
  messageValidator?: string;
}

export default function Input(props:inputProps){

  const { label, onChange, inputprops, validator, messageValidator } = props

 return (
  <div className={styles.containerInput}>
    <label htmlFor={label}>{label}</label>
    <input {...inputprops} id={label} onChange={(v) =>{ onChange(v) }} />
    {validator === false && (
      <span className={styles.errorValidator}>{messageValidator}</span>
    )}
  </div>
 )
}