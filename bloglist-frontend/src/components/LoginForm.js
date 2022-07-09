import { useState } from 'react'
import PropTypes from 'prop-types'
import Notification from './Notification'

const LoginForm = ({
  handleLogin,
  message,
  messageStyle
}) => {
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')

  const handleUsernameChange = (event) => {
    setUsername(event.target.value)
  }
  const handlePasswordChange = (event) => {
    setPassword(event.target.value)
  }

  const loginInput = (event) => {
    event.preventDefault()

    handleLogin({
      username: username,
      password: password
    })

    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <h2>log in to application</h2>
      <Notification
        message={message}
        messageStyle={messageStyle}
      />

      <form onSubmit={loginInput}>
        <div>
         username
          <input
            value={username}
            onChange={handleUsernameChange}
          />
        </div>
        <div>
         password
          <input
            type="password"
            value={password}
            onChange={handlePasswordChange}
          />
        </div>
        <button type="submit">login</button>
      </form>
    </div>
  )
}

LoginForm.propTypes = {
  handleLogin: PropTypes.func.isRequired,
}

export default LoginForm