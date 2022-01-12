import axios from 'axios';

const api = axios.create({
  baseURL: 'https://api.b7web.com.br/carros/api'
})

export default {
  api,
  getCarList: async (year = null) => {
    let data = await api.get(`/carros?ano=${year}`);
    return data;  
  },
  login: async ({email, password}) => {
    let result = await api.post('/auth/login',{
      email,
      password
    })
    return result;  
  },
  register: async ({name, email, password}) => {
    let result = await api.post('/auth/register',{
      name,
      email,
      password
    })
    return result;  
  },
  addNewCar: async (body, token) => {
    api.defaults.headers.Authorization = `Bearer ${token}`
    let { data: json} = await api.post('/carro', body);
    return json;  
  }
};