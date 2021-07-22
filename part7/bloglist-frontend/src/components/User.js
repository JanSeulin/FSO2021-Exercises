import React from 'react'
import { Link } from 'react-router-dom'
import {
  List,
  ListItem,
  ListItemIcon
} from '@material-ui/core'
import ArrowRightIcon from '@material-ui/icons/ArrowRight'

const User = ({ user }) => {
  console.log(user)
  if(!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h4>Added blogs</h4>
      <List>
        {user.blogs.map(blog =>
          <ListItem key={blog.id}>
            <ListItemIcon>
              <ArrowRightIcon />
            </ListItemIcon>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </ListItem>
        )}
      </List>
    </div>
  )
}

export default User