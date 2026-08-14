// import axios from "axios";

// // const API =
// //   "https://chat-app-backend-production-54a2.up.railway.app";

//   const API =
//   "https://chat-app-backend-production-d1df.up.railway.app";

//   export const getPendingRequests = (userId) =>
//   axios.get(`${API}/api/friends/pending/${userId}`);

// export const getFriends = (userId) =>
//   axios.get(`${API}/api/friends/list/${userId}`);

// export const sendRequest = (senderId, receiverId) =>
//   axios.post(`${API}/api/friends/request`, {
//     senderId,
//     receiverId,
//   });

// export const getAllUsers = async () => {

//   const response = await axios.get(
//     `${API}/api/auth/users`
//   );

//   return response.data;
// };

// // Get accepted friends
// // export const getFriends =
// //   async (userId) => {

// //     const response =
// //       await axios.get(
// //         `${API}/api/friends/list/${userId}`
// //       );

// //     return response.data;
// //   };

// export const acceptRequest = (id) =>
//   axios.put(`${API}/api/friends/accept/${id}`);

// export const rejectRequest = (id) =>
//   axios.put(`${API}/api/friends/reject/${id}`);

import axios from "axios";

const API =
  "https://chat-app-backend-production-d1df.up.railway.app";


// ==========================================
// GET ALL USERS
// ==========================================

export const getAllUsers = async () => {

  const response =
    await axios.get(
      `${API}/api/auth/users`
    );

  console.log(
    "GET ALL USERS RESPONSE:",
    response.data
  );

  return response.data;
};


// ==========================================
// GET FRIENDS
// ==========================================

export const getFriends = async (userId) => {

  const response =
    await axios.get(
      `${API}/api/friends/list/${userId}`
    );

  console.log(
    "GET FRIENDS RESPONSE:",
    response.data
  );

  return response.data;
};


// ==========================================
// GET PENDING REQUESTS
// ==========================================

export const getPendingRequests =
  async (userId) => {

    const response =
      await axios.get(
        `${API}/api/friends/pending/${userId}`
      );

    return response.data;
  };


// ==========================================
// SEND FRIEND REQUEST
// ==========================================

export const sendRequest =
  async (
    senderId,
    receiverId
  ) => {

    const response =
      await axios.post(
        `${API}/api/friends/request`,
        {
          senderId,
          receiverId
        }
      );

    return response.data;
  };


// ==========================================
// ACCEPT FRIEND REQUEST
// ==========================================

export const acceptRequest =
  async (id) => {

    const response =
      await axios.put(
        `${API}/api/friends/accept/${id}`
      );

    return response.data;
  };


// ==========================================
// REJECT FRIEND REQUEST
// ==========================================

export const rejectRequest =
  async (id) => {

    const response =
      await axios.put(
        `${API}/api/friends/reject/${id}`
      );

    return response.data;
  };