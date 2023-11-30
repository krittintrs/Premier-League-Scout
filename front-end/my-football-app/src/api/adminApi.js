// api/adminApi.js
import { apiUrl } from '../config';

export const getAdminData = async (adminId) => {
  const response = await fetch(`${apiUrl}/admin/${adminId}`);
  const data = await response.json();
  return data;
};

// Add other admin-related API functions as needed