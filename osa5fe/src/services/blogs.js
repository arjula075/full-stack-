import axios from 'axios'
const baseUrl = '/api/blogs'

const getAll = async(token) => {
  console.log('token',token)
  const authString = 'Bearer '.concat(token)
  const head =  {'headers' :{'Authorization': authString}}
  console.log('head',head)

  const request = axios.get(baseUrl, head)
  return request.then(response => response.data)
}

export default { getAll}
