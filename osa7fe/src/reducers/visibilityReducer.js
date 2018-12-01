const utils = require('./../utils/utils.js')

const initialState = {
	hideWhenLoggedIn: {
    display: ''
  },
  showWhenLoggedIn:  {
    display: 'none'
  }
}

const visibilityReducer = (state = initialState, action) => {
	console.log('visibilityReducer initialState', initialState,);
	console.log('visibilityReducer state', state);
	console.log('visibilityReducer action', action);
  switch (action.type) {
  case 'LOGGING_IN':
    return {
			hideWhenLoggedIn: action.hideWhenLoggedIn,
			showWhenLoggedIn: action.showWhenLoggedIn,
      type: action.type
    }
    case 'LOGGED_IN':
      return {
        hideWhenLoggedIn: action.hideWhenLoggedIn,
        showWhenLoggedIn: action.showWhenLoggedIn,
        type: action.type
      }
  default:
    return state
  }
}

export const loggedIn = () => {
  return async (dispatch) => {

    dispatch({
      type: 'LOGGED_IN',
			hideWhenLoggedIn: utils.displayNone(),
			showWhenLoggedIn: utils.displayNormal(),
    })
  }
}

export const loggedOut = () => {
  return async (dispatch) => {
    dispatch({
      type: 'LOGGING_IN',
			hideWhenLoggedIn: utils.displayNone(),
			showWhenLoggedIn: utils.displayNormal(),
    })
  }
}


export default visibilityReducer
