const initialState = {
  notification: 'Nothing new in the western front',
  type: 'NO_NOTIFICATION'
}

const notificationReducer = (state = initialState, action) => {
  console.log('ACTION: ', action)
  switch (action.type) {
  case 'SET_NOTIFICATION':
    return action.notification
  default:
    return state
  }
}

export const notificationChange = (notification) => {
  return {
    type: 'SET_NOTIFICATION',
    notification
  }
}



export default notificationReducer
