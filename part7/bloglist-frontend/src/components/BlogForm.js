import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notificationSet } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router'

const useField = (type) => {

  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  return {
    type,
    value,
    onChange
  }
}

const BlogForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()

  const title = useField('text')
  const author = useField('text')
  const url = useField('text')

  const addBlog = (event) => {
    event.preventDefault()
    const newBlog = {
      title: title.value,
      author: author.value,
      url: url.value
    }
    dispatch(createBlog(newBlog))
    dispatch(notificationSet(`New blog "${newBlog.title}" by "${newBlog.author}" added`, 5))
    history.push('/blogs')
  }

  return (
    <div>
      <form onSubmit={addBlog}>
        <div>
          <b>Title</b><br/>
          <input {...title} />
        </div>
        <div>
          <b>Author</b><br/>
          <input {...author}/>
        </div>
        <div>
          <b>Url</b><br/>
          <input {...url}/>
        </div>
        <button id="create-button" type="submit">create</button>
      </form>
      <br/>
    </div>
  )
}

export default BlogForm