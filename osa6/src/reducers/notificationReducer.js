const initialState = {
  notification: 'Nothing new in the western front',
  type: 'NO_NOTIFICATION'
}

const notificationReducer = (state = initialState, action) => {
  console.log('ACTION: ', action)
  console.log('STATE: ', state)
  switch (action.type) {
  case 'NOTIFICATION_ON':
    return {
      notification: action.notification,
      type: action.type
    }
  default:
    return initialState
  }
}

export const notificationChange = (notification) => {

  return {
    type: notification.type,
    notification: notification.notification
  }
}

export const notificationOff = () => {
  console.log('should be here', initialState);
  return initialState
}

export default notificationReducer
