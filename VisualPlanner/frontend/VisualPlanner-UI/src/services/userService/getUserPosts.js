import axiosInstance from "../axiosInstance";

const getUserPosts = async (id) => {
  try {
    const response = await axiosInstance.get(`/users/list-posts/${id}`);
    return response.data;
  } catch (error) {
    console.error(error);
  }
};

export default getUserPosts;
