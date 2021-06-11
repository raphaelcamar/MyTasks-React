import { useState } from 'react';
import { api } from '../services/api';

type fetchUserProps = {
  email: string;
  password: string;
}

type dataUser = {
  name: string;
  cpf: string;
  email: string;
  password: string;
}

const useFetchUser = () =>{

  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as dataUser);

  function fetchUser(user: fetchUserProps){
    setLoading(true);
    setError(false);

    const { email, password } = user

    api.get('/users', {
      params:{
        email: email,
        password: password
      }
    }).then(resp => {
      const [user] = resp.data
      setData(user);
      setLoading(false);
    }).catch(err => {
      setError(true);
      setLoading(false);
      setData(null);
    });
    
  }

  function fetchSubscribe(user: dataUser){
    setLoading(true);
    const { email, password, cpf, name } = user
    api.post('/users', {
      email,
      password,
      cpf,
      name,
      isAdm: false
    }).then(resp => {
      setData(resp.data);
      setLoading(false);
    }).catch(err =>{
      setData(null);
      setLoading(false);
    });
  }

  async function fetchGet(link: string, params: {}){
    try {
      setLoading(true);
      const data = await api.get(link, {
      params: params
    });
    setLoading(false);
    return [data.data, null];
    } catch (e) {
      setLoading(false);
      return [null, e];
    }
  }

  async function fetchPost(link: string, params: {}){
    try {
      setLoading(true);
      const data = await api.post(link, params);
    setLoading(false);
    return [data.data, null];
    } catch (e) {
      setLoading(false);
      return [null, e];
    }
  }

  return {
    fetchUser,
    fetchSubscribe,
    fetchGet,
    fetchPost,
    error,
    loading,
    data,
  }

}

export default useFetchUser;