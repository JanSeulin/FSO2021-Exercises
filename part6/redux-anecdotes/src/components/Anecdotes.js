import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { vote } from '../reducers/anecdoteReducer'
import { notificationSet, resetNotification } from '../reducers/notificationReducer'

const Anecdote = ({ anecdote, handleClick }) => {
  return (
    <div>
      <div>
        {anecdote.content}
      </div>
      <div>
        has {anecdote.votes}&nbsp;
        <button onClick={handleClick}>vote</button>
      </div>
      <br/>
    </div>
  )
}


const Anecdotes = () => {
  const dispatch = useDispatch()
  const anecdotes = useSelector(state => state.anecdotes)
  const filter = useSelector(state => state.filter)

  const voting = (anecdote) => {
    dispatch(vote(anecdote))
    dispatch(notificationSet(`you voted for "${anecdote.content}"`, 5))
  }

  const h3Style = {
    textDecoration: 'underline'
  }

  return (
    <div>
      {filter ? <div><h3 style={h3Style}>Filter Results</h3></div> : ''}
      
      {anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(filter.toLowerCase())).length === 0 ?
          <p>No results found</p> : '' }
          
      {anecdotes
        .filter(anecdote => 
          anecdote.content.toLowerCase().includes(filter.toLowerCase()))
        .sort((a, b) => b.votes - a.votes)
        .map(anecdote =>
          <Anecdote key={anecdote.id}
            anecdote={anecdote} 
            handleClick={() => voting(anecdote)}
          />
        )
      }
      
      
    </div>
  )
}

export default Anecdotes