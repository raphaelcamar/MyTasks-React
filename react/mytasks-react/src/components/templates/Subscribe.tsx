import { CircularProgress, makeStyles } from '@material-ui/core'
import React, { useState } from 'react'
import useFetchUser from '../../customHooks/useFetchUser';
import { CpfHandler } from '../../helpers/cpfHandler';
import validateForm from '../../helpers/validateForm';
import theme from '../../theme';
import MainButton from '../atoms/Button';
import Input from '../atoms/Input';

const useStyles = makeStyles((theme)=> ({
  container: {
    width: '100%',
    height: '100vh',
    display: 'flex',
    flexDirection: 'row',
  },

  wrapperLeft: {
    width: '45%',
    backgroundColor: '#006ffe',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
    overflow: 'hidden',

    '& p':{
      width: '60%',
      // margin: '0 auto',
      color: 'white',
      fontSize: '30px',
      wordSpacing: '0.12rem',
      margin: '2rem 0',
      fontWeight: '100',
      lineHeight: '2.5rem',
      textAlign: 'center',
    },

    '& img': {
      marginTop: '1rem',
      objectFit: 'cover'
    },
  },
  wrapperRight: {
    background: '#fff',
    width: '100%',
    overflow: 'auto',
  },

  subscribe: {
    width: '85%',
    margin: '0 auto',

    '& h2': {
      marginTop: '2rem',
      marginBottom: '4rem',
      fontSize: '25px',
      fontWeight: '600',
      color: theme.palette.primary.main,
    },

    '& p': {
      fontSize: '18px',
      color: theme.palette.primary.main,
      fontWeight: '500',
      marginBottom: '1rem',
    },
    
    '& header': {
      display: 'flex',
      flexDirection: 'row',
      justifyContent: 'flex-end',

      '& nav': {
        marginTop: '2rem',
        marginBottom: '2rem',
        width: '30%',
        display: 'flex',
        justifyContent: 'space-between',

        '& a': {
          textDecoration: 'none',
          color: 'black',

          '&:hover': {
            textDecoration: 'underline',
            textDecorationColor: theme.palette.primary.dark,
            color: theme.palette.primary.dark
          }
        },
      },
    },
  },
  description: {
    paddingBottom: '1.4rem',
    borderBottomStyle: 'solid',
    borderBottomColor: '#cfcfcf',
    borderBottomWidth: 'thin',
    wordSpacing: '0.01rem',
  },
  containInputs: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginTop: '2rem',
    '& div': {
      width: '40%',
    },
  },
  terms: {
    width: '100%',
    paddingTop: '2rem',
    paddingBottom: '2rem',
    color: '#b9b9b9',
    
    '& input': {
      marginRight: '1rem',
    }
  },
  button: {
    width: '20%',
    marginBottom: '2rem',
  }



}));

// @media (max-width: 1200px) {
//   .container {
//     display: flex;
//     flex-direction: column;
//     overflow: auto;

//     .wrapperLeft,
//     .wrapperRight {
//       width: 100%;
//     }

//     .wrapperLeft {
//       overflow: unset;
//       background: rgb(0, 111, 254);
//       background: -moz-linear-gradient(
//         180deg,
//         rgba(0, 111, 254, 1) 0%,
//         rgba(255, 255, 255, 1) 93%
//       );
//       background: -webkit-linear-gradient(
//         180deg,
//         rgba(0, 111, 254, 1) 0%,
//         rgba(255, 255, 255, 1) 93%
//       );
//       background: linear-gradient(
//         180deg,
//         rgba(0, 111, 254, 1) 0%,
//         rgba(255, 255, 255, 1) 93%
//       );
//       filter: progid:DXImageTransform.Microsoft.gradient(startColorstr="#006ffe",endColorstr="#ffffff",GradientType=1);
//     }

//     .wrapperRight {
//       overflow: unset;
//       .subscribe {
//         width: 90%;
//         margin: 0 auto;
//         header {
//           display: flex;
//           flex-direction: row;
//           justify-content: center;
//           nav {
//             margin-top: 2rem;
//             margin-bottom: 2rem;
//             width: 100%;
//             display: flex;
//             justify-content: space-between;

