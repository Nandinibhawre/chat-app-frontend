// import { useEffect, useState } from 'react'

// import { FaSearch }
// from 'react-icons/fa'

// import { motion }
// from 'framer-motion'

// import { getAllUsers }
// from '../services/friendService'

// function ChatSidebar({
//   selectedUser,
//   setSelectedUser
// }) {

//   const [users, setUsers] =
//     useState([])

//   const currentUser =
//     localStorage.getItem(
//       'userEmail'
//     )

//   useEffect(() => {

//     fetchUsers()

//   }, [])

//   const fetchUsers = async () => {

//     try {

//       const data =
//         await getAllUsers()
// // console.log(data)
//       const filteredUsers =
//         data.filter(

//           (user) =>
//             user.email !== currentUser
//         )

//       setUsers(filteredUsers)

//     } catch (error) {

//       console.log(error)
//     }
//   }

//   return (

//     <motion.div
//       initial={{
//         x: -50,
//         opacity: 0
//       }}

//       animate={{
//         x: 0,
//         opacity: 1
//       }}

//       className='chat-sidebar'
//     >

//       <div className='search-box'>

//         <FaSearch className='search-icon' />

//         <input
//           type='text'
//           placeholder='Search chats...'
//         />

//       </div>

//       <div className='chat-users'>

//         {

//           users.map((user) => (

//             <div
//               className='chat-user'

//               key={user.id}

//               onClick={() =>
//                 setSelectedUser(user)
//               }
//             >

//               <img
//                 src={`https://ui-avatars.com/api/?name=${user.username}`}
//                 alt=''
//               />

//               <div>

//                 <h4>
//                   {user.username}
//                 </h4>

//                 <p>
//                   {user.email}
//                 </p>

//               </div>

//             </div>
//           ))
//         }

//       </div>

//     </motion.div>
//   )
// }

// export default ChatSidebar


import { useEffect, useState } from "react";

import { FaSearch } from "react-icons/fa";

import { motion } from "framer-motion";

import {
  getFriends,
  getAllUsers
} from "../services/friendService";


function ChatSidebar({
  selectedUser,
  setSelectedUser
}) {

  const [users, setUsers] =
    useState([]);

  const [search, setSearch] =
    useState("");

  const currentUser =
    localStorage.getItem("userEmail");


  useEffect(() => {

    fetchFriends();

  }, []);


const fetchFriends = async () => {

  try {

    // =================================
    // GET ALL USERS
    // =================================

    const allUsers =
      await getAllUsers();


    console.log(
      "ALL USERS:",
      allUsers
    );


    if (!Array.isArray(allUsers)) {

      console.error(
        "ALL USERS IS NOT ARRAY:",
        allUsers
      );

      setUsers([]);

      return;
    }


    // =================================
    // FIND LOGGED IN USER
    // =================================

    const loggedInUser =
      allUsers.find(
        (user) =>
          user.email === currentUser
      );


    console.log(
      "CURRENT EMAIL:",
      currentUser
    );


    console.log(
      "LOGGED IN USER:",
      loggedInUser
    );


    if (!loggedInUser) {

      console.error(
        "Logged in user not found"
      );

      setUsers([]);

      return;
    }


    // =================================
    // CURRENT USER ID
    // =================================

    const currentUserId =
      loggedInUser.id;


    console.log(
      "CURRENT USER ID:",
      currentUserId
    );


    // =================================
    // GET FRIENDS
    // =================================

    const friends =
      await getFriends(
        currentUserId
      );


    console.log(
      "MY FRIENDS:",
      friends
    );


    // =================================
    // SET FRIENDS
    // =================================

    if (Array.isArray(friends)) {

      setUsers(friends);

    } else {

      console.error(
        "FRIENDS IS NOT ARRAY:",
        friends
      );

      setUsers([]);
    }


  } catch (error) {

    console.error(
      "ERROR FETCHING FRIENDS:",
      error
    );

    setUsers([]);
  }
};

  // --------------------------------
  // SEARCH FRIENDS
  // --------------------------------

  const filteredUsers =
    users.filter((user) => {

      const username =
        user.username
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      const email =
        user.email
          ?.toLowerCase()
          .includes(
            search.toLowerCase()
          );

      return username || email;
    });


  return (

    <motion.div

      initial={{
        x: -50,
        opacity: 0
      }}

      animate={{
        x: 0,
        opacity: 1
      }}

      className="chat-sidebar"
    >


      {/* SEARCH */}

      <div className="search-box">

        <FaSearch
          className="search-icon"
        />

        <input

          type="text"

          placeholder="Search friends..."

          value={search}

          onChange={(e) =>
            setSearch(
              e.target.value
            )
          }

        />

      </div>


      {/* FRIEND LIST */}

      <div className="chat-users">

        {filteredUsers.length === 0 ? (

          <div
            style={{
              textAlign: "center",
              padding: "40px 15px",
              color: "#777"
            }}
          >

            <p>
              No friends found
            </p>

            <small>
              Add friends to start chatting.
            </small>

          </div>

        ) : (

          filteredUsers.map(
            (user) => (

              <div

                className={
                  selectedUser?.id === user.id
                    ? "chat-user active"
                    : "chat-user"
                }

                key={user.id}

                onClick={() =>
                  setSelectedUser(user)
                }

              >

                <img

                  src={
                    `https://ui-avatars.com/api/?name=${encodeURIComponent(
                      user.username
                    )}`
                  }

                  alt=""

                />


                <div>

                  <h4>
                    {user.username}
                  </h4>

                  <p>
                    {user.email}
                  </p>

                </div>

              </div>

            )
          )

        )}

      </div>

    </motion.div>
  );
}


export default ChatSidebar;