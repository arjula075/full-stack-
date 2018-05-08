import React from 'react';
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'

const getPersons = () => {
	    const request = axios
		.get(baseUrl)
		return request.then(response => { return response.data })
}

const addPerson = (newObject) => {
  return axios.post(baseUrl, newObject)
}

export default { getPersons, addPerson }