const anecdotesAtStart = [
  //'If it hurts, do it more often',
  //'Adding manpower to a late software project makes it later!',
  //'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
  //'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
  //'Premature optimization is the root of all evil.',
  //'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.'
]

const getId = () => (100000*Math.random()).toFixed(0)

const asObject = (anecdote) => {
  return {
    content: anecdote,
    id: getId(),
    votes: 0
  }
}

export const anecdoteCreation = (content) => {
  console.log('content', content);
  return {
    type: 'CREATE',
    data: {
      content: content,
      id: getId(),
      votes: 0
    }
  }
}

export const vote = (content) => {
  console.log('content', content);
  return {
    type: 'VOTE',
    data: {
      content: content,
      id:content.id,
      votes: content.votes
    }
  }
}

export const anecdoteInitialization = (data) => {
  return {
    type: 'INIT',
    data
  }
}

const initialState = anecdotesAtStart.map(asObject)


const reducer = (store = [], action) => {
  console.log('action', action);
  console.log('store', store);

  if (action.type==='VOTE') {
    console.log('action id', action.data.id);
    const old = store.filter(a => a.id !== action.data.id)
    const voted = store.find(a => a.id === action.data.id)
    console.log('old', old);
    console.log('voted', voted);
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
