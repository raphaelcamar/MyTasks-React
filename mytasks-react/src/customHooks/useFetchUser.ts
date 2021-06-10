import { useState } from 'react';
import { api } from '../services/api';

type fetchUserProps = {
  name?: string;
  cpf?: string;
  isAdm?: boolean
  email: string;
  password: string;
}

type dataUser = {
  cpf: string;
  email: string;
  id: number;
  isAdm: boolean;
  name: string;
  password: string;
}

const useFetchUser = (props: fetchUserProps) =>{

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as dataUser);

  function fetchUser(){
    setLoading(true);
    setError(false);
    const { email, password } = props;

    api.get('/users', {
      params:{
        email: email,
        password: password
      }
    }).then(resp => {
      setLoading(false);
      const [user] = resp.data
      setData(user);
    }).catch(err => {
      setError(true);
      setLoading(false);
    });
    
  }

  function fetchSubscribe(){
    setLoading(true);
    const { email, password, cpf, name, isAdm } = props
    api.post('/users', {
      email,
      password,
      cpf,
      name,
      isAdm
    }).then(resp => {
      setLoading(false);
      console.log(resp)
    }).catch(err =>{
      setLoading(false);
      console.log(err.response)
    })
  }

  return {
    fetchUser,
    error,
    loading,
    data,
    fetchSubscribe
  }

}

export default useFetchUser;