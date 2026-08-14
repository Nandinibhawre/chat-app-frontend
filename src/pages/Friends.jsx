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

  // ----------------------------------------
  // HELPER
  // ----------------------------------------

  const getResponseData = (response) => {

    // If service returns array directly
    if (Array.isArray(response)) {
      return response;
    }

    // If service returns Axios response
    if (Array.isArray(response?.data)) {
      return response.data;
    }

    return [];
  };

  // ----------------------------------------
  // LOAD ALL DATA
  // ----------------------------------------

  const loadData = async () => {

    try {

      if (!currentUser.id) {

        console.log("User ID not found");

        return;
      }

      console.log(
        "CURRENT USER ID:",
        currentUser.id
      );

      // ------------------------------------
      // GET FRIENDS
      // ------------------------------------

      const friendsRes =
        await getFriends(
          currentUser.id
        );

      console.log(
        "GET FRIENDS RESPONSE:",
        friendsRes
      );

      const friendsData =
        getResponseData(
          friendsRes
        );

      console.log(
        "FRIENDS DATA:",
        friendsData
      );

      // ------------------------------------
      // GET PENDING REQUESTS
      // ------------------------------------

      const requestsRes =
        await getPendingRequests(
          currentUser.id
        );

      console.log(
        "GET REQUESTS RESPONSE:",
        requestsRes
      );

      const requestsData =
        getResponseData(
          requestsRes
        );

      console.log(
        "REQUESTS DATA:",
        requestsData
      );

      // ------------------------------------
      // GET ALL USERS
      // ------------------------------------

      const usersRes =
        await getAllUsers();

      console.log(
        "GET ALL USERS RESPONSE:",
        usersRes
      );

      const allUsers =
        getResponseData(
          usersRes
        );

      console.log(
        "ALL USERS:",
        allUsers
      );

      // ------------------------------------
      // SET FRIENDS
      // ------------------------------------

      setFriends(
        friendsData
      );

      // ------------------------------------
      // SET REQUESTS
      // ------------------------------------

      setRequests(
        requestsData
      );

      // ------------------------------------
      // FILTER USERS
      // ------------------------------------

      const filteredUsers =
        allUsers.filter(
          (user) => {

            const userId =
              user.id ||
              user._id;

            return (
              userId !==
                currentUser.id &&
              user.email !==
                currentUser.email
            );
          }
        );

      setUsers(
        filteredUsers
      );

    } catch (error) {

      console.error(
        "LOAD DATA ERROR:",
        error
      );

    }
  };

  // ----------------------------------------
  // FETCH REQUESTS AGAIN
  // ----------------------------------------

  const fetchRequests = async () => {

    try {

      if (!currentUser.id) {
        return;
      }

      const response =
        await getPendingRequests(
          currentUser.id
        );

      const data =
        getResponseData(
          response
        );

      setRequests(
        data
      );

    } catch (error) {

      console.error(
        "FETCH REQUESTS ERROR:",
        error
      );

    }
  };

  // ----------------------------------------
  // SEND FRIEND REQUEST
  // ----------------------------------------

  const handleSendRequest =
    async (receiverId) => {

      try {

        await sendRequest(
          currentUser.id,
          receiverId
        );

        alert(
          "Friend Request Sent"
        );

        await loadData();

      } catch (error) {

        console.error(
          "SEND REQUEST ERROR:",
          error
        );

        alert(
          "Failed to send request"
        );
      }
    };

  // ----------------------------------------
  // ACCEPT FRIEND REQUEST
  // ----------------------------------------

  const handleAccept =
    async (requestId) => {

      try {

        await acceptRequest(
          requestId
        );

        alert(
          "Friend Request Accepted"
        );

        await loadData();

      } catch (error) {

        console.error(
          "ACCEPT REQUEST ERROR:",
          error
        );
      }
    };

  // ----------------------------------------
  // REJECT FRIEND REQUEST
  // ----------------------------------------

  const handleReject =
    async (requestId) => {

      try {

        await rejectRequest(
          requestId
        );

        alert(
          "Friend Request Rejected"
        );

        await loadData();

      } catch (error) {

        console.error(
          "REJECT REQUEST ERROR:",
          error
        );
      }
    };

  // ----------------------------------------
  // LOAD DATA WHEN PAGE OPENS
  // ----------------------------------------

  useEffect(() => {

    loadData();

  }, []);

  // ----------------------------------------
  // UI
  // ----------------------------------------

  return (

    <div className="friends-layout">

      {/* <Sidebar /> */}

      <div className="friends-page">

        {/* HEADER */}

        <div className="friends-header">

          <h1>
            👥 Friends
          </h1>

          <p>
            Manage your friends and requests
          </p>

        </div>

        {/* TABS */}

        <div className="friends-tabs">

          {/* ADD FRIENDS */}

          <button
            className={
              activeTab === "users"
                ? "tab active"
                : "tab"
            }
            onClick={() =>
              setActiveTab("users")
            }
          >
            Add Friends
          </button>

          {/* REQUESTS */}

          <button
            className={
              activeTab === "requests"
                ? "tab active"
                : "tab"
            }
            onClick={() =>
              setActiveTab("requests")
            }
          >
            Requests ({requests.length})
          </button>

          {/* MY FRIENDS */}

          <button
            className={
              activeTab === "friends"
                ? "tab active"
                : "tab"
            }
            onClick={() =>
              setActiveTab("friends")
            }
          >
            My Friends ({friends.length})
          </button>

        </div>

        {/* TAB CONTENT */}

        <div className="tab-content">

          {/* -------------------------------- */}
          {/* ADD FRIENDS */}
          {/* -------------------------------- */}

          {activeTab === "users" && (

            <>

              <h2>
                Add Friends
              </h2>

              <SearchUsers
                users={users}
                currentUser={currentUser}
                onSendRequest={
                  handleSendRequest
                }
              />

            </>

          )}

          {/* -------------------------------- */}
          {/* REQUESTS */}
          {/* -------------------------------- */}

          {activeTab === "requests" && (

            <>

              <h2>
                Pending Requests
              </h2>

              <FriendRequests
                requests={requests}
                refresh={fetchRequests}
                acceptRequest={
                  handleAccept
                }
                rejectRequest={
                  handleReject
                }
              />

            </>

          )}

          {/* -------------------------------- */}
          {/* FRIENDS */}
          {/* -------------------------------- */}

          {activeTab === "friends" && (

            <>

              <h2>
                My Friends
              </h2>

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