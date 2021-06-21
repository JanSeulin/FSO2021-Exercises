const dummy = (blogs) => {
  return 1
}

const likesSum = (blogs) => {
  return blogs.reduce((sum, blog) => sum + blog.likes, 0)
}

const favoriteBlog = (blogs) => {
  return blogs.reduce((prev, current) => (prev.likes > current.likes) ? prev : current, 0)
}

module.exports = { dummy, likesSum, favoriteBlog }