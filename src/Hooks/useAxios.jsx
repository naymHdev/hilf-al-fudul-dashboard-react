import axios from "axios";

const useAxios = axios.create({
  baseURL: import.meta.env.VITE_API_LOCALHOST,
  withCredentials: true,
});

export default useAxios;
