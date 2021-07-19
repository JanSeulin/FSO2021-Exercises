const notificationReducer = (state = '', action) => {
  switch (action.type) {
  case 'SET_MESSAGE':
    return action.data
  case 'RESET_MESSAGE':
    return ''
  default:
    return state
  }
}

export const notificationSet = (message, seconds) => {
  return async dispatch => {
    dispatch({
      type: 'SET_MESSAGE',
      data: message
    })
    setTimeout(() => {
      dispatch({
        type: 'RESET_MESSAGE'
      })
    }, seconds * 1000)
  }
}

export const resetNotification = () => {
  return {
    type: 'RESET_MESSAGE'
  }
}

export default notificationReducer