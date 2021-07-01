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
          <input id="title-input"
            value={title} onChange={handleTitle}
            placeholder='blog title...' className="title"/>
        </div>
        <div>
          <b>Author</b><br/>
          <input id="author-input"
            value={author} onChange={handleAuthor}
            placeholder='blog author...' className="author"/>
        </div>
        <div>
          <b>Url</b><br/>
          <input id="url-input"
            value={url} onChange={handleUrl}
            placeholder='blog url...' className="url"/>
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
      <br/>
    </div>
  )
}

export default BlogForm