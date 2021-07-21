import loginService from '../services/login'
import blogService from '../services/blogs'

const userReducer = (state = null, action) => {
  switch(action.type) {
  case 'INIT_USER':
    return action.data
  case 'LOGIN_USER':
    return action.data
  case 'LOGOUT_USER':
    return null
  default:
    return state
  }
}

export const getUser = (user) => {
  return async dispatch => {
    blogService.setToken(user.token)
    dispatch ({
      type: 'INIT_USER',
      data: user
    })
  }
}

export const loginUser = (user) => {
  return async dispatch => {
    try {
      const username = user.user
      const password = user.password
      const loggedUser = await loginService.login({ username, password })
      console.log(loggedUser)

      window.localStorage.setItem(
        'loggedBlogappUser', JSON.stringify(loggedUser)
      )
      console.log(localStorage)
      blogService.setToken(loggedUser.token)


      dispatch({
        type: 'LOGIN_USER',
        data: loggedUser
      })
      return 'success'

    } catch (exception){
      console.log(exception)
      return 'error'
    }

  }
}

export const logoutUser = () => {
  return async dispatch => {
    window.localStorage.removeItem('loggedBlogappUser')
    dispatch({
      type: 'LOGOUT_USER'
    })
  }
}

export default userReducer