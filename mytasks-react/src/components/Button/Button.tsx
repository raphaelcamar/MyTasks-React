import styles from './button.module.scss'

export function Button(props){

  const {label} = props

  return (
    <button className={styles.button} onClick={() =>{}}>
      {label}
    </button>
  )
}