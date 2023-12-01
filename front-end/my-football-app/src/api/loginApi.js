// api/loginApi.js
import axios from 'axios';
import { apiUrl } from '../config';

export const login = async (username, password) => {
    try {
      const response = await axios.post(`${apiUrl}/login`, {
        username: username,
        password: password,
      });
  
      const user = response.data;
  
      return user;
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    }
  };