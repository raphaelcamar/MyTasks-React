import styles from './subscribe.module.scss';
import Image from 'next/image';
import Input from '../../components/Input/Input';
import { Button } from '../../components/Button/Button';
import { useState } from 'react';
import useFetchUser from '../../customHooks/useFetchUser';
import { useRouter } from 'next/router';
import Loader from 'react-loader-spinner';
import Link from 'next/link';
import Head from 'next/head';
import validateForm from '../../helpers/validateForm';

function Subscribe(props){

  const [form, setForm] = useState({
    name: '',
    cpf: '',
    email: '',
    password: '',
  });

  const {loading, error, fetchSubscribe} = useFetchUser(form);
  const router = useRouter();

  function send(){
    fetchSubscribe();
    const validate = validateForm(form);
  }

  function handleForm(e, key){
    const { value } = e.target;
    setForm({
      ...form,
      [key]: value
    })
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
            <Input label='Nome completo' placeholder='Nome' typeInput='text' onChange={(e) =>{handleForm(e, 'name')}} />
            <Input label='CPF' placeholder='Ex: 012.345.678-90' typeInput='text' onChange={(e) =>{handleForm(e, 'cpf')}} />
          </div>

          <div className={styles.containInputs}>
            <Input label='Email' placeholder='Ex: email@gmail.com' typeInput='text' onChange={(e) =>{handleForm(e, 'email')}} />
            <Input label='Senha' placeholder='Sua senha' typeInput='password' onChange={(e) =>{handleForm(e, 'password')}} />
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

export default Subscribe