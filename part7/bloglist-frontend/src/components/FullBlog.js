import React from 'react'
import { notificationSet } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'

const FullBlog = ({ blog }) => {
  const selector = (state) => state.user
  const user = useSelector(selector)

  const dispatch = useDispatch()
  const history = useHistory()

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

  if(!blog) {
    return null
  }

  return (
    <div className="fullBlog">
      <h2>{blog.title}</h2>
      <a href={blog.url}>{blog.url}</a>
      <br/>
      Likes: {blog.likes}&nbsp;
      <button onClick={() => like(blog)} className="likeButton">like</button><br/>
      Added by: <Link to={`/users/${blog.user.id}`}>{blog.user ? blog.user.username : ''}<br/></Link>
      {user ? user.username === blog.user.username ?
        <button style={buttonStyle} onClick={() => removeBlog(blog)} id="remove-button">remove</button>
        : ''
        : ''}
    </div>
  )
}

export default FullBlog