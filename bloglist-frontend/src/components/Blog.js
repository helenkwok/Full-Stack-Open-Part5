import { useState } from 'react'

const Blog = ({ blog, user, addLike, removeBlog }) => {
  const [visible, setVisible] = useState(false)
  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  const showWhenVisible = { display: visible ? '' : 'none' }

  const toggleVisibility = () => {
    setVisible(!visible)
  }

  const blogAddLike = {
    id: blog.id,
    user: blog.user.id,
    title: blog.title,
    author: blog.author,
    url: blog.url,
    likes: blog.likes + 1
  }

  return (
    <div style={blogStyle}>
      <div>
        {blog.title} {blog.author}
        <button onClick={toggleVisibility}>
          {visible? 'hide' : 'view'}
        </button>
      </div>
      <div style={showWhenVisible}>
        {blog.url}
        <br />
        likes {blog.likes}
        <button onClick={() => addLike(blogAddLike)}>like</button>
        <br />
        {blog.user.name}
        <br />
        <button
          style={{ display: user.name === blog.user.name & visible? '' : 'none' }}
          onClick={() => removeBlog(blog)}
        >
          remove
        </button>
      </div>
    </div>
  )}

export default Blog