//             a {
//               text-decoration: none;
//               color: black;

//               &:hover {
//                 text-decoration: underline;
//                 text-decoration-color: var(--secundary-blue);
//                 color: var(--secundary-blue);
//               }
//             }
//           }
//         }
//         .form {
//           .containInputs {
//             display: flex;
//             flex-direction: column;
//             margin-top: initial;

//             div {
//               margin-top: 1rem;
//               width: 100%;
//             }
//           }
//           .button {
//             width: 100%;
//             margin-bottom: 2rem;
//           }
//         }
//       }
//     }
//   }
// }

export default function Subscribe() {
  
  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
  });
  const [validator, setValidator] = useState({
    name: true,
    cpf: true,
    email: true
  });

  const [ data, setData ] = useState({});
  const [ error, setError ] = useState({});

  const classes = useStyles();
  const {loading, fetchPost} = useFetchUser();

  async function send(){
    setValidator( validateForm(form));
    const {cpf, email, name} = validator;
    if(cpf && email && name){
      const [data, error] = await fetchPost('/users', form);
      setData(data);
      setError(error);
      if(!error){
        // router.push('/main/Tasks');
      }
    }
  }

  function cleanValidation(){
    setValidator({
      name: true,
      cpf: true,
      email: true
    });
  }

  function handleForm(e, key){
    cleanValidation();
    const { value } = e.target;
    setForm({
      ...form,
      [key]: value
    });
  }

  function handleCpf(e){
    cleanValidation();
    const { value } = e.target;
    setForm({
      ...form,
      cpf: CpfHandler(value)
    });
  }

  return (
    <>
      <div className={classes.container}>
        <section className={classes.wrapperLeft}>
          <p>Está a poucos passos de criar sua conta em MyTasks!</p>
          <div>
          <img src='/subscribe.svg' width={500} height={500} alt="Subscribe"/>
          </div>
        </section>

      <section className={classes.wrapperRight}>
        <div className={classes.subscribe}>
          <header>
            <nav>
              <a href="#">Sobre nós</a>
              <a href="/">Faça seu login</a>
            </nav>
          </header>
          <h2>Cadastro</h2>
          <p>Bem vindo de volta!</p>
          <div className={classes.description}>
            Um lugar para te ajudar a organizar sua, de forma simples. Faça seu cadastro e comece já!
          </div>

          <div>
            <div className={classes.containInputs}>
                <Input
                  inputprops={{
                    value: form.name,
                    placeholder: 'Nome',
                    type: 'text',
                  }}
                  validator={validator.name}
                  messageValidator='O nome deverá ser válido, contendo apenas letras'
                  label='Nome completo'
                  onChange={(e) =>{ handleForm(e, 'name') }}
                />
              <Input
                inputprops={{
                  value: form.cpf,
                  placeholder: 'Ex: 012.345.678-90',
                  type: 'text',
                  maxLength: 14
                }}
                validator={validator.cpf}
                messageValidator='O CPF deverá ser válido, contendo apenas números'
                label='CPF'
                onChange={(e) =>{ handleCpf(e) }}
              />
            </div>

            <div className={classes.containInputs}>
              <Input
                inputprops={{
                  placeholder: 'Ex: email@gmail.com',
                  type: 'text',
                  value: form.email
                }}
                validator={validator.email}
                messageValidator='O E-mail deverá ser um E-mail correto'
                label='Email'
                onChange={(e) =>{ handleForm(e, 'email') }}
              />
              <Input
                inputprops={{
                  value: form.password,
                  placeholder: 'Sua senha',
                  type: 'password'
                }}
                label='Senha'
                onChange={(e) =>{ handleForm(e, 'password') }}
              />
            </div>

            <div className={classes.terms}>
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms">Concordo com os termos de <a>Serviço e privacidade</a></label>
            </div>

            <div className={classes.button}>
              <MainButton onClick={send}>{loading ? (
                <CircularProgress color="inherit" size={20}/>
              ) : (
                'Cadastrar'
              )}</MainButton>
            </div>

          </div>

        </div>
      </section>
    </div>
    </>
  )
}


