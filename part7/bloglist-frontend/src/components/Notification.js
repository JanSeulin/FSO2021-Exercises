import React from 'react'
import { useSelector } from 'react-redux'

const selector = (state) => state.notification

const Notification = () => {
  const notification = useSelector(selector)

  if (notification === '') {
    return null
  }

  return (
    <div className="error">
      {notification}
    </div>
  )
}

export default Notification