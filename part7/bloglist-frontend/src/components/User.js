import React from 'react'
import { Link } from 'react-router-dom'

const User = ({ user }) => {
  console.log(user)
  if(!user) {
    return null
  }

  return (
    <div>
      <h2>{user.username}</h2>
      <h4>Added blogs</h4>
      <ul>
        {user.blogs.map(blog =>
          <li key={blog.id}>
            <Link to={`/blogs/${blog.id}`}>{blog.title}</Link>
          </li>
        )}
      </ul>
    </div>
  )
}

export default User