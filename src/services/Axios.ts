import axios from 'axios';

const url = `http://localhost:3000/`;

export const callApi = axios.create({
  baseURL: url,
});

export const fetcher = (url : string) => callApi(url).then(
  (res) => res.data
  )




