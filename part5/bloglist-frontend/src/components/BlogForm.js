import React, { useState } from 'react'

const BlogForm = ({ createBlog }) => {
  const [title, setTitle] = useState('')
  const [author, setAuthor] = useState('')
  const [url, setUrl] = useState('')

  const handleTitle = (event) => {
    setTitle(event.target.value)
  }
  const handleAuthor = (event) => {
    setAuthor(event.target.value)
  }
  const handleUrl = (event) => {
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
      <form onSubmit={addBlog}>
        <div>
          <b>Title</b><br/>
          <input
            value={title} onChange={handleTitle}
            placeholder='blog title...' />
        </div>
        <div>
          <b>Author</b><br/>
          <input
            value={author} onChange={handleAuthor}
            placeholder='blog author...' />
        </div>
        <div>
          <b>Url</b><br/>
          <input
            value={url} onChange={handleUrl}
            placeholder='blog url...' />
        </div>
        <button type="submit">create</button>
      </form>
      <br/>
    </div>
  )
}

export default BlogForm