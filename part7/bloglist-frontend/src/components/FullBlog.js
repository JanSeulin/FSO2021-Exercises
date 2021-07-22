import React, { useState } from 'react'
import { notificationSet } from '../reducers/notificationReducer'
import { useDispatch, useSelector } from 'react-redux'
import { likeBlog, deleteBlog, addComment } from '../reducers/blogReducer'
import { Link } from 'react-router-dom'
import { useHistory } from 'react-router'
import { initializeBlogs } from '../reducers/blogReducer'
import {
  Button,
  IconButton,
  TextField,
  List,
  ListItem,
  ListItemIcon
} from '@material-ui/core'
import DeleteIcon from '@material-ui/icons/Delete'
import ThumbUpAltIcon from '@material-ui/icons/ThumbUpAlt'
import CommentIcon from '@material-ui/icons/Comment'

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
    if (comment.length < 3) {
      dispatch(notificationSet('Comments must be at least three characters long', 5))
    } else {
      newComment.reset()
      dispatch(addComment(id, { comment }))
      dispatch(initializeBlogs())
    }
  }

  console.log(blog)

  const paragraphStyle = {
    fontSize: 18
  }

  if(!blog || !user) {
    return null
  }

  return (
    <div>
      <div className="fullBlog">
        <h1>{blog.title}</h1>
        <p style={paragraphStyle}><a href={blog.url}>{blog.url}</a>
          <br/>
        Likes: {blog.likes}&nbsp;
          <IconButton
            aria-label="thumbsup"
            color="primary"
            size="small"
            onClick={() => like(blog)} className="likeButton">
            <ThumbUpAltIcon />
          </IconButton><br/>
        Added by: <Link to={`/users/${blog.user.id}`}>{blog.user.username}</Link><br/></p>
        {user ? user.username === blog.user.username ?
          <Button variant="contained"
            color="secondary"
            startIcon={<DeleteIcon />}
            onClick={() => removeBlog(blog)} id="remove-button">remove</Button>
          : ''
          : ''}
      </div>
      <div>
        <h2>Comments</h2>
        <form onSubmit={event => addNewComment(event, blog.id, newComment.value)}>
          <div>
            <TextField label="Share your thoughts!" {...commentCopy} /><br/>
            <Button color="primary" variant="contained" type="submit">comment</Button>
          </div>
        </form>

        {blog.comments.length > 0 ?
          <List>
            {blog.comments.map((comment, index) =>
              <ListItem key={index}>
                <ListItemIcon>
                  <CommentIcon />
                </ListItemIcon>
                {comment}
              </ListItem>
            )}
          </List>
          : <div>no comments</div>
        }

      </div>
    </div>
  )
}

export default FullBlog