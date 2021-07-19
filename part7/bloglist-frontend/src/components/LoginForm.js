import React, { useState } from 'react'
import { useDispatch } from 'react-redux'
//import { notificationSet } from '../reducers/notificationReducer'
import { loginUser } from '../reducers/userReducer'
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

  const username = useField('text')
  const password = useField('password')

  const handleLogin = async (event) => {

    event.preventDefault()
    const user = {
      user: username.value,
      password: password.value
    }
    console.log(user)

    dispatch(loginUser(user))
    history.push('/')
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