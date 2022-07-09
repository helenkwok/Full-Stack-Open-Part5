import { useState } from 'react'

const BlogForm = ({
  createBlog
}) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle= (event) => {
    setTitle(event.target.value)
  }
  const handleAuthor= (event) => {
    setAuthor(event.target.value)
  }
  const handleUrl= (event) => {
    setUrl(event.target.value)
  }
  const addBlog = (event) => {
    event.preventDefault()

    createBlog({
      title: title,
      author: author,
      url: url
    })

    setTitle('')
    setAuthor('')
    setUrl('')
  }

  return (
    <div>
      <h2>create new</h2>
      <form onSubmit={addBlog}>
        <div>
          title:
            <input
              type="text"
              value={title}
              name="title"
              onChange={handleTitle}
            />
        </div>
        <div>
          author:
            <input
              type="text"
              value={author}
              name="author"
              onChange={handleAuthor}
            />
        </div>
        <div>
          url:
            <input
              type="text"
              value={url}
              name="url"
              onChange={handleUrl}
            />
        </div>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default BlogForm