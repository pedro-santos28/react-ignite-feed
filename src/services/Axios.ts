import axios from 'axios';

const dev_url = import.meta.env.VITE_DEV_URL
const prod_url = import.meta.env.VITE_API_URL

const url = import.meta.env.VITE_NODE_ENV === "development" ? dev_url : prod_url

export const callApi = axios.create({
  baseURL: url
}); 

export const fetcher = (url : string, headers: any) => callApi(url, headers ).then(
  (res) => res.data
)


