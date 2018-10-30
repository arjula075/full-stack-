import axios from 'axios'

const getAll = async () => {
  const response = await axios.get('http://localhost:3001/anecdotes')
  return response.data
}

const addAnecdote = async(value) => {
  const response = await axios.post('http://localhost:3001/anecdotes', value)
  return response.data
}

const updateAnecdote = (newObject) => {
  console.log('put', newObject)
  const request = axios.put('http://localhost:3001/anecdotes/' + newObject.id, newObject)
  return request.then(response => response.data)
}

export default { getAll, addAnecdote, updateAnecdote }
