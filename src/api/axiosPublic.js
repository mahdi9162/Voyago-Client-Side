import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'https://voyago-server-side.vercel.app/',
});

export default axiosPublic;
