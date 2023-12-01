// services/adminService.js
import * as adminApi from "../api/adminApi";

export const getMatchDetails = async (matchid) => {
  try {
    const data = await adminApi.getMatchDetails(matchid);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.getMatchDetails:", error);
    throw error; // Propagate the error to the component
  }
};

export const GetMatchEvents = async (matchid) => {
  try {
    const data = await adminApi.GetMatchEvents(matchid);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.GetMatchEvents:", error);
    throw error; // Propagate the error to the component
  }
};

export const PostMatchEvents = async (event) => {
  try {
    const data = await adminApi.PostMatchEvents(event);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.PostMatchEvents:", error);
    throw error; // Propagate the error to the component
  }
};

export const UpdateMatchEvents = async (event) => {
  try {
    const data = await adminApi.UpdateMatchEvents(event);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.UpdateMatchEvents:", error);
    throw error; // Propagate the error to the component
  }
};

export const DeleteMatchEvents = async (id) => {
  try {
    const data = await adminApi.DeleteMatchEvents(id);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.DeleteMatchEvents:", error);
    throw error; // Propagate the error to the component
  }
};

export const getTeam = async (teamid) => {
  try {
    const data = await adminApi.getTeam(teamid);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.getStadiums:", error);
    throw error; // Propagate the error to the component
  }
};

export const GetLineups = async (matchid) => {
  try {
    const data = await adminApi.GetLineups(matchid);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.GetLineups:", error);
    throw error; // Propagate the error to the component
  }
};

export const PostLineups = async (lineup) => {
  try {
    const data = await adminApi.PostLineups(lineup);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.PostLineups:", error);
    throw error; // Propagate the error to the component
  }
};

export const GetPlayers = async (teamid) => {
  try {
    const data = await adminApi.GetPlayers(teamid);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.GetPlayers:", error);
    throw error; // Propagate the error to the component
  }
};

export const updateLineup = async (lineup) => {
  try {
    const data = await adminApi.updateLineup(lineup);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.updateLineup:", error);
    throw error; // Propagate the error to the component
  }
};

export const deleteLineup = async (lineup) => {
  try {
    const data = await adminApi.deleteLineup(lineup);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.deleteLineup:", error);
    throw error; // Propagate the error to the component
  }
};

// Add other admin-related service functions as needed
export const AddCondPlayer = async (condPlayer) => {
  try {
    const data = await adminApi.AddCondPlayer(condPlayer);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error("Error in adminService.AddCondPlayer:", error);
    throw error; // Propagate the error to the component
  }
};