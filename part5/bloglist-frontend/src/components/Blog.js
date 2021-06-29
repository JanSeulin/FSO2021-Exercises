import React, { useState } from 'react'
import blogService from '../services/blogs'
import FullBlog from './FullBlog'

const Blog = ({ blog, user, blogs, setBlogs }) => {
  const [view, setView] = useState(false)
  const [blogLikes, setLikes] = useState(blog.likes)

  const blogStyle = {
    paddingTop: 10,
    paddingLeft: 2,
    border: 'solid',
    borderWidth: 1,
    marginBottom: 5
  }

  /*const buttonStyle = {
    color: 'white',
    backgroundColor: 'red',
    fontWeight: 'bold'
  }
  */

  const like = async event => {
    event.preventDefault()

    //console.log("liked")
    const likes = blogLikes + 1
    //console.log(likes)
    const newBlog = { ...blog, user: blog.user.id, likes }
    await blogService.update(blog.id, newBlog)

    setLikes(likes)
  }

  const deleteBlog = async event => {
    event.preventDefault()
    //const blogToDelete = blog.id

    let confirmation = window.confirm(`Remove the blog ${blog.title} by ${blog.author}?`)
    if(confirmation) {
      blogService.setToken(user.token)
      await blogService.remove(blog.id, user.token)
      setBlogs(blogs.filter(b => b.id !== blog.id))
    }
  }

  /*const fullBlog = () => (
    <div className="fullBlog">
      <br/>
      {blog.url}<br/>
      Likes: {blogLikes}&nbsp;
      <button onClick={like} className="likeButton">like</button><br/>
      Added by: {blog.user ? blog.user.username : 'test'}<br/>
      {user ? user.username === blog.user.username ?
        <button style={buttonStyle} onClick={deleteBlog}>remove</button>
        : ''
        : ''}
    </div>
  )
  */

  const fullBlog = () => {
    return (
      <FullBlog blog={blog} like={like} deleteBlog={deleteBlog}
        blogLikes={blogLikes} user={user} />
    )
  }
  return (
    <div style={blogStyle} className="blogDiv">
      {blog.title} by {blog.author} &nbsp;
      <button onClick={() => setView(!view)}>
        {view ? 'hide' : 'show'}
      </button>
      {view ? fullBlog() : '' }
    </div>
  )
}

export default Blog