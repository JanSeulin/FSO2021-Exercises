import React, { useState } from 'react'
import { useMutation } from '@apollo/client'
import Select from 'react-select'

import { ALL_AUTHORS, EDIT_AUTHOR } from '../queries'

const EditAuthor = ({ authors }) => {
  //const [name, setName] = useState('')
  const [born, setBorn] = useState('')
  console.log(authors)
  let options = []

  authors.forEach(a => {
    let newAuthor = {
      name: a.name,
      label: a.name
    }
    options = options.concat(newAuthor)
  })

  console.log(options)
  const [selectedOption, setSelectedOption] = useState(null)

  const [ editAuthor ] = useMutation(EDIT_AUTHOR, {
    refetchQueries: [ {query: ALL_AUTHORS}],
    onError: (error) => {
      console.log(error.graphQLErrors)
    }
  })

  const submit = async (event) => {
    event.preventDefault()

    editAuthor({ variables: { name: selectedOption.name, born }})

    setSelectedOption(null)
    setBorn('')
  }

  const style={
    width: '25%',
  }

  return (
    <div>
      <h3>Set birthyear</h3>
      <form onSubmit={submit}>
        <div style={style}>
          author 
          <Select defaultValue={selectedOption}
            onChange={setSelectedOption}
            options={options}
          />
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