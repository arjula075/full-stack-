import axios from 'axios'
const baseUrl = '/api/login'
const utils = require('./../utils/utils.js')

const login = async(user) => {
  console.log('in loginservice: user', user);
  const response = await axios.post(baseUrl, user)
  console.log(response);
  if (response.status === '200') {
    utils.setUserToMemory(user)
  }
  response.data.password = user.password
  return response.data
}

export default { login }
