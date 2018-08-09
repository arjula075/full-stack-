// 20 min 26.04
import React from 'react';
import BlogTextComponent from './BlogTextComponent'
import blogService from '../service/blogService'


class Blog extends React.Component {
  constructor(props) {
    super(props)

    this.state = {
		blogTexts: props.blogTexts,
    }

  }
 
  componentDidMount() {
	
	blogService
		.getBlogs().then(response =>
		{
			console.log('reposnse', response)
			this.setState({blogTexts: response})
		}
		)
	
  }

  render() {

	console.log('blogTexts',this.state.blogTexts)
	  
    return (
        <div>
			<BlogTextComponent blogTexts = {this.state.blogTexts} />
		</div>
    )
  }
}


export default Blog