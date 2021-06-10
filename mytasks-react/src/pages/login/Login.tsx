import { useState } from "react";
import { Button } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useFetchUser from "../../customHooks/useFetchUser";
import styles from './login.module.scss';
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';
import Link from "next/link"
import Head from "next/head";

export default function Login(){
  
  const [login, setLogin] = useState({
    email: '',
    password:''
  });
  const [rememberMe, setRememberMe] = useState(false);
  const { loading, error, fetchUser, data } = useFetchUser(login);
  const router = useRouter();
  

  function send(){
    fetchUser();
    router.push('/main/Tasks');
  }

  function handleChangeEmail(e){
    const { value } = e.target
    setLogin({
      ...login, 
      email: value
    });
  }

  function handleChangePassword(e){
    const { value } = e.target
    setLogin({
      ...login, 
      password: value
    });
  }

  return (
    <div className={styles.container}>
      <Head>
        <title>Login | MyTasks</title>
      </Head>
        <section className={styles.wrapperLeft}>
          <header>
            <h1>MyTasks</h1>
            <nav>
              <a href="#">Sobre nós</a>
              <Link href="/subscribe/Subscribe">Cadastre-se!</Link>
            </nav>
          </header>
          <div className={styles.containerSvg}>
            <object data="/login-svg.svg" className={styles.svg}></object>
          </div>
        </section>

        <section className={styles.wrapperRight}>
          <div className={styles.login}>
            <p>Login</p>
            <span>Bem vindo de volta!</span>
            <div className={styles.description}>Faça seu login e mantenha sua vida organizada, cadastrando e editando suas tasks!</div>
            {data === null || data === undefined && (
              <div className={styles.error}>Usuário ou senha incorretos!</div>
            )}
            {error && (
              <div className={styles.error}>Aconteceu alguma coisa, tente novamente mais tarde</div>
            )}
            <Input label={'Email'} placeholder={'E-mail'} onChange={handleChangeEmail} typeInput='text' />
            <Input label={'Senha'} placeholder={'Senha'} onChange={handleChangePassword} typeInput='password' />

            <div className={styles.alternatives}>
              <div className={styles.checkBox}>
                <input type="checkbox" name="rememberMe" id="rememberMe" />
                <label htmlFor="rememberMe">Lembre-se de mim</label>
              </div>

              <a href="">Esqueceu sua senha?</a>
            </div>

            <Button onClick={send}>{loading ? (
              <Loader type='ThreeDots' color={'#FFF'} height={20}
              width={20}/>
            ) : (
              'Entrar'
            )}</Button>
          </div>
        </section>
    </div>
  )

}