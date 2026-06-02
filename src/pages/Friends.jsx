import { useEffect, useState } from "react";

// import Sidebar from "../components/FriendSidebar";
import SearchUsers from "../components/SearchUsers";
import FriendRequests from "../components/FriendRequests";
import FriendsList from "../components/FriendsList";

import {
  getFriends,
  getPendingRequests,
  sendRequest,
  acceptRequest,
  rejectRequest,
  getAllUsers,
} from "../services/friendService";

import "../styles/Friends.css";

function Friends() {
  const currentUser = {
    id: localStorage.getItem("userId"),
    username: localStorage.getItem("username"),
    email: localStorage.getItem("userEmail"),
  };

  const [users, setUsers] = useState([]);
  const [friends, setFriends] = useState([]);
  const [requests, setRequests] = useState([]);
  const [activeTab, setActiveTab] = useState("users");

  const loadData = async () => {
    try {
      if (!currentUser.id) {
        console.log("User ID not found");
        return;
      }

      const friendsRes = await getFriends(currentUser.id);
      const requestsRes = await getPendingRequests(currentUser.id);
      const usersRes = await getAllUsers();

      setFriends(friendsRes.data || []);
      setRequests(requestsRes.data || []);

      const allUsers = usersRes.data || [];

      const filteredUsers = allUsers.filter(
        (user) =>
          user._id !== currentUser.id &&
          user.id !== currentUser.id
      );

      setUsers(filteredUsers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleSendRequest = async (receiverId) => {
    try {
      await sendRequest(currentUser.id, receiverId);

      alert("Friend Request Sent");

      loadData();
    } catch (error) {
      console.error(error);
      alert("Failed to send request");
    }
  };

  const handleAccept = async (requestId) => {
    try {
      await acceptRequest(requestId);

      alert("Friend Request Accepted");

      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  const handleReject = async (requestId) => {
    try {
      await rejectRequest(requestId);

      alert("Friend Request Rejected");

      loadData();
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    loadData();
  }, []);

  return (
    <div className="friends-layout">
      {/* <Sidebar /> */}

      <div className="friends-page">

        <div className="friends-header">
          <h1>👥 Friends</h1>
          <p>Manage your friends and requests</p>
        </div>

        <div className="friends-tabs">

          <button
            className={
              activeTab === "users"
                ? "tab active"
                : "tab"
            }
            onClick={() => setActiveTab("users")}
          >
            Add Friends
          </button>

          <button
            className={
              activeTab === "requests"
                ? "tab active"
                : "tab"
            }
            onClick={() => setActiveTab("requests")}
          >
            Requests ({requests.length})
          </button>

          <button
            className={
              activeTab === "friends"
                ? "tab active"
                : "tab"
            }
            onClick={() => setActiveTab("friends")}
          >
            My Friends ({friends.length})
          </button>

        </div>

        <div className="tab-content">

          {activeTab === "users" && (
            <>
              <h2>Add Friends</h2>

              <SearchUsers
                users={users}
                currentUser={currentUser}
                onSendRequest={handleSendRequest}
              />
            </>
          )}

          {activeTab === "requests" && (
            <>
              <h2>Pending Requests</h2>

              <FriendRequests
                requests={requests}
                onAccept={handleAccept}
                onReject={handleReject}
              />
            </>
          )}

          {activeTab === "friends" && (
            <>
              <h2>My Friends</h2>

              <FriendsList
                friends={friends}
              />
            </>
          )}

        </div>

      </div>
    </div>
  );
}

export default Friends;