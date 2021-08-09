import { makeStyles, CircularProgress } from '@material-ui/core';
import React, { useState } from 'react';
import { useProfile } from '../../contexts/UserContext';
import useFetchUser from '../../customHooks/useFetchUser';
import MainButton from '../atoms/Button';
import Input from '../atoms/Input';

export const useStyles = makeStyles((theme) => ({

  container: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    width: '100%',
  },
  containerSvg: {
    marginTop: '20%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  svg: {
    width: '90%'
  },

  wrapperLeft: {
    width: '55%',

    '& header': {
      width: '90%',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',

      '& h1': {
        fontSize: '1.8rem',
        color: theme.palette.primary.main
      },
      '& nav': {
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        width: '30%',

        '& a': {
          textDecoration: 'none',
          color: 'black',

          '&:hover': {
            textDecoration: 'underline',
            textDecorationColor: theme.palette.primary.light
          }
        }
      },
    },
  },
  wrapperRight: {
    background: 'white',
    width: '45%',
  },

  login: {
    width: '70%',
    margin: '0 auto',

    '& p:first-child': {
      fontSize: '1.6rem',
      fontWeight: 'bold',
      marginTop: '5rem',
      marginBottom: '4rem',
      color: theme.palette.primary.main
    },

    '& span:nth-child(2)': {
      fontSize: '1.1rem',
      color: theme.palette.primary.main,
      marginBottom: '4%',
      fontWeight: '500',
    },
  },

  description: {
    paddingTop: '2rem',
    paddingBottom: '1.5rem',
    borderBottomStyle: 'solid',
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 'thin',
    wordSpacing: '1px',
  },

  error: {
    color: theme.palette.error.main,
    textAlign: 'center',
    marginTop: '1rem',
    padding: '1rem',
    border: `1px solid ${theme.palette.error.main}`,
    backgroundColor: theme.palette.error.light
  },
  alternatives: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: '1.2rem',
    paddingBottom: '1.2rem',

    '& label': {
      marginLeft: '0.5rem',
      color: 'b9b9b9'
    },

    '& a': {
      color: theme.palette.primary.dark
    },
  },

  input: {
    marginTop: '2rem'
  }

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

  function handleChangeEmail(e: any){
    const { value } = e.target;
    setLogin({
      ...login, 
      email: value
    });
  }

  function handleChangePassword(e: any){
    const { value } = e.target;
    setLogin({
      ...login, 
      password: value
    });
  }

  return (
    <>
      <div className={classes.container}>
        <section className={classes.wrapperLeft}>
          <header>
            <h1>Login | MyTasks</h1>
            <nav>
              {/* TODO: Fazer página sobre nós */}
              <a href="#">Sobre nós</a>
              {/* TODO: Criar rotas */}
              <a href="/subscribe">Cadastre-se!</a>
            </nav>
          </header>
          <div className={classes.containerSvg}>
            {/* TODO: colocar biblioteca de desempenho, e gerar uma foto caso tenha slow 3g */}
            <object data="/login-svg.svg" className={classes.svg}/>
          </div>
        </section>
        <section className={classes.wrapperRight}>
          <div className={classes.login}>
            <p>Login</p>
            <span>Bem vindo de volta!</span>
            <div className={classes.description}>Faça seu login e mantenha sua vida organizada, cadastrando e editando suas tasks!</div>
            {/* {data.length <= 0 && ( */}
              <div className={classes.error}>Usuário ou senha incorretos!</div>
            {/* )} */}
            <div className={classes.input}>
            <Input inputprops={{
                placeholder: 'E-mail',
                value: login.email,
                type: 'text',
              }}
              label={'Email'} onChange={handleChangeEmail} />
            </div>
            <div className={classes.input}>
            <Input inputprops={{
                value: login.password,
                placeholder: 'Senha',
                type: 'password',
              }}
              label={'Senha'} onChange={handleChangePassword} />
            </div>
            <div className={classes.alternatives}>
              <div>
                <input type="checkbox" name="rememberMe" id="rememberMe" />
                <label htmlFor="rememberMe">Lembre-se de mim</label>
              </div>
              <a href="#">Esqueceu sua senha?</a>
            </div>

            <MainButton buttonProps={{
              disabled: loading
              }} onClick={send}>{!loading ? (
                <CircularProgress color="inherit" size={30}/>
              ) : (
                'Entrar'
              )}</MainButton>

          </div>
        </section>
      </div>
    </>
  )
}
//     <div className={classes.alternatives}>
//       <div className={classes.checkBox}>
//         <input type="checkbox" name="rememberMe" id="rememberMe" />
//         <label htmlFor="rememberMe">Lembre-se de mim</label>
//       </div>

//       <a href="#">Esqueceu sua senha?</a>
//     </div>

//     <MainButton buttonProps={{
//       disabled: loading
//     }} onClick={send}>{loading ? (
//       <Loader type='ThreeDots' color={'#FFF'} height={20}
//       width={20}/>
//     ) : (
//       'Entrar'
//     )}</MainButton>
//     <MainButton onClick={() => {}}>aSa</MainButton>
//   </div>
// </section>
// </div>