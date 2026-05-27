import { Link, useNavigate }
from 'react-router-dom'

import { motion }
from 'framer-motion'

import { useState }
from 'react'

import {
  loginUser,
  forgotPassword
}
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

  // ================= LOGIN =================

  const handleLogin = async () => {

    try {

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

  // ================= FORGOT PASSWORD =================

  const handleForgotPassword =
    async () => {

      if (!formData.email) {

        alert(
          'Please enter your email first'
        )

        return
      }

      try {

        const response =
          await forgotPassword(
            formData.email
          )

        alert(response)

      } catch (error) {

        console.log(error)

        alert(
          'Failed to send reset link'
        )
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

        {/* FORGOT PASSWORD */}

        <div
          style={{
            width: '100%',
            textAlign: 'right',
            marginBottom: '15px'
          }}
        >

          <span

            onClick={
              handleForgotPassword
            }

            style={{
              color: '#6C63FF',
              cursor: 'pointer',
              fontSize: '14px',
              fontWeight: '600'
            }}
          >

            Forgot Password?

          </span>

        </div>

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