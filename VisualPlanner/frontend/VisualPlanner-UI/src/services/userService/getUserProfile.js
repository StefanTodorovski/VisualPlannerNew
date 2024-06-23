import axiosInstance from "../axiosInstance";

const getUserProfile = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getUserProfile;
