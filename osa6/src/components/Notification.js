import React from 'react'

class Notification extends React.Component {
  render() {
    let notification = ''
    if (this.props.store.getState().notification.type !== 'NO_NOTIFICATION') {
      notification = this.props.store.getState().notification.notification
    }

    console.log('notification',notification);
    const style = {
      border: 'solid',
      padding: 10,
      borderWidth: 1
    }
    return (
      <div style={style}>
        {notification}
      </div>
    )
  }
}

export default Notification
