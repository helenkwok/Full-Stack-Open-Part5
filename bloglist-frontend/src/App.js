import { useState, useEffect, useRef } from 'react'
import Blog from './components/Blog'
import BlogForm from './components/BlogForm'
import LoginForm from './components/LoginForm'
import Notification from './components/Notification'
import Togglable from './components/Togglable'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState(null)
  const [user, setUser] = useState(null)

  const blogFormRef = useRef()

  useEffect(() => {
    blogService.getAll().then(blogs =>
      setBlogs( blogs )
    )
  }, [])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBloglistUser')
    if (loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      setUser(user)
      blogService.setToken(user.token)
    }
  }, [])

  const handleLogin = async (userObject) => {
    try {
      const user = await loginService.login(userObject)
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
    } catch (exception) {
      setMessageStyle('error')
      setMessage('wrong username or password')
      setTimeout(() => {
        setMessage(null)
        setMessageStyle(null)
      }, 5000)
    }
  }

  const handleLogout = () => {
    window.localStorage.clear()
    setUser(null)
  }

  const createBlog = async (blogObject) => {
    blogFormRef.current.toggleVisibility()
    try {
      const returnedBlog = await blogService.create(blogObject)

      setBlogs(blogs.concat(returnedBlog))

      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setMessageStyle('notification')

      setTimeout(() => {
        setMessage(null)
        setMessageStyle(null)
      }, 5000)
    } catch (exception) {
      setMessage('Failed to create new blog')
      setMessageStyle('error')

      setTimeout(() => {
        setMessage(null)
        setMessageStyle(null)
      }, 5000)
    }
  }

  if (user === null) {
    return (
      <LoginForm
        handleLogin={handleLogin}
        message={message}
        messageStyle={messageStyle}
      />
    )
  }

  return (
    <div>
      <div>
        <h2>blogs</h2>
        <Notification
          message={message}
          messageStyle={messageStyle}
        />
        <p>{user.name} logged in
          <button
            onClick={handleLogout}
          >
            logout
          </button>
        </p>
        <Togglable
          buttonLabel='new note'
          ref={blogFormRef}
        >
          <BlogForm createBlog={createBlog} />
        </Togglable>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
