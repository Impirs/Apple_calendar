import axios from 'axios';

export const createUser = async (name, password) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:5023/api/users/create",
      data: { name, password },
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.error('Error creating user:', error);
    throw error;
  }
};

export const loginUser = async (name, password) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:5023/api/users/login",
      data: { name, password },
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);
    // localStorage.setItem('unique_id', response.data.unique_id);
    return response.data; 
  } catch (error) {
    console.error('Error logging in:', error.response.data);
  }
};

export const logoutUser = () => {
  // localStorage.removeItem('uniqueId');
  console.log('Session finished.');
};
