// services/userService.js
import * as userApi from '../api/UserApi';

export const getMatchFixture = async (gw) => {
  try {
    const data = await userApi.getMatchFixture(gw);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error('Error in userService.getUserData:', error);
    throw error; // Propagate the error to the component
  }
};

export const getCurrentGameweek = async () => {
    try {
      const data = await userApi.getCurrentGameweek();
      // Add any additional processing logic here
      return data;
    } catch (error) {
      console.error('Error in userService.getUserData:', error);
      throw error; // Propagate the error to the component
    }
  }
  
// Add other user-related service functions as needed
export const getLeagueTable = async () => {
  try {
    const data = await userApi.getLeagueTable();
    return data;
  } catch (error) {
    console.error('Error in userService.getLeagueTable:', error);
    throw error; // Propagate the error to the component
  }
}