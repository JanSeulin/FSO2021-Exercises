import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
import { notificationSet } from '../reducers/notificationReducer'
import { createBlog } from '../reducers/blogReducer'
import { useHistory } from 'react-router'
import {
  TextField,
  Button
} from '@material-ui/core'

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

  const padding = {
    margin: 0,
    padding: 0
  }

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
      <h2 style={padding}>Create new</h2>
      <form onSubmit={addBlog}>
        <div>
          <TextField label="title" {...title} />
        </div>
        <div>
          <TextField label="author" {...author}/>
        </div>
        <div>
          <TextField label="url" {...url}/>
        </div>
        <br/>
        <Button variant="contained" color="primary" id="create-button" type="submit">create</Button>
      </form>
      <br/>
    </div>
  )
}

export default BlogForm