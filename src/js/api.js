import axios from 'axios';

//                                    User logic                              //

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

//                                Events logic                                //

export const createEvent = async (title, discription, group, allDay, startTime,
                            endTime, repeat, balert, invitees, url, notes) => {
  try {
    const response = await axios({
      method: "post",
      url: "http://localhost:5023/api/events/create-event",
      data : {title, discription, group, allDay, startTime,
        endTime, repeat, balert, invitees, url, notes},
      headers: { "Content-Type": "application/json" },
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Error adding the event: ', error.response.data);
  }         
};

export const getByOwner = async (uniqueID) => {
  try {
    const response = await axios({
      method: "get",
      url: "http://localhost:5023/api/events/get-events-by-owner",
      data: uniqueID,
      headers: { "Content-Type": "application/json" }
    });
    console.log(response.data);
    return response.data;
  } catch (error) {
    console.log('Error getting events: ', error.response.data);
  }
}