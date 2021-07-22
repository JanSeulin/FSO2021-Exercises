import React from 'react'
import { useSelector } from 'react-redux'

import { Alert } from '@material-ui/lab'


const selector = (state) => state.notification

const Notification = () => {
  const notification = useSelector(selector)

  if (notification === '') {
    return null
  }

  if(notification.includes('deleted') || notification.includes('Comments must be at least three characters long')){
    return (
      <Alert severity="warning">
        {notification}
      </Alert>
    )
  }

  if(notification.includes('invalid username or password')){
    return (
      <Alert severity="error">
        {notification}
      </Alert>
    )
  }
  return (
    <Alert severity="success">
      {notification}
    </Alert>
  )
}

export default Notification