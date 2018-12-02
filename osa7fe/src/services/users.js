import axios from 'axios'
const baseUrl = '/api/users'
const utils = require('./../utils/utils.js')

const getAll = async(token) => {
  console.log('token',token)
  const authString = utils.makeAuthString(token)
  const head =  {'headers' :{'Authorization': authString}}
  console.log('head',head)

  const request = axios.get(baseUrl, head)
  return request.then(response => response.data)
}

export default {
  getAll,
}
