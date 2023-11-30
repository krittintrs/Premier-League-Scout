import axios from 'axios';
import { apiUrl } from '../config';

export const signup = async (username, password) => {
    try {
      const response = await axios.post(`${apiUrl}/signup`, {
        username: username,
        password: password,
      });
  
      const user = response.data;
  
      return user;
    } catch (error) {
      console.error('Sign up error:', error);
      throw error;
    }
  };