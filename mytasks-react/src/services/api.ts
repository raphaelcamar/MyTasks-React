import axios from 'axios';

export const api = axios.create({
  baseURL: 'https://backend-mytasks.herokuapp.com/'
})