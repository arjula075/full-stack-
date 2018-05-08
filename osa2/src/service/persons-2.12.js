import React from 'react';
import axios from 'axios'

const baseUrl = 'http://localhost:3001/persons'
const baseUrlCountries = 'https://restcountries.eu/rest/v2/name/'

const getPersons = () => {
	    const request = axios
		.get(baseUrl)
		return request.then(response => { return response.data })
}

const addPerson = (newObject) => {
  return axios.post(baseUrl, newObject)
}

const getCountries = (props) => {
		console.log(props)
	    const request = axios
		.get(baseUrlCountries + props)
		return request.then(response => { return response.data })
}

export default { getPersons, addPerson, getCountries }