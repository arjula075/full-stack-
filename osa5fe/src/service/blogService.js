import axios from 'axios'

const baseUrl = 'http://localhost:3003/api/blogs'

const getBlogs = () => {
	    const request = axios
		.get(baseUrl)
		return request.then(response => { return response.data })
}

const addBlog = (newObject) => {
  const request = axios.post(baseUrl, newObject)
  return request.then(response => response.data)

}

const updateBlog = (newObject) => {
  console.log('put', newObject)
  const request = axios.put(baseUrl + '/' + newObject.id, newObject)
  return request.then(response => response.data)
}

const deleteBlog = (newObject) => {
  const request = axios.delete(baseUrl+ '/' + newObject)
  return request.then(response => response.data)
}

export default { getBlogs, addBlog, updateBlog, deleteBlog }
