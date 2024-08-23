import React from 'react'
import Background from './components/login/Background'
import SigninForm from './components/login/SigninForm'

const SignIn: React.FC = () => {
  return (
    <main>
      <Background />
      <SigninForm />
    </main>
  )
}

export default SignIn