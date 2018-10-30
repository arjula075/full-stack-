import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const addAnecdote = async(value) => {
  const response = await axios.post('http://localhost:3001/anecdotes', value)
  return response.data
}

export default { getAll, addAnecdote }
