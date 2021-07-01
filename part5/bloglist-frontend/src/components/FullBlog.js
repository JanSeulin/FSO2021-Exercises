import React from 'react'

const FullBlog = ({ blog, like, deleteBlog, blogLikes, user }) => {
  const buttonStyle = {
    color: 'white',
    backgroundColor: 'red',
    fontWeight: 'bold'
  }


  return (
    <div className="fullBlog">
      <br/>
      {blog.url}<br/>
      Likes: {blogLikes}&nbsp;
      <button onClick={like} className="likeButton">like</button><br/>
      Added by: {blog.user ? blog.user.username : 'test'}<br/>
      {user ? user.username === blog.user.username ?
        <button style={buttonStyle} onClick={deleteBlog} id="remove-button">remove</button>
        : ''
        : ''}
    </div>
  )
}

export default FullBlog