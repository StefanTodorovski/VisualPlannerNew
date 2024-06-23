import axiosInstance from "../axiosInstance";

const getAllActivityTypes = async () => {
  try {
    const response = await axiosInstance.get("/activity-types");
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getAllActivityTypes;
