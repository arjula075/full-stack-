import anecdoteService from './../services/anecdotesService'

const getId = () => (100000*Math.random()).toFixed(0)

export const anecdoteCreation = (content) => {
  console.log('CONTENT: ', content);
  const resObj = {}
  resObj.id = getId()
  resObj.votes = 0
  resObj.content = content
  return async (dispatch) => {
    anecdoteService.addAnecdote(resObj)
    dispatch({
      type: 'CREATE',
      data: {
        content: content,
        id: getId(),
        votes: 0
      }
    })
  }
}

export const vote = (content) => {
  return async (dispatch) => {
    content.votes = content.votes + 1
    anecdoteService.updateAnecdote(content)
    dispatch({
      type: 'VOTE',
      data: {
        content: content,
        id:content.id,
        votes: content.votes
      }
    })
  }

}

export const anecdoteInitialization = () => {
  return async (dispatch) => {
    const notes = await anecdoteService.getAll()
    dispatch({
      type: 'INIT',
      data: notes
    })
  }
}

const reducer = (store = [], action) => {
  console.log('action', action);
  console.log('store', store);

  if (action.type==='VOTE') {
    console.log('action id', action.data.id);
    const old = store.filter(a => a.id !== action.data.id)
    const voted = store.find(a => a.id === action.data.id)
    return [...old, { ...voted, votes: voted.votes+1} ]
  }
  if (action.type === 'CREATE') {
    console.log('action', action);
    return [...store, { content: action.data.content, id: action.data.id, votes:action.data.votes }]
  }
  if (action.type === 'INIT') {
    console.log('action', action);
    return action.data
  }

  return store
}

export default reducer
