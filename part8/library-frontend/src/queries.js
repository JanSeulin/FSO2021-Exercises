import { gql } from '@apollo/client'

export const ALL_AUTHORS = gql`
  query {
    allAuthors {
      name
      born
      bookCount
    }
  }
`

export const ALL_BOOKS = gql`
  query {
    allBooks { 
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const FILTERED_BOOKS = gql`
  query ($genre: String!) {
    allBooks (genre: $genre){
      title
      author {
        name
      }
      published
      genres
    }
  }
`

export const GET_USER = gql`
  query {
    me {
      username
      favoriteGenre
    }
  }
`

export const ADD_BOOK = gql`
  mutation addBook($title: String!, $author: String, $published: Int!, $genres: [String!]!) {
    addBook(
      title: $title,
      author: $author,
      published: $published,
      genres: $genres
    ) {
      title
      author {
        name
      }
      published
      genres
      id
      }
  }
`

export const EDIT_AUTHOR = gql`
  mutation editAuthor($name: String!, $born: Int!){
    editAuthor(
      name: $name,
      born: $born
    ) {
      name
      born
      bookCount
    }
  }
`

export const LOGIN = gql`
  mutation login($username: String!, $password: String!){
    login(username: $username, password: $password) {
      value
    }
  }
`