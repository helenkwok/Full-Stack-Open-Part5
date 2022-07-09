import React from 'react'

const BlogForm = ({
  showWhenVisible,
  addBlog,
  handleCancel,
  handleTitle,
  handleAuthor,
  handleUrl,
  title,
  author,
  url
}) => {
  return (
    <div style={showWhenVisible}>
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
      <button
        onClick={handleCancel}
      >cancel</button>
    </div>
  )
}

export default BlogForm