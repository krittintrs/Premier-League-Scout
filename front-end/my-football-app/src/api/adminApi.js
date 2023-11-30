// api/adminApi.js
import axios from 'axios';
import { apiUrl } from '../config';

export const getMatchDetails = async (matchid) => {
  const response = await axios.get(`${apiUrl}/matchInfo/${matchid}`);
  return response.data;
};

export const GetMatchEvents = async (matchid) => {
  const response = await axios.get(`${apiUrl}/match-events/match/${matchid}`);
  return response.data;
};

export const PostMatchEvents = async (event) => {
  const response = await axios.post(`${apiUrl}/match-events`, event, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export const UpdateMatchEvents = async (event) => {
  const response = await axios.put(`${apiUrl}/match-events`, event, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export const DeleteMatchEvents = async (id) => {
  const response = await axios.delete(`${apiUrl}/match-events/${id}`);
  return response.data;
}

export const GetLineups = async (matchid) => {
  const response = await axios.get(`${apiUrl}/lineup/${matchid}`);
  return response.data;
};

export const PostLineups = async (lineup) => {
  const response = await axios.post(`${apiUrl}/lineup`, lineup, {
    headers: {
      'Content-Type': 'application/json',
    },
  });
  return response.data;
}

export const GetPlayers = async (teamid) => {
  const response = await axios.get(`${apiUrl}/player/team/${teamid}`);
  return response.data;
};

export const getTeam = async (teamid) => {
  const response = await axios.get(`${apiUrl}/team/${teamid}`);
  return response.data;
}
