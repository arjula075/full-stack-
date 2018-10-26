import React from 'react'

import { filterChange } from './../reducers/filterReducer'

class FilterForm extends React.Component {

  handleKeyUp = (e) => {
    console.log('value',e.target.value);
    this.props.store.dispatch(
      filterChange(e.target.value)
    )
  }

  render() {
    return (
      <div>
     <h2>filter</h2>
       <form onSubmit={this.handleSubmit}>
         <div><input name='filter' onKeyUp={this.handleKeyUp}/></div>
       </form>
     </div>
    )
  }

}
export default FilterForm
