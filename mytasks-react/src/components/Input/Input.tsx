import styles from './input.module.scss'


type inputProps = {
  label: string;
  typeInput?: string;
  placeholder: string;
  // onchange : () =>{}
}

export default function Input(props:inputProps){

  const {label, typeInput, placeholder} = props

 return (
  <div className={styles.containerInput}>
    <label htmlFor={label}>{label}</label>
    <input type="text" id={label} placeholder={placeholder} onChange={() =>{}}/>
  </div>
 )
}