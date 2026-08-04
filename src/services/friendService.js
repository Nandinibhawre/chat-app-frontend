import axios from "axios";

// const API =
//   "https://chat-app-backend-production-54a2.up.railway.app";

  const API =
  "https://chat-app-backend-production-d1df.up.railway.app";

  export const getPendingRequests = (userId) =>
  axios.get(`${API}/api/friends/pending/${userId}`);

export const getFriends = (userId) =>
  axios.get(`${API}/api/friends/list/${userId}`);

export const sendRequest = (senderId, receiverId) =>
  axios.post(`${API}/api/friends/request`, {
    senderId,
    receiverId,
  });

  export const getAllUsers = () =>
  axios.get(`${API}/api/auth/users`);

export const acceptRequest = (id) =>
  axios.put(`${API}/api/friends/accept/${id}`);

export const rejectRequest = (id) =>
  axios.put(`${API}/api/friends/reject/${id}`);