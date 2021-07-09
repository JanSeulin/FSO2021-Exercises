import React from 'react'
import { useDispatch } from 'react-redux'
import { createAnecdote } from '../reducers/anecdoteReducer'
import { notificationSet } from '../reducers/notificationReducer'

const NewAnecdote = (props) => {
  const dispatch = useDispatch()

  const addAnecdote = async (event) => {
    event.preventDefault()
    const content = event.target.anecdote.value
    event.target.anecdote.value = ''

    dispatch(createAnecdote(content))
    dispatch(notificationSet(`added "${content}"`, 5))
  }

  const h2Style = {
    marginBottom: 8,
    marginTop: 0
  }

  return (
    <div>
      <h2 style={h2Style}>Create New</h2>
      <form onSubmit={addAnecdote}>
        <input name="anecdote"
          placeholder="new anecdote..." /><br/>
        <button type="submit">create</button>
      </form>
    </div>
  )
}

export default NewAnecdote