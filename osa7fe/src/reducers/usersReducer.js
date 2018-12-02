import userService from './../services/users'
const utils = require('./../utils/utils.js')

const usersReducer = (state = [], action) => {
	console.log('usersReducer state', state);
	console.log('usersReducer action', action);
  switch (action.type) {
  case 'GET_USERS':
    return action.data
  default:
    return state
  }
}

export const getUsers = (token) => {
  return async (dispatch) => {
    const users = await userService.getAll(token)
    dispatch({
      type: 'GET_USERS',
      data: users
    })
  }
}

export default usersReducer
