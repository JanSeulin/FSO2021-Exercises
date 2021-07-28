import React, { useState } from 'react'
import { useApolloClient, useQuery } from '@apollo/client'

import Authors from './components/Authors'
import Books from './components/Books'
import NewBook from './components/NewBook'
import LoginForm from './components/LoginForm'
import EditAuthor from './components/EditAuthor'
import Notify from './components/Notify'
import Recommended from './components/Recommended'

import { ALL_AUTHORS } from './queries'

const App = () => {
  const [page, setPage] = useState('authors')
  const [token, setToken] = useState(null)
  const [errorMessage, setErrorMessage] = useState(null)
  
  const client = useApolloClient()
  const result = useQuery(ALL_AUTHORS)

  if (result.loading) {
    return (
      <div>loading...</div>
    )
  }

  const logout = () => {
    setToken(null)
    localStorage.clear()
    client.resetStore()
  }

  const notify = (message) => {
    setErrorMessage(message)
    setTimeout(() => {
      setErrorMessage(null)
    }, 5000)
  }

  if (!token) {
    return (
      <div>
        <div>
          <button onClick={() => setPage('authors')}>authors</button>
          <button onClick={() => setPage('books')}>books</button>
          <button onClick={() => setPage('login')}>login</button>
        </div>

        <Notify errorMessage={errorMessage} />
        <Authors show={page === 'authors'} authors={result.data.allAuthors} />
        <Books show={page === 'books'}/>
        <LoginForm 
          show={page === 'login'}
          setToken={setToken}
          setError={notify} 
        />
      </div>
    )
  }
  return (
    <div>
      <div>
        <button onClick={() => setPage('authors')}>authors</button>
        <button onClick={() => setPage('books')}>books</button>
        <button onClick={() => setPage('add')}>add book</button>
        <button onClick={() => setPage('recommended')}>recommended</button>
        <button onClick={logout}>logout</button>
      </div>

      <Notify errorMessage={errorMessage} />
      <Authors show={page === 'authors'} authors={result.data.allAuthors}/>
      <EditAuthor show={page==='authors'}
        authors={result.data.allAuthors}
        setError={notify} 
      />
      <Books show={page === 'books'}/>
      <Recommended show={page==='recommended'} token={token} />
      <NewBook show={page === 'add'} setError={notify} />

    </div>
  )
}

export default App