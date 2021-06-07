import { useState } from "react";
import { Button } from "../../components/Button/Button";
import Input from "../../components/Input/Input";
import styles from './login.module.scss';

// type userLogin = {
//   email: string;
//   password: string
// };

export default function Login(){
  
  const [login, setLogin] = useState({email: '', password:''});
  const [rememberMe, setRememberMe] = useState(false);

  const send = () =>{

  }

  const change = () =>{

  }

  return (
    <div className={styles.container}>
        <div className={styles.wrapperLeft}>
          <header>
            <h1>MyTasks</h1>
            <nav>
              <a href="#">Sobre nós</a>
              <a href="">Cadastre-se!</a>
            </nav>
          </header>
          <div className={styles.containerSvg}>
            <object data="/login-svg.svg" className={styles.svg}></object>
          </div>
        </div>

        <div className={styles.wrapperRight}>
          <div className={styles.login}>
            <p>Login</p>
            <span>Bem vindo de volta!</span>
            <div className={styles.description}>Faça seu login e mantenha sua vida organizada,<br />cadastrando e editando suas tasks!</div>
            {/* <span className={styles.error}>Usuário ou senha incorretos!</span> */}
            <Input label={'Email'} placeholder={'E-mail'} />
            <Input label={'Senha'} placeholder={'Senha'} />

            <div className={styles.alternatives}>
              <div className={styles.checkBox}>
                <input type="checkbox" name="rememberMe" id="rememberMe" />
                <label htmlFor="rememberMe">Lembre-se de mim</label>
              </div>

              <a href="">Esqueceu sua senha?</a>
            </div>

            <Button label={'Entrar'}/>
          </div>
        </div>
    </div>
  )

}