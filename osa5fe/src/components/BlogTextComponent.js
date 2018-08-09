import React from 'react';

const BlogTextComponent = (props) => {
		
		if (typeof props.blogTexts !== 'undefined') {
		console.log('p', props)
		let blogs = props.blogTexts
		console.log('blogs', blogs)
		if (typeof blogs === 'undefined') {
			blogs = props.blogTexts
		}
		return (
		<div>
		<h2>Blogs</h2>
		{
			blogs.map(osa => {
			return (
				 <div key={osa.title}>
					<p><h3>{osa.title}</h3></p>
					<p>{osa.author}</p>
					<p>{osa.url}</p>
					<p>{osa.likes}</p>
				 </div>
				)
			}
		)
		}
		</div>
		)
	}
	else {
		return (
		<div>
		<h2>Blogs</h2>
		</div>
		)
	}
}

export default BlogTextComponent