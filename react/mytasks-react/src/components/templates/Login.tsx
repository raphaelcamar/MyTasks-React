import { makeStyles } from '@material-ui/core';
import React, { useState } from 'react';
import { useProfile } from '../../contexts/UserContext';
import useFetchUser from '../../customHooks/useFetchUser';
import MainButton from '../atoms/Button';

export const useStyles = makeStyles(() => ({

//   .container {
//   background-color: #f2f4f8;
//   display: flex;
//   flex-direction: row;
//   height: 100vh;
//   width: 100%;

//   .wrapperLeft {
//     width: 55%;

//     .containerSvg {
//       margin-top: 20%;
//       display: flex;
//       align-items: center;
//       justify-content: center;

//       .svg {
//         width: 90%;
//       }
//     }
//     header {
//       width: 90%;
//       margin: 0 auto;
//       display: flex;
//       justify-content: space-between;
//       padding: 1rem;

//       h1 {
//         font-size: 1.8rem;
//         color: var(--primary-blue);
//         font-weight: bold;
//       }

//       nav {
//         display: flex;
//         align-items: center;
//         justify-content: space-between;
//         width: 30%;

//         a {
//           text-decoration: none;
//           color: black;

//           &:hover {
//             text-decoration: underline;
//             text-decoration-color: #2680eb;
//             color: #2680eb;
//           }
//         }
//       }
//     }
//   }

//   .wrapperRight {
//     background: white;
//     width: 45%;

//     .login {
//       width: 70%;
//       margin: 0 auto;

//       p:first-child {
//         font-size: 1.6rem;
//         font-weight: bold;
//         margin-top: 5rem;
//         margin-bottom: 4rem;
//         color: var(--primary-blue);
//       }

//       span:nth-child(2) {
//         font-size: 1.1rem;
//         color: var(--primary-blue);
//         margin-bottom: 4%;
//         font-weight: 500;
//       }

//       .description {
//         padding-top: 2rem;
//         padding-bottom: 1.5rem;
//         border-bottom-style: solid;
//         border-bottom-color: #cfcfcf;
//         border-bottom-width: thin;
//         word-spacing: 1px;
//       }

//       .error {
//         color: #ef4e59;
//         text-align: center;
//         margin-top: 1rem;
//         padding: 1rem;
//         border: 1px solid #ef4e59;
//         background-color: #ef4e5981;
//       }

//       .alternatives {
//         display: flex;
//         flex-direction: row;
//         justify-content: space-between;
//         padding-top: 1.2rem;
//         padding-bottom: 1.2rem;

//         label {
//           margin-left: 0.5rem;
//           color: #b9b9b9;
//         }

//         a {
//           color: var(--secundary-blue);
//         }
//       }
//       .input {
//         margin-top: 2rem;
//       }
//     }
//   }
// }

// @media (max-width: 1200px) {
//   .container {
//     overflow: auto;
//     display: flex;
//     flex-direction: column;
//     background: none;

//     .wrapperLeft {
//       height: 100%;
//       width: 100%;
//       margin: 0 auto;
//       background: rgb(242, 244, 248);
//       background: -moz-linear-gradient(
//         90deg,
//         rgba(242, 244, 248, 1) 91%,
//         rgba(255, 255, 255, 1) 100%
//       );
//       background: -webkit-linear-gradient(
//         90deg,
//         rgba(242, 244, 248, 1) 91%,
//         rgba(255, 255, 255, 1) 100%
//       );
//       background: linear-gradient(
//         90deg,
//         rgba(242, 244, 248, 1) 91%,
//         rgba(255, 255, 255, 1) 100%
//       );
//       filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#f2f4f8",endColorstr="#ffffff",GradientType=1);

//       header {
//         width: 100%;

//         nav {
//           width: 50%;
//         }
//       }

//       .draw {
//         width: 90%;
//         margin: 0 auto;
//       }

//       .containerSvg {
//         margin-top: 0;
//       }
//     }
//     .wrapperRight {
//       width: 100%;

//       .login {
//         margin-bottom: 1.95rem;
//         width: 90%;

//         p {
//           margin-top: 3rem;
//         }
//       }
//     }
//   }
// }

}))

export default function Login(){

  const [login, setLogin] = useState({
    email: '',
    password:''
  });
  const [error, setError] = useState(false);
  const [data, setData] = useState([{}]);
  const { loading, fetchGet } = useFetchUser();
  const { instanceProfile } = useProfile();
  const classes = useStyles();

  async function send(){

    const [data, err] = await fetchGet('/users', {
        email: login.email,
        password: login.password
    });
    setError(err);
    setData(data[0]);
    if(data.length > 0){
      // instanceProfile(data[0]);
      // router.push('/page/Tasks');
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
    <>
     <div className={classes.container}>
      <Head>
        <title>Login | MyTasks</title>
      </Head>
      <section className={classes.wrapperLeft}>
        <header>
          <h1>MyTasks</h1>
          <nav>
            <a href="#">Sobre nós</a>
            <Link href="/Subscribe">Cadastre-se!</Link>
          </nav>
        </header>
        <div className={classes.containerSvg}>
          <object data="/login-svg.svg" className={classes.svg}></object>
        </div>
      </section>

      <section className={classes.wrapperRight}>
        <div className={classes.login}>
          <p>Login</p>
          <span>Bem vindo de volta!</span>
          <div className={classes.description}>Faça seu login e mantenha sua vida organizada, cadastrando e editando suas tasks!</div>
          {data.length <= 0 && (
            <div className={classes.error}>Usuário ou senha incorretos!</div>
          )}
          {error && (
            <div className={classes.error}>Aconteceu alguma coisa, tente novamente mais tarde</div>
          )}
          <div className={classes.input}>
            <Input inputprops={{
              placeholder: 'E-mail',
              value: login.email,
              type: 'text',
            }}
            label={'Email'} onChange={handleChangeEmail} />
          </div>
          {/* <div className={styles.input}>
            <Input inputprops={{
              value: login.password,
              placeholder: 'Senha',
              type: 'password',
            }}
            label={'Senha'} onChange={handleChangePassword} />
          </div> */}

          <div className={classes.alternatives}>
            <div className={classes.checkBox}>
              <input type="checkbox" name="rememberMe" id="rememberMe" />
              <label htmlFor="rememberMe">Lembre-se de mim</label>
            </div>

            <a href="#">Esqueceu sua senha?</a>
          </div>

          {/* <MainButton buttonProps={{
            disabled: loading
          }} onClick={send}>{loading ? (
            <Loader type='ThreeDots' color={'#FFF'} height={20}
            width={20}/>
          ) : (
            'Entrar'
          )}</MainButton> */}
          <MainButton onClick={() => {}}>aSa</MainButton>
        </div>
      </section>
    </div>
    </>
  )
}