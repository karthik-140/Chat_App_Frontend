import { useState } from 'react'

import { useSignupMutation, useLoginMutation } from '../api/userApi'
import Signup from '../components/landing/Signup'
import Login from '../components/landing/Login'
import Header from '../components/header/Header'

const Landing = () => {
  const [showLogin, setShowLogin] = useState(false)

  const [signup, { error: signupError }] = useSignupMutation()
  const [login, { error: loginError }] = useLoginMutation()

  return (
    <>
      <Header />
      {showLogin
        ? <Login login={login} error={loginError} setShowLogin={setShowLogin} />
        : <Signup signup={signup} error={signupError} setShowLogin={setShowLogin} />
      }
    </>
  )
}

export default Landing
