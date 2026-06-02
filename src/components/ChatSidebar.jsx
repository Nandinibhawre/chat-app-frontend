import { useEffect, useState } from 'react'

import { FaSearch }
from 'react-icons/fa'

import { motion }
from 'framer-motion'

import { getAllUsers }
from '../services/api'

function ChatSidebar({
  selectedUser,
  setSelectedUser
}) {

  const [users, setUsers] =
    useState([])

  const currentUser =
    localStorage.getItem(
      'userEmail'
    )

  useEffect(() => {

    fetchUsers()

  }, [])

  const fetchUsers = async () => {

    try {

      const data =
        await getAllUsers()
// console.log(data)
      const filteredUsers =
        data.filter(

          (user) =>
            user.email !== currentUser
        )

      setUsers(filteredUsers)

    } catch (error) {

      console.log(error)
    }
  }

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

      className='chat-sidebar'
    >

      <div className='search-box'>

        <FaSearch className='search-icon' />

        <input
          type='text'
          placeholder='Search chats...'
        />

      </div>

      <div className='chat-users'>

        {

          users.map((user) => (

            <div
              className='chat-user'

              key={user.id}

              onClick={() =>
                setSelectedUser(user)
              }
            >

              <img
                src={`https://ui-avatars.com/api/?name=${user.username}`}
                alt=''
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
          ))
        }

      </div>

    </motion.div>
  )
}

export default ChatSidebar