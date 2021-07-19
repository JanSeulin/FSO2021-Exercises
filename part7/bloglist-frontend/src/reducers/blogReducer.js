import blogService from '../services/blogs'

const reducer = (state = [], action) => {
  switch(action.type){
  case 'NEW_BLOG':
    return [...state, action.data]
  case 'REMOVE_BLOG':{
    const id = action.data.id
    const deletedBlog = state.find(b => b.id === id)

    return state.filter(blog => blog.id !== deletedBlog.id)
  }
  case 'INIT_BLOGS':
    return action.data
  case 'LIKE': {
    const id = action.data.id
    const blogToChange = state.find(b => b.id === id)
    const newLikes = blogToChange.likes + 1

    const changedBlog = {
      ...blogToChange,
      likes: newLikes
    }
    return state.map(blog => blog.id !== id ? blog : changedBlog)
  }
  default:
    return state
  }
}

export const initializeBlogs = () => {
  return async dispatch => {
    const blogs = await blogService.getAll()
    dispatch({
      type: 'INIT_BLOGS',
      data: blogs
    })
  }
}

export const createBlog = (content) => {
  return async dispatch => {
    const newBlog = await blogService.create(content)
    dispatch({
      type: 'NEW_BLOG',
      data: newBlog
    })
  }
}

export const likeBlog = (blog) => {
  return async dispatch => {
    //console.log(blog)
    const updatedLikes = blog.likes + 1

    const blogObject = {
      ...blog,
      user: blog.user.id,
      likes: updatedLikes
    }
    console.log(blogObject)

    const updatedBlog = await blogService.update(blog.id, blogObject)

    const id = updatedBlog.id
    dispatch({
      type: 'LIKE',
      data: { id }
    })
  }
}

export const deleteBlog = (blog) => {
  return async dispatch => {
    const id = blog.id
    await blogService.remove(id)
    dispatch({
      type: 'REMOVE_BLOG',
      data: { id }
    })
  }
}

export default reducer