import anecdoteService from "../services/anecdotes"

// const getId = () => (100000 * Math.random()).toFixed(0)

const reducer = (state = [], action) => {
  switch(action.type){
    case 'NEW_ANECDOTE':
      return [...state, action.data]
    case 'INIT_ANECDOTES':
      return action.data
    case 'VOTE': {
      const id = action.data.id
      const anecdoteToChange = state.find(a => a.id === id)
      const newVotes = anecdoteToChange.votes + 1
      
      const changedAnecdote = {
        ...anecdoteToChange,
        votes: newVotes
      }
      return state.map(anec => anec.id !== id ? anec : changedAnecdote)
      
  }

  default:
    return state
  }
}

export const initializeAnecdotes = () => {
  return async dispatch => {
    const anecdotes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT_ANECDOTES',
      data: anecdotes
    })
  }
}

export const createAnecdote = content => {
  return async dispatch => {
    const newAnecdote = await anecdoteService.createNew(content)
    dispatch({
      type: 'NEW_ANECDOTE',
      data: newAnecdote
    })
  }
}

/*export const vote = (id) => {
  return {
    type: 'VOTE',
    data: { id }
  }
}
*/

export const vote = (anecdote) => {
  return async dispatch => {
    const updatedAnecdote = await anecdoteService.update(anecdote.id, anecdote)
    const id = updatedAnecdote.id
    dispatch({
      type: 'VOTE',
      data: { id }
    })
  }
}

export default reducer