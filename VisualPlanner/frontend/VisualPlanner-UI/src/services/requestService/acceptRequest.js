import axiosInstance from "../axiosInstance";

const acceptRequest = async (requestId, availabilityId) => {
  try {
    const response = await axiosInstance.put(
      `/requests/${requestId}/${availabilityId}/accept`
    );
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default acceptRequest;
