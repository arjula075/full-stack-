import loginService from './../services/login'
const utils = require('./../utils/utils.js')

const cachedUser = utils.getUserFromMemory()


export const handleLoginResult = (content) => {
  console.log('handleLoginResult');
  return async (dispatch) => {
    dispatch({
      type: 'LOGIN_RESULT',
      data: {
        content: content,
      }
    })
  }

}

export const loginHandle = (content) => {
  console.log('loginHandle');
  console.log('content', content);
  return async (dispatch) => {
    const user = await loginService.login(content)
    console.log('user', user);
    let loggedInUser = null
    if (user.token) {
      loggedInUser = {
        name: user.name,
        username: user.username,
        password: user.password,
      }
      content.token = 'bearer ' + user.token
      utils.setUserToMemory(loggedInUser)
    }
    else {
      return
    }

    console.log('content', content)
    dispatch({
      type: 'LOGIN_HANDLE',
      data: {
        content: content,
      }
    })
  }
}

export const changeUser = (content) => {
  return async (dispatch) => {
    dispatch({
      type: 'CHANGE_USER',
      data: {
        content: content,
      }
    })
  }

}

const reducer = (store = cachedUser, action) => {

  if (action.type==='LOGIN') {
    console.log('action id', action.data)
    return store
  }
  if (action.type==='LOGOUT') {
    console.log('action id', action.data)
    return store
  }
  if (action.type==='LOGIN_RESULT') {
    console.log('action id', action.data)
    return store
  }
  if (action.type==='LOGIN_FROM_CACHE') {
    console.log('action LOGIN_FROM_CACHE', action.data)
    return action.data.content
  }
  if (action.type==='LOGIN_HANDLE') {
    console.log('action LOGIN_HANDLE', action.data.content)
    return action.data
  }
  if (action.type==='CHANGE_USER') {
    console.log('action id', action.data)
    return store
  }
  return store
}

export default reducer
