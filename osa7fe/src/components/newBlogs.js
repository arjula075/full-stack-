import React from 'react'
import { connect } from 'react-redux'
import { sendBlog } from './../reducers/blogReducer'
import { notificationChange } from './../reducers/notificationReducer'
import { Button, FormGroup, FormControl, ControlLabel } from 'react-bootstrap'

class NewBlogComponent extends React.Component {

  createNewBlog = async(event) => {
    event.preventDefault()
    const blog = {
      'title': event.target.elements['title'].value,
      'author': event.target.elements['author'].value,
      'url': event.target.elements['url'].value
    }
    event.target.reset()
    console.log('this props in newBlogs', this.props);
    await this.props.sendBlog(blog, this.props.blogs.cachedUser.token)
    this.props.notificationChange({
      notification: 'New blog added',
      type: 'NOTIFICATION_ON'
    }, 1)
  }

  render() {
    return (
      <div>
        <form onSubmit={this.createNewBlog}>
        <FormGroup>
          <ControlLabel>Otsikko:</ControlLabel>
            <FormControl
            type="text"
            name="title"
            />
            <ControlLabel>Kirjailija:</ControlLabel>
            <FormControl
            name="author"
            type="text"
            />
            <ControlLabel>Verkko-osoite:</ControlLabel>
            <FormControl
            name="url"
            type="text"
            />
            <Button bsStyle="success" type="submit">luo uusi blogi</Button>
          </FormGroup>
        </form>
      </div>
    )
  }

}

const mapStateToProps = (state) => {
  return {
    blogs: state.blog,
    visibility: state.visibility,
    notification: state.notification
  }
}

const ConnectedNewBlogComponent = connect(
  mapStateToProps,
  { sendBlog, notificationChange },
)(NewBlogComponent)


export default ConnectedNewBlogComponent
