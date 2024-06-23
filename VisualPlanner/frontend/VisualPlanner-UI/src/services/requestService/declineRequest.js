import axiosInstance from "../axiosInstance";

const declineRequest = async (id) => {
  try {
    const response = await axiosInstance.put(`/requests/${id}/decline`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default declineRequest;
