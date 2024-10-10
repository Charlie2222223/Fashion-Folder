import React from 'react'
import Background from '../Background'
import SigninForm from '../user_auth/signin/SigninForm'

const SignIn: React.FC = () => {
  return (
    <main>
      <Background />
      <SigninForm />
    </main>
  )
}

export default SignIn