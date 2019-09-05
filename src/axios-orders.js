import axios from 'axios';

const instance = axios.create({
  baseURL : 'https://react-my-burger-dd8a1.firebaseio.com/'
});

export default instance;