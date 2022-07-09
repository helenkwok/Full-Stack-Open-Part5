import Notification from './Notification'

const LoginForm = ({
  handleLogin,
  handleUsernameChange,
  handlePasswordChange,
  username,
  password,
  message,
  messageStyle
 }) => {
 return (
   <div>
     <h2>log in to application</h2>
        <Notification
          message={message}
          messageStyle={messageStyle}
        />

     <form onSubmit={handleLogin}>
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

export default LoginForm