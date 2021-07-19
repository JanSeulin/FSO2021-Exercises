import React from 'react'
import { useSelector } from 'react-redux'
import { Link } from 'react-router-dom'

const Users = () => {
  const selector = (state) => state.users
  const users = useSelector(selector)

  const padding = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    paddingRight : 15
  }

  const style = {
    border: '1px solid black',
    borderCollapse: 'collapse'
  }

  const table = {
    border: '1px solid black',
    borderCollapse: 'collapse',
    width: '40%'
  }

  return (
    <div>
      <h2>Users</h2>
      <table style={table}>
        <tr >
          <th style={padding}>Username</th>
          <th style={style}>Total Blogs</th>
        </tr>
        {users.map(user =>
          <tr key={user.id} style={style}>
            <td style={style}>
              <Link to={`/users/${user.id}`}>{user.username}</Link>
            </td>
            <td>
              {user.blogs.length}
            </td>
          </tr>
        )}
      </table>
    </div>
  )
}

export default Users