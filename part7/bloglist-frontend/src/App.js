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

import {
  Container,
  Button,
  AppBar,
  Toolbar
}from '@material-ui/core'


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

  //const padding = {
  //  padding: 5
  //}

  const redirect = (e) => {
    e.preventDefault()
    history.push('/create')
  }

  return (
    <Container>
      <div>
        <AppBar position="static">
          <Toolbar>
            <Button color="inherit" component={Link} to="/">
              home
            </Button>
            <Button color="inherit" component={Link} to="/blogs">
              blogs
            </Button>
            <Button color="inherit" component={Link} to="/users">
              users
            </Button>
            {user
              ?
              <div>
                <em>{user.username} logged in</em>
                <button onClick={() => dispatch(logoutUser())}>logout</button>
              </div>
              : <Button color="inherit" component={Link} to="/login">
                login
              </Button>
            }
          </Toolbar>
        </AppBar>
        <br/>
        {user ?
          <form onSubmit={redirect}>
            <input type="submit" value="create"/>
          </form> : ''}
        <hr/>
        <Notification />
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
    </Container>
  )
}

export default App