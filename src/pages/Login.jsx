import { Link, useNavigate }
from 'react-router-dom'

import { motion }
from 'framer-motion'

import { useState }
from 'react'

import { loginUser }
from '../services/api'

function Login() {

  const navigate = useNavigate()

  const [formData, setFormData] =
    useState({

      email: '',
      password: ''
    })

  const handleChange = (e) => {

    setFormData({

      ...formData,

      [e.target.name]:
        e.target.value
    })
  }

  const handleLogin = async () => {

    try {

      // API CALL

     const response =
  await loginUser(formData)

console.log(response)

      // STORE TOKEN

 localStorage.setItem(
  'token',
  response.token
)

localStorage.setItem(
  'userEmail',
  response.email
)

localStorage.setItem(
  'username',
  response.username
)

      alert('Login Successful')

      navigate('/chat')

    } catch (error) {

      console.log(error)

      alert('Invalid Credentials')
    }
  }

  return (

    <div className='auth-page'>

      <motion.div

        initial={{
          scale: 0.8,
          opacity: 0
        }}

        animate={{
          scale: 1,
          opacity: 1
        }}

        className='auth-card'
      >

        <h1>
          Welcome Back
        </h1>

        <p>
          Login to continue chatting
        </p>

        <input
          type='email'

          name='email'

          placeholder='Email Address'

          value={formData.email}

          onChange={handleChange}
        />

        <input
          type='password'

          name='password'

          placeholder='Password'

          value={formData.password}

          onChange={handleChange}
        />

        <button
          onClick={handleLogin}
        >

          Login

        </button>

        <span>

          Don’t have an account?

          <Link to='/register'>
            Register
          </Link>

        </span>

      </motion.div>

    </div>
  )
}

export default Login