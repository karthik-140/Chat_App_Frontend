import { useState } from 'react'

import Signup from '../components/landing/Signup'
import Login from '../components/landing/Login'
import { useSignupMutation, useLoginMutation } from '../api/userApi'

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false)

  const [signup, { error: signupError }] = useSignupMutation()
  const [login, { error: loginError }] = useLoginMutation()

  return (
    <>
      {showLogin
        ? <Login login={login} error={loginError} setShowLogin={setShowLogin} />
        : <Signup signup={signup} error={signupError} setShowLogin={setShowLogin} />
      }
    </>
  )
}

export default Landing
