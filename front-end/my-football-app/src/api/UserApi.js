// api/userApi.js
import { apiUrl } from '../config'; // Assuming you have a configuration file

export const getCurrentGameweek = async () => {
    try {
      const response = await fetch(`${apiUrl}/matchInfo/gw`);
      if (!response.ok) {
        throw new Error('Failed to fetch current gameweek');
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error('Error fetching current gameweek:', error);
      throw error;
    }
  };
  
  export const getMatchFixture = async (gw) => {
    try {
      const response = await fetch(`${apiUrl}/matchInfo/gw/${gw}`);
      if (!response.ok) {
        throw new Error(`Failed to fetch match fixtures for gameweek ${gw}`);
      }
      const data = await response.json();
      return data;
    } catch (error) {
      console.error(`Error fetching match fixtures for gameweek ${gw}:`, error);
      throw error;
    }
  };
  