import styles from './input.module.scss'


type inputProps = {
  label: string;
  typeInput?: string;
  placeholder: string;
  onChange : (arg: any) => void
}

export default function Input(props:inputProps){

  const {label, typeInput, placeholder, onChange} = props

 return (
  <div className={styles.containerInput}>
    <label htmlFor={label}>{label}</label>
    <input type={typeInput} id={label} placeholder={placeholder} onChange={(v) =>{ onChange(v) }} />
  </div>
 )
}