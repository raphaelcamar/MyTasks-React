import { makeStyles, CircularProgress, Button } from '@material-ui/core';
import React, { ChangeEvent, FormEvent, InputHTMLAttributes, KeyboardEvent, useState } from 'react';
import { useProfile } from '../../contexts/UserContext';
import useFetchUser from '../../customHooks/useFetchUser';
import MainButton from '../atoms/Button';
import Input from '../atoms/Input';
import { Link,  } from 'react-router-dom';
import { useEffect } from 'react';
import { useHistory } from 'react-router';

export const useStyles = makeStyles((theme) => ({

  container: {
    backgroundColor: theme.palette.background.paper,
    display: 'flex',
    flexDirection: 'row',
    height: '100vh',
    width: '100%',
  },
  containerSvg: {
    // marginTop: '15%',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },

  svg: {
    width: '90%'
  },

  wrapperLeft: {
    width: '55%',
    height: '100vh',
    display: 'flex',
    justifyContent: 'space-between',
    flexDirection: 'column',
    overflow: 'hidden',

    '& header': {
      width: '90%',
      margin: '0 auto',
      display: 'flex',
      justifyContent: 'space-between',
      padding: '1rem',

      '& h1': {
        fontSize: '1.8rem',
        color: theme.palette.primary.main,
        fontWeight: 'bold',
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
    overflow: 'auto'
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
    color: theme.palette.grey[300]
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
      color: theme.palette.grey[200]
    },

    '& a': {
      color: theme.palette.primary.dark
    },
  },

  input: {
    marginTop: '2rem'
  },
  register: {
    padding: '1rem 0',

    '& span': {
      color: theme.palette.grey[200]
    },
    '& a': {
      color: theme.palette.primary.dark
    },

  },

  '@media (max-width: 1200px)': {
    container: {
      overflow: 'auto',
      display: 'flex',
      flexDirection: 'column',
      background: 'none',
      width: '100%'
    },
    wrapperLeft: {
      height: '100%',
      width: '100%',
      margin: '0 auto',
      overflow: 'unset',
      '& header': {
        width: '90%',

        '& nav': {
          width: '50%'
        }
      },
    },
    containerSvg: {
      marginTop: 0
    },
    wrapperRight: {
      width: '100%',
      overflow: 'unset'
    },
    login: {
      marginBottom: '1.95rem',
      width: '90%',

      '& p': {
        marginTop: '3rem'
      }
    }

  }
}))

export default function Login(){

  const [login, setLogin] = useState({
    email: '',
    password:'',
    remember: false
  });
  const [error, setError] = useState(false);
  const [data, setData] = useState([{}]);
  const { loading, fetchGet } = useFetchUser();
  const { instanceProfile } = useProfile();
  const classes = useStyles();
  const router = useHistory();

  useEffect(() =>{
    const user = localStorage.getItem('@logged')
    if(user){
      const data = JSON.parse(user);
      instanceProfile(data, true);
    }
  }, [])

  async function send(){

    const [data, err] = await fetchGet('/users', {
        email: login.email,
        password: login.password
    });

    setError(err);
    setData(data);
    if(data){
      instanceProfile(data, login.remember);
      router.push('/page/tasks');
    }
  }

  function pressEnter(e: KeyboardEvent): void {
    if(e.key === 'Enter'){
      send();
    }
  }

  function handleChangeEmail(e: ChangeEvent<HTMLInputElement>): void{
    const { value } = e.target;
    setLogin({
      ...login, 
      email: value
    });
  }

  function handleChangePassword(e: ChangeEvent<HTMLInputElement>): void{
    const { value } = e.target;
    setLogin({
      ...login, 
      password: value
    });
  }

  function remember(e: ChangeEvent<HTMLInputElement>): void{
    const {checked} = e.target;
    setLogin({
      ...login,
      remember: checked
    })
  }

  return (
    <>
      <div className={classes.container}>
        <section className={classes.wrapperLeft}>
          <header>
            <h1>MyTasks</h1>
            <nav>
              {/* TODO: Fazer página sobre nós */}
              <a href="#">Sobre nós</a>
              {/* TODO: Criar rotas */}
              <Link to="/subscribe">Cadastre-se!</Link>
            </nav>
          </header>
          <div className={classes.containerSvg}>
            {/* TODO: colocar biblioteca de desempenho, e gerar uma foto caso tenha slow 3g */}
            <object data="/login-svg.svg" className={classes.svg}/>
          </div>
        </section>
        <section className={classes.wrapperRight}>
          <form className={classes.login} onKeyPress={pressEnter} >
            <p>Login</p>
            <span>Bem vindo de volta!</span>
            <div className={classes.description}>Faça seu login e mantenha sua vida organizada, cadastrando e editando suas tasks!</div>
            {!data && !error ? (
              <div className={classes.error}>Usuário ou senha incorretos!</div>
            ): ''}
            {error && (
              <div className={classes.error}>Alguma coisa aconteceu. Tente novamente mais tarde.</div>
            )}
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
                <input type="checkbox" name="rememberMe" id="rememberMe" onChange={remember} checked={login.remember} />
                <label htmlFor="rememberMe">Lembre-se de mim</label>
              </div>
              <a href="#">Esqueceu sua senha?</a>
            </div>

            <MainButton disabled={loading} onClick={send}>{loading ? (
                <CircularProgress color="inherit" size={20}/>
              ) : (
                'Entrar'
              )}</MainButton>
              <div className={classes.register}>
                <span>Não possui conta? <Link to="/subscribe">Registre-se!</Link></span>
              </div>
          </form>
        </section>
      </div>
    </>
  )
}
