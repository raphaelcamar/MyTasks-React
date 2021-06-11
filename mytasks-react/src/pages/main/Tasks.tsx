import styles from '../../pageStyles/tasks.module.scss';
import Head from 'next/head';
import { useContext, useEffect } from 'react';
import { useProfile, UserContext } from '../../contexts/UserContext';
import router from 'next/router';

export default function Tasks(){

  const { instanceUser, user } = useProfile();

  useEffect(() =>{
    console.log(user)
    if(user === null){
      router.push('/')
    }
  }, [])
  return (
    <>
    <Head>
    <title>Minhas tarefas | MyTasks</title>
    </Head>
    <div className={styles.tasks}>Olá mundo</div>
    </>
  )
}