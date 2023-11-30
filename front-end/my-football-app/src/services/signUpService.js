import * as signUpApi from '../api/signUpApi';

export const signup = async (username, password) => {
    try {
        const data = await signUpApi.signup(username, password)
        return data;
    } catch (error) {
        console.error('Error in signUpService.signup:', error);
        throw error; 
    }
}