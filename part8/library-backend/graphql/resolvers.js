const { UserInputError, AuthenticationError } = require ('apollo-server')
const jwt = require('jsonwebtoken')

const Author = require('../models/author.js')
const Book = require('../models/book.js')
const User = require('../models/user.js')
const config = require('../utils/config')

const resolvers = {
  Query: {
    bookCount: () => Book.collection.countDocuments(),
    authorCount: () => Author.collection.countDocuments(),
    allBooks: async (root, args) => {
      let filteredBooks = await Book.find().populate('author')

      if(args.author){
        const author = await Author.findOne({ name: args.author })
        filteredBooks = filteredBooks.filter(b => b.author.name === author.name)
      }
      
      if(args.genre){
        filteredBooks = filteredBooks.filter(b => b.genres.includes(args.genre))
      }

      return filteredBooks
    },
    allAuthors: async () => await Author.find(),
    allUsers: async () => await User.find(),
    me: (root, args, { currentUser }) => {
      return currentUser
    }
  },
  Author: {
    bookCount: async (root, args) => {
      return Book.countDocuments({ author: root.id })
    }
  },
  Book: {
    author: async (root) => {
      const author = await Author.findById(root.author)
      return {
        id: author.id,
        name: author.name,
        born: author.born
      }
    }
  },
  Mutation: {
    addBook: async (root, args, { currentUser }) => {
      let author = await Author.findOne({ name: args.author })

      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      if (args.author.length < 4) {
        throw new UserInputError('author name must be at least 4 characters long', {
          invalidArgs: args.author
        })
      }

      if (!author) {
        author = await new Author({ name: args.author }).save()
      }

      const book = new Book({
        title: args.title,
        published: args.published,
        author,
        genres: args.genres
      })

      try {
        await book.save()
      } catch (error) {
        if (args.title.length < 2) {
          throw new UserInputError('book title must be at least 2 characters long', { invalidArgs: args.title })
        }
        throw new UserInputError(error.message, { invalidArgs: args })
      }

      return book
    },
    editAuthor: async (root, args, { currentUser }) => {
      if (!currentUser) {
        throw new AuthenticationError('not authenticated')
      }

      const author = await Author.findOne({ name: args.name })
      author.born = args.born

      try {
        await author.save()
      } catch(error) {
        throw new UserInputError('author not found', {
          invalidArgs: args,
        })
      }

      return author
    },
    createUser: (root, args) => {
      const user = new User({ username: args.username })
      user.favoriteGenre = args.favoriteGenre

      return user.save()
        .catch(error => {
          throw new UserInputError(error.message, {
            invalidArgs: args,
          })
        })
    },
    login: async (root, args) => {
      const user = await User.findOne({ username: args.username })
      console.log(user)
      
      if (!user || args.password !== 'secret' ) {
        throw new UserInputError('wrong credentials')
      }

      const userForToken = {
        username: user.username,
        favoriteGenre: user.favoriteGenre,
        id: user._id
      }
      
      return { value: jwt.sign(userForToken, config.JWT_SECRET) }
    }
      
  }
}

module.exports = resolvers