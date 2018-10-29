import React from 'react'
import { connect } from 'react-redux'
import { filterChange } from './../reducers/filterReducer'

class FilterForm extends React.Component {

  handleKeyUp = (e) => {
    console.log('value',e.target.value)
    this.props.filterChange(e.target.value)
  }

  render() {
    return (
      <div>
     <h2>filter</h2>
       <form>
         <div><input name='filter' onKeyUp={this.handleKeyUp}/></div>
       </form>
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

const ConnectedFilterForm = connect(
  mapStateToProps,
  { filterChange }
)(FilterForm)

export default ConnectedFilterForm
