import axios from 'axios';

const dev_url = `http://localhost:3000/`;
const prod_url = import.meta.env.VITE_API_URL

import.meta.env.VITE_NODE_ENV === "development" ? dev_url : prod_url;

export const callApi = axios.create({
  baseURL: prod_url,
});

export const fetcher = (url : string) => callApi(url).then(
  (res) => res.data
  )




