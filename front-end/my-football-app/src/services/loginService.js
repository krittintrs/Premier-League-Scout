import * as loginApi from '../api/loginApi';

export const login = async (username, password) => {
    try {
        const data = await loginApi.login(username, password)
        return data;
    } catch (error) {
        console.error('Error in loginService.login:', error);
        throw error; 
    }
}