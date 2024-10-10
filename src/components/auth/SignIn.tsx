import React from 'react'
import Background from '../Background'
import SigninForm from '../userAuth/signin/SigninForm'

const SignIn: React.FC = () => {
  return (
    <main>
      <Background />
      <SigninForm />
    </main>
  )
}

export default SignIn