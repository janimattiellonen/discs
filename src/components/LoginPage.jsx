import React from 'react'

import LoginForm from './LoginForm'

const LoginPage = ({ login }) => {
  return (
    <div>
      <h1>Login page</h1>

      <LoginForm onLogin={login} />
    </div>
  )
}

export default LoginPage
