import { useState } from 'react'
import SignInForm from '../components/SignInForm'
import SignUpForm from '../components/SignUpForm'

export default function AuthPage({ setUser }) {
  const [showLogin, setShowLogin] = useState(true)

  return (
    <main>
      {showLogin ? (
        <SignInForm
          setUser={setUser}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
        />
      ) : (
        <SignUpForm
          setUser={setUser}
          showLogin={showLogin}
          setShowLogin={setShowLogin}
        />
      )}
    </main>
  )
}
