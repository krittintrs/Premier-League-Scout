// services/adminService.js
import * as adminApi from '../api/adminApi';

export const getAdminData = async (adminId) => {
  try {
    const data = await adminApi.getAdminData(adminId);
    // Add any additional processing logic here
    return data;
  } catch (error) {
    console.error('Error in adminService.getAdminData:', error);
    throw error;
  }
};

// Add other admin-related service functions as needed
