import React, { useState, useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { notificationSet } from '../reducers/notificationReducer'
import { loginUser, getUser } from '../reducers/userReducer'
import { useHistory } from 'react-router'

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

const LoginForm = () => {
  const dispatch = useDispatch()
  const history = useHistory()
  const selector = (state) => state.user
  let loggedUser = useSelector(selector)


  useEffect(() => {
    const loggedUserJSON = window.localStorage.getItem('loggedBlogappUser')
    if(loggedUserJSON) {
      loggedUser = JSON.parse(loggedUserJSON)
      dispatch(getUser(loggedUser))
    }
  }, [dispatch])


  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {

    event.preventDefault()
    const user = {
      user: username.value,
      password: password.value
    }

    dispatch(loginUser(user)).then(result => {
      if (result === 'error') {
        dispatch(notificationSet('invalid username or password', 5))
      } else if ( result === 'success') {
        history.push('/')
      }
    }
    )

    console.log(loggedUser)

  }

  return (
    <div>
      <h2>Login</h2>

      <form onSubmit={handleLogin}>
        <div>
          Username
          <input {...username}/>
        </div>
        <div>
          Password
          <input {...password}/>
        </div>
        <div>
          <button type="submit" id="login-button">login</button>
        </div>
      </form>
    </div>
  )
}

export default LoginForm