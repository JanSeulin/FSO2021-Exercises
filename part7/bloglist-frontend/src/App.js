import React, { useEffect } from 'react'
//import ReactDOM from 'react-dom'
import Blogs from './components/Blogs'
import Notification from './components/Notification'
import LoginForm from './components/LoginForm'
import BlogForm from './components/BlogForm'
import Users from './components/Users'
import User from './components/User'
import FullBlog from './components/FullBlog'
import Home from './components/Home'

import { useDispatch, useSelector } from 'react-redux'
import { initializeBlogs } from './reducers/blogReducer'
import { initializeUsers } from './reducers/usersReducer'
import { getUser, logoutUser } from './reducers/userReducer'

import {
  Switch,
  Route,
  Link,
  Redirect,
  useRouteMatch,
  useHistory,
} from 'react-router-dom'

const App = () => {
  const dispatch = useDispatch()
  const selector = (state) => state.user
  const user = useSelector(selector)

  const storeSelector = (state) => state
  const store = useSelector(storeSelector)
  const history = useHistory()

  useEffect(() => {
    dispatch(initializeBlogs())
  }, [dispatch])

  useEffect(() => {
    dispatch(initializeUsers())
  }, [dispatch])

  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      const user = JSON.parse(loggedUserJSON)
      //console.log(user)
      dispatch(getUser(user))
    }
  }, [dispatch])


  const userMatch = useRouteMatch('/users/:id')
  const matchedUser = userMatch
    ? store.users.find(user => user.id === (userMatch.params.id))
    : null

  const blogMatch = useRouteMatch('/blogs/:id')
  const matchedBlog = blogMatch
    ? store.blogs.find(blog => blog.id === (blogMatch.params.id))
    : null

  const padding = {
    padding: 5
  }

  const redirect = (e) => {
    e.preventDefault()
    history.push('/create')
  }

  return (
    <div className="container">
      <div>
        <h1>Blogs</h1>
        <Notification />
        <div>
          <Link style={padding} to={'/'} >Home</Link>
          <Link style={padding} to={'/blogs'}>Blogs</Link>
          <Link style={padding} to={'/users'}>Users</Link>
          {user ? '' : <Link to={'/login'}>login</Link> }
          {user ?
            <span><i>welcome back, {user.username}!</i>
              <button onClick={() => dispatch(logoutUser())}>logout</button>
            </span>
            : null
          }
        </div>
        {user ?
          <form onSubmit={redirect}>
            <input type="submit" value="create-new" />
          </form> : ''}
        <hr/>
      </div>

      <Switch>
        <Route path="/create">
          <BlogForm />
        </Route>
        <Route path="/users/:id">
          <User user={matchedUser} />
        </Route>
        <Route path="/users">
          {user ? <Users /> : <Redirect to="/login" />}
        </Route>
        <Route path="/login">
          <LoginForm />
        </Route>
        <Route path ="/blogs/:id">
          <FullBlog blog={matchedBlog} />
        </Route>
        <Route path="/blogs">
          <Blogs user={user} />
        </Route>
        <Route path="/">
          <Home />
        </Route>
      </Switch>
    </div>
  )
}

export default App