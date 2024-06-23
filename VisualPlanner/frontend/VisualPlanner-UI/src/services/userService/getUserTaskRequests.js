import axiosInstance from "../axiosInstance";

const getUserTaskRequests = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/user-poster/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getUserTaskRequests;
