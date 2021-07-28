import React, { useState } from 'react'
import { useMutation } from '@apollo/client'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ authors, show }) => {
  //const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  console.log(authors)
  
  const [name, setName] = useState(null)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS}],
    onError: (error) => {
      console.log(error.graphQLErrors)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: name, born }})

    setName('')
    setBorn('')
  }

  const width = {
    width: 215,
    backgroundColor: 'white'
  }

  if (!show) {
    return null
  }
  
  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div>
          author <br/>
          <select style={width} onChange={({ target }) => setName(target.value) }>
            {authors.map(a =>
              <option key={a.name} value={a.name}>{a.name}</option>
            )}
          </select>
        </div>
        <div>
          born <br/>
          <input 
            value={born}
            onChange={({ target }) => setBorn(Number(target.value))}
          />
        </div>
        <br/>
        <button type="submit">set</button>
      </form>
    </div>
  )
}

export default EditAuthor