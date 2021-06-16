import styles from '../pageStyles/subscribe.module.scss';
import Image from 'next/image';
import Input from '../components/Input/Input';
import Button from '../components/Button/Button';
import { useState } from 'react';
import useFetchUser from '../customHooks/useFetchUser';
import router, { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import Link from 'next/link';
import Head from 'next/head';
import validateForm from '../helpers/validateForm';
import { CpfHandler } from '../helpers/cpfHandler';

export default function Subscribe(props){

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

  const {loading, fetchPost} = useFetchUser();

  async function send(){
    setValidator( validateForm(form));
    const {cpf, email, name} = validator;
    if(cpf && email && name){
      const [data, error] = await fetchPost('/users', form);
      setData(data);
      setError(error);
      if(!error){
        router.push('/main/Tasks');
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
    <div className={styles.container}>
      <Head>
        <title>Cadastro | MyTasks</title>
      </Head>
      <section className={styles.wrapperLeft}>
        <p>Está a poucos passos de criar sua conta em MyTasks!</p>
        <div className={styles.image} >
        <Image src='/subscribe.svg' width={500} height={500} objectFit='contain'/>
        </div>
      </section>

      <section className={styles.wrapperRight}>
        <div className={styles.subscribe}>
          <header>
            <nav>
              <a href="#">Sobre nós</a>
              <Link href="/">Faça seu login</Link>
            </nav>
          </header>
          <h2>Cadastro</h2>
          <p>Bem vindo de volta!</p>
          <div className={styles.description}>
            Um lugar para te ajudar a organizar sua, de forma simples. Faça seu cadastro e comece já!
          </div>

          <div className={styles.form}>
            <div className={styles.containInputs}>
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

            <div className={styles.containInputs}>
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

            <div className={styles.terms}>
              <input type="checkbox" name="terms" id="terms" />
              <label htmlFor="terms">Concordo com os termos de <a>Serviço e privacidade</a></label>
            </div>

            <div className={styles.button}>
              <Button onClick={send}>{loading ? (
                <Loader type='ThreeDots' color={'#FFF'} height={20}
                width={20}/>
              ) : (
                'Cadastrar'
              )}</Button>
            </div>

          </div>

        </div>
      </section>
    </div>
  )
}

// export async function getStaticProps(context) {
//   return {
//     props: {},
//   }
// }