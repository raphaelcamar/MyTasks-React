import styles from '../../pageStyles/tasks.module.scss';
import Head from 'next/head';

export default function Tasks(){
  return (
    <>
    <Head>
    <title>Minhas tarefas | MyTasks</title>
    </Head>
    <div className={styles.tasks}>Olá mundo</div>
    </>
  )
}