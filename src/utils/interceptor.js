import axios from 'axios';
import Config from 'config/api';
const {API} = Config;

const client = axios.create({
  baseURL: API,
});

const token = '';

export const request = ({...options}) => {
  client.defaults.headers.common.Authorization = `Bearer ${token}`;
  const onSuccess = response => response;
  const onError = error => error;
  console.log('====================================');
  console.log('URL ==> ', API + options.url);
  console.log('====================================');
  return client(options).then(onSuccess).catch(onError);
};
