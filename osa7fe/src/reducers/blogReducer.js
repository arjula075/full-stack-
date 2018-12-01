import blogService from './../services/blogs'
import loginService from './../services/login'
const utils = require('./../utils/utils.js')

const initialState = {
  cachedUser: utils.getUserFromMemory(),
  blogs: []
}

export const login = (content) => {
  console.log('login');
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN',
      data: {
        content: content,
      }
    })
  }
}

export const logout = (content) => {
  console.log('logout');
  return async (dispatch) => {
    dispatch({
      type: 'LOGOUT',
      data: {
        content: content,
      }
    })
  }
}

export const vote = (content, token) => {
  console.log('vote', content);
  console.log('token', token);
  const result = JSON.parse(JSON.stringify(content))
  return async (dispatch) => {
    result.likes = result.likes + 1
    blogService.updateBlog(result, token)
    dispatch({
      type: 'VOTE',
      data: {
        content: content,
        id:content._id,
        votes: content.votes
      }
    })
  }
}

export const blogInitialization = (content) => {
  console.log('blog init', content);
  let result = {};
  return async (dispatch) => {
    let user = null
    if (content) {
    if (content.username && content.password) {
        user = await loginService.login(content)
        if (user.token) {
          user.token = 'bearer ' + user.token
          let blogs = await blogService.getAll(user.token)
          blogs = utils.initializedFetchBlogArray(blogs)
          result.cachedUser = user
          result.blogs = blogs
          utils.setUserToMemory(content)
        }
      }
    }
    else {
      result = initialState
    }
    dispatch({
      type: 'INIT',
      data: result
    })
  }
}

export const toggleVisibility = (content) => {
  console.log('toggle visibility', content);
  return async (dispatch) => {
    dispatch({
      type: 'TOGGLE',
      data: {
        id:content._id,
      }
    })
  }
}

export const deleteBlog = (content, token) => {
  console.log('delete', content);
  return async (dispatch) => {
    console.log('delete blog in app', content)
    await blogService.deleteBlog(content, token)
    let blogs = await blogService.getAll(token)
    blogs = utils.initializedFetchBlogArray(blogs)
    dispatch({
      type: 'DELETE',
      data: {
        content: blogs,
      }
    })
  }
}

export const sendBlog = (content, token) => {
  console.log('sendblog', content);
  return async (dispatch) => {
    await blogService.createBlog(content, token)
    const blogs = await blogService.getAll(token)
    dispatch({
      type: 'SEND',
      data: {
        content: blogs,
      }
    })
  }
}

const reducer = (store = initialState, action) => {

  if (action.type==='VOTE') {
    const result = JSON.parse(JSON.stringify(store))
    console.log('action VOTE', action.data.id);
    const old = result.blogs.filter(a => a._id !== action.data.id)
    const liked = result.blogs.find(a => a._id === action.data.id)
    result.blogs = [...old, { ...liked, likes: liked.likes+1} ]
    return result
  }
  if (action.type==='TOGGLE') {
    const result = JSON.parse(JSON.stringify(store))
    console.log('action TOGGLE', action.data);
    console.log('result', result.blogs);
    const old = result.blogs.filter(a => a._id !== action.data.id)
    console.log('old', old);
    const toggled = result.blogs.find(a => a._id === action.data.id)
    console.log('toggled', toggled);
    toggled.visibility = !toggled.visibility
    console.log('toggled', toggled);
    result.blogs = [...old, { ...toggled} ]
    console.log('result after action', result);
    return result
  }
  if (action.type==='DELETE') {
    console.log('blogReducer action DELETE', action.data);
    const result = JSON.parse(JSON.stringify(store))
    result.blogs = action.data.content
    return result
  }
  if (action.type==='SEND') {
    console.log('blogReducer action SEND', action.data);
    const result = JSON.parse(JSON.stringify(store))
    result.blogs = action.data.content
    return result
  }
  if (action.type === 'INIT') {
    console.log('blogReducer action-INIT', action);
    console.log(action, action);
    return action.data
  }
  if (action.type === 'LOGIN') {
    console.log('blogReducer action-LOGIN', action);
    return action.data
  }
  if (action.type === 'LOGOUT') {
    console.log('blogReducer action-LOGOUT', action);
    return action.data
  }
  return store
}

export default reducer
