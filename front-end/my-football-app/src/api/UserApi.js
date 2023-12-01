import axios from 'axios';
import { apiUrl } from '../config';

export const getCurrentGameweek = async () => {
  try {
    const response = await axios.get(`${apiUrl}/matchInfo/gw`);
    return response.data;
  } catch (error) {
    console.error('Error fetching current gameweek:', error);
    throw error;
  }
};

export const getMatchFixture = async (gw) => {
  try {
    const response = await axios.get(`${apiUrl}/matchInfo/gw/${gw}`);
    return response.data;
  } catch (error) {
    console.error(`Error fetching match fixtures for gameweek ${gw}:`, error);
    throw error;
  }
};

export const getLeagueTable = async () => {
  try {
    const response = await axios.get(`${apiUrl}/table`);
    return response.data;
  } catch (error) {
    console.error('Error fetching table:', error);
    throw error;
  }
}
