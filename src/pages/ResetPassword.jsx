import { useState } from 'react'

import { useSearchParams }
from 'react-router-dom'

import axios from 'axios'

function ResetPassword() {

    const [searchParams] =
        useSearchParams()

    const token =
        searchParams.get('token')

    const [password, setPassword] =
        useState('')

    const handleResetPassword =
        async () => {

            try {

                const response =
                    await axios.post(

                        'https://chat-app-backend-production-54a2.up.railway.app/api/auth/reset-password',

                        {

                            token: token,

                            newPassword: password
                        }
                    )

                alert(response.data)

            } catch (error) {

                console.log(error)

                alert(
                    'Reset Password Failed'
                )
            }
        }

    return (

        <div className='auth-page'>

            <div className='auth-card'>

                <h1>
                    Reset Password
                </h1>

                <p>
                    Enter your new password
                </p>

                <input
                    type='password'

                    placeholder='New Password'

                    value={password}

                    onChange={(e) =>
                        setPassword(
                            e.target.value
                        )
                    }
                />

                <button
                    onClick={
                        handleResetPassword
                    }
                >

                    Reset Password

                </button>

            </div>

        </div>
    )
}

export default ResetPassword