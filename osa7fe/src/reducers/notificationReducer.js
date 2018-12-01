const initialState = {
  notification: 'Nothing new in the western front',
  type: 'NO_NOTIFICATION'
}

const notificationReducer = (state = initialState, action) => {
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

export const notificationChange = (notification, time) => {
  return async (dispatch) => {
    dispatch({
      type: notification.type,
      notification: notification.notification
    })
    setTimeout(() => {
      dispatch(initialState)
    }, time * 1000)
  }
}


export default notificationReducer
