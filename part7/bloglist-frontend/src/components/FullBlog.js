import React, { useState } from 'react'
import { notificationSet } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { initializeBlogs } from '../reducers/blogReducer'

const useField = (type) => {
  const [value, setValue] = useState('')

  const onChange = (event) => {
    setValue(event.target.value)
  }

  const reset = () => {
    setValue('')
  }

  return {
    type,
    value,
    onChange,
    reset
  }
}

const FullBlog = ({ blog }) => {
  const selector = (state) => state.user
  const user = useSelector(selector)

  const dispatch = useDispatch()
  const history = useHistory()
  const newComment = useField('text')

  const commentCopy = Object.assign({}, newComment)
  delete commentCopy.reset

  const buttonStyle = {
    color: 'white',
    backgroundColor: 'red',
    fontWeight: 'bold'
  }

  const like = (blog) => {
    dispatch(likeBlog(blog))
  }

  const removeBlog = (blog) => {
    const confirmation = confirm(`Do you really want to delete ${blog.author}?`)
    if (confirmation) {
      dispatch(deleteBlog(blog))
      history.push('/blogs')
      dispatch(notificationSet(`Blog ${blog.title} by ${blog.author} deleted`, 5))
    }
  }

  const addNewComment = async (event, id, comment) => {
    event.preventDefault()

    newComment.reset()
    dispatch(addComment(id, { comment }))
    dispatch(initializeBlogs())
  }

  console.log(blog)

  if(!blog || !user) {
    return null
  }

  return (
    <div>
      <div className="fullBlog">
        <h2>{blog.title}</h2>
        <a href={blog.url}>{blog.url}</a>
        <br/>
        Likes: {blog.likes}&nbsp;
        <button onClick={() => like(blog)} className="likeButton">like</button><br/>
        Added by: <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link><br/>
        {user ? user.username === blog.user.username ?
          <button style={buttonStyle} onClick={() => removeBlog(blog)} id="remove-button">remove</button>
          : ''
          : ''}
      </div>
      <div>
        <h2>Comments</h2>
        <form onSubmit={event => addNewComment(event, blog.id, newComment.value)}>
          <div>
            <input {...commentCopy} />
            <button type="submit">new</button>
          </div>
        </form>

        {blog.comments.length > 0 ?
          <ul>
            {blog.comments.map((comment, index) =>
              <li key={index}>{comment}</li>
            )}
          </ul>
          : <div>no comments</div>
        }

      </div>
    </div>
  )
}

export default FullBlog