import { useState } from 'react'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'

interface Props {
  setUser: React.Dispatch<any>
}

export default function AuthPage(props: Props) {
  const { setUser } = props
  const [showLogin, setShowLogin] = useState(true)

  return (
    <main>
      {showLogin ? (
        <SignInForm setUser={setUser} setShowLogin={setShowLogin} />
      ) : (
        <SignUpForm setUser={setUser} setShowLogin={setShowLogin} />
      )}
    </main>
  )
}
