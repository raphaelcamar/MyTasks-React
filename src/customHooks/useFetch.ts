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

type useFetchUserProps = {
  fetchGet: () => any,
  fetchPost: () => any,
  error: boolean,
  loading: boolean,
  data: any,
}

const useFetchUser = (): useFetchUserProps => {
  const [error, setError] = useState(false);
  const [loading, setLoading] = useState(false);
  const [data, setData] = useState({} as any);

  async function fetchGet(link: string, params: {}) {
    setLoading(true);
    try {
      const { data } = await api.get(link, {
        params,
      });
      return data;
    } catch (e) {
      return e.response.data;
    } finally {
      setLoading(false);
    }
  }

  async function fetchPost(link: string, params: {}) {
    setLoading(true);
    try {
      const { data } = await api.post(link, params);
      return data;
    } catch (e) {
      return e.response.data;
    } finally {
      setLoading(false);
    }
  }

  return {
    fetchGet,
    fetchPost,
    error,
    loading,
    data,
  };
};

export default useFetchUser;
