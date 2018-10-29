import React from 'react'
import { connect } from 'react-redux'
import { notificationChange } from './../reducers/notificationReducer'

class Notification extends React.Component {
  render() {
    console.log('props', this.props);
    const { notification } = this.props
    console.log('notification', notification);
    let notificationText = ''
    if (notification.type !== 'NO_NOTIFICATION') {
      notificationText = notification.notification
    }

    console.log('notification',notification);
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {notificationText}
      </div>
    )
  }
}

const mapStateToProps = (state) => {
  return {
    notification: state.notification,
    filter: state.filter
  }
}

const ConnectedNotification = connect(
  mapStateToProps,
  { notificationChange }
)(Notification)

export default ConnectedNotification
