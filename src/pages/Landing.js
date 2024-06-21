import Signup from '../components/landing/Signup'
import { useSignupMutation } from '../api/userApi'

const Landing = () => {

  const [signup, { error }] = useSignupMutation()

  return (
    <Signup signup={signup} error={error} />
  )
}

export default Landing
