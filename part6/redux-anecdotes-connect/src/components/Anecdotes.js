import React from 'react'
import { connect } from 'react-redux'
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


const Anecdotes = (props) => {

  const voting = (anecdote) => {
    props.vote(anecdote)
    
    if (props.notification){
      props.resetNotification()
    } 
    props.notificationSet(`you voted for "${anecdote.content}"`, 5)
  }

  const h3Style = {
    textDecoration: 'underline'
  }

  return (
    <div>
      {props.filter ? <div><h3 style={h3Style}>Filter Results</h3></div> : ''}
      
      {props.anecdotes.filter(anecdote => 
        anecdote.content.toLowerCase().includes(props.filter.toLowerCase())).length === 0 ?
          <p>No results found</p> : '' }
          
      {props.anecdotes
        .filter(anecdote => 
          anecdote.content.toLowerCase().includes(props.filter.toLowerCase()))
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

const mapStateToProps = (state) => {
  return {
    anecdotes: state.anecdotes,
    filter: state.filter,
    notification: state.notification
  }
}

const mapDispatchToProps = {
  vote, notificationSet, resetNotification
}

export default connect(mapStateToProps, mapDispatchToProps)(Anecdotes)