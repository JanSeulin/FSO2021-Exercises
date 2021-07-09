const filterReducer = (state = '', action) => {
  switch(action.type){
    case 'SET_FILTER':
      return action.data
    default:
      return state
  }
}

export const setFilter = (input) => {
  return {
    type: 'SET_FILTER',
    data: input
  }
}

export default filterReducer