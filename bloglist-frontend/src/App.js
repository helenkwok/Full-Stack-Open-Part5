import { useState, useEffect } from 'react'
import Blog from './components/Blog'
import Notification from './components/Notification'
import blogService from './services/blogs'
import loginService from './services/login'

const App = () => {
  const [blogs, setBlogs] = useState([])
  const [message, setMessage] = useState(null)
  const [messageStyle, setMessageStyle] = useState(null)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [user, setUser] = useState(null)
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

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

  const handleLogin = async (event) => {
    event.preventDefault()
    try {
      const user = await loginService.login({
        username, password,
      })
      window.localStorage.setItem(
        'loggedBloglistUser', JSON.stringify(user)
      )

      blogService.setToken(user.token)
      setUser(user)
      setUsername('')
      setPassword('')
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

  const addBlog = async (event) => {
    event.preventDefault()
    try {
      const returnedBlog = await blogService.create({
        title, author, url
      })
      setBlogs(blogs.concat(returnedBlog))
      setMessage(`a new blog ${returnedBlog.title} by ${returnedBlog.author} added`)
      setMessageStyle('notification')
      setTimeout(() => {
        setMessage(null)
        setMessageStyle(null)
      }, 5000)
      setTitle('')
      setAuthor('')
      setUrl('')
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
              type="text"
              value={username}
              name="Username"
              onChange={({ target }) => setUsername(target.value)}
            />
          </div>
          <div>
            password
              <input
              type="password"
              value={password}
              name="Password"
              onChange={({ target }) => setPassword(target.value)}
            />
          </div>
          <button type="submit">login</button>
        </form>
      </div>
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
        <h2>create new</h2>
        <form onSubmit={addBlog}>
          <div>
            title:
              <input
                type="text"
                value={title}
                name="title"
                onChange={({ target }) => setTitle(target.value)}
              />
          </div>
          <div>
            author:
              <input
                type="text"
                value={author}
                name="author"
                onChange={({ target }) => setAuthor(target.value)}
              />
          </div>
          <div>
            url:
              <input
                type="text"
                value={url}
                name="url"
                onChange={({ target }) => setUrl(target.value)}
              />
          </div>
          <button type="submit">create</button>
        </form>
        {blogs.map(blog =>
          <Blog key={blog.id} blog={blog} />
        )}
      </div>
    </div>
  )
}

export default App
