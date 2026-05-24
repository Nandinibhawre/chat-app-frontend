import { Link, useNavigate }
from 'react-router-dom'

import { motion }
from 'framer-motion'

import { useState }
from 'react'

import { registerUser }
from '../services/api'

function Register() {

  const navigate = useNavigate()

  const [formData, setFormData] =
        useState({

          username: '',
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

  const handleRegister = async () => {

    try {

      await registerUser(formData)

      alert('Registration Successful')

      navigate('/')

    } catch (error) {

      console.log(error)

      alert('Registration Failed')
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

        <h1>Create Account</h1>

        <p>
          Start your chatting journey
        </p>

        <input
          type='text'

          name='username'

          placeholder='Full Name'

          value={formData.username}

          onChange={handleChange}
        />

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

        <button onClick={handleRegister}>
          Register
        </button>

        <span>

          Already have an account?

          <Link to='/'>
            Login
          </Link>

        </span>

      </motion.div>

    </div>
  )
}

export default Register