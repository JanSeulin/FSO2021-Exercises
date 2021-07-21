import React, { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { Link } from 'react-router-dom'
import { initializeUsers } from '../reducers/usersReducer'
import {
  TableContainer,
  Table,
  TableBody,
  TableCell,
  TableRow,
  Paper,
  TableHead
} from '@material-ui/core'


const Users = () => {
  const selector = (state) => state.users
  const users = useSelector(selector)
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  return (
    <div>
      <h2>Users</h2>
      <TableContainer component={Paper}>
        <Table>
          <TableHead>
            <TableRow>
              <TableCell>User</TableCell>
              <TableCell>Total Blogs</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {users
              .map(user => (
                <TableRow key={user.id}>
                  <TableCell>
                    <Link to={`/users/${user.id}`}>{user.username}</Link>
                  </TableCell>
                  <TableCell>
                    {user.blogs.length}
                  </TableCell>
                </TableRow>
              ))
            }
          </TableBody>
        </Table>
      </TableContainer>
    </div>
  )
}


export default Users