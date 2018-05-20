import axios from 'axios'

const baseUrl = 'http://localhost:3001/api/persons'
const baseUrlCountries = 'https://restcountries.eu/rest/v2/name/'

const getPersons = () => {
	    const request = axios
		.get(baseUrl)
		return request.then(response => { return response.data })
}

const addPerson = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)

}

const updatePerson = (newObject) => {
  console.log('put', newObject)
  const request = axios.put(baseUrl + '/' + newObject.id, newObject)
  return request.then(response => response.data)
}

const deletePerson = (newObject) => {
  const request = axios.delete(baseUrl+ '/' + newObject)
  return request.then(response => response.data)
}

const getCountries = (props) => {
		console.log(props)
	    const request = axios
		.get(baseUrlCountries + props)
		return request.then(response => { return response.data })
}

export default { getPersons, addPerson, getCountries, deletePerson, updatePerson }
