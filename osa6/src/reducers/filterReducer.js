const filterReducer = (state = '', action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'SET_FILTER':
    return action.filter
  default:
    return state
  }
}

export const filterChange = (filter) => {
  console.log(filter);
  return {
    type: 'SET_FILTER',
    filter
  }
}

export default filterReducer
