import axios from 'axios'
const baseUrl = '/api/login'

const login = async(user) => {
  const response = await axios.post(baseUrl, user)
  console.log('usee', user)
  response.data.password = user.password
  console.log('response.data', response.data)
  return response.data
}

export default { login }
