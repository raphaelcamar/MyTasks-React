import { useContext, useState } from "react";
import { Button } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import useFetchUser from "../../customHooks/useFetchUser";
import styles from './login.module.scss';
import Loader from 'react-loader-spinner';
import { useRouter } from 'next/router';
import Link from "next/link"
import Head from "next/head";
import { GetStaticProps } from "next";
import { UserContext } from "../../contexts/UserContext";

export default function Login(){
  
  const [login, setLogin] = useState({
    email: '',
    password:''
  });
  const [error, setError] = useState(false);
  const [data, setData] = useState([{}]);
  const { loading, fetchGet } = useFetchUser();
  const router = useRouter();
  const context = useContext(UserContext);

  async function send(){

    const [data, err] = await fetchGet('/users', {
        email: login.email,
        password: login.password
    });
    setError(err);
    setData(data);
    if(data.length > 0){
      context.instanceUser(data);
      router.push('/main/Tasks');
    }
  }

  function handleChangeEmail(e){
    const { value } = e.target;
    setLogin({
      ...login, 
      email: value
    });
  }

  function handleChangePassword(e){
    const { value } = e.target;
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
            {data.length <= 0 && (
              <div className={styles.error}>Usuário ou senha incorretos!</div>
            )}
            {error && (
              <div className={styles.error}>Aconteceu alguma coisa, tente novamente mais tarde</div>
            )}
            <div className={styles.input}>
              <Input inputprops={{
                placeholder: 'E-mail',
                value: login.email,
                type: 'text',
              }}
              label={'Email'} onChange={handleChangeEmail} />
            </div>
            <div className={styles.input}>
              <Input inputprops={{
                value: login.password,
                placeholder: 'Senha',
                type: 'password',
              }}
              label={'Senha'} onChange={handleChangePassword} />
            </div>

            <div className={styles.alternatives}>
              <div className={styles.checkBox}>
                <input type="checkbox" name="rememberMe" id="rememberMe" />
                <label htmlFor="rememberMe">Lembre-se de mim</label>
              </div>

              <a href="">Esqueceu sua senha?</a>
            </div>

            <Button buttonProps={{
              disabled: loading
            }} onClick={send}>{loading ? (
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

export async function getStaticProps(context) {
  return {
    props: {},
  }
}