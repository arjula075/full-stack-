import React from 'react'
import { shallow } from 'enzyme'
import SimpleBlog from './simpleBlog'

describe.only('<SimpleBlog />', () => {
  test('renders content', () => {
    const blog =	{
    		"title": "Ari's first blog",
    		"author": "Ari Lahti",
    		"url": "https://jotain.jossain",
    		"likes": 2
    	}

    const onClick = () => {
      console.log('OnClick test func')
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick}/>)
    const blogDiv = blogComponent.find('.blogData')
    const likeDiv = blogComponent.find('.likeData')

    expect(blogDiv.text()).toContain(blog.title)
    expect(blogDiv.text()).toContain(blog.author)
    expect(likeDiv.text()).toContain(blog.likes)
  })
  test('presses button', () => {
    const blog =	{
        "title": "Ari's first blog",
        "author": "Ari Lahti",
        "url": "https://jotain.jossain",
        "likes": 2
      }

    const mockHandler = jest.fn()

    let counter = 0
    const onClick = () => {
      console.log('OnClick test func')
      counter = counter + 1
    }

    const blogComponent = shallow(<SimpleBlog blog={blog} onClick={onClick}/>)
    const button = blogComponent.find('button')
    const iter = 2
    for (let i = 0; i < iter; i++) {
      button.simulate('click')
    }


    expect(counter).toBe(iter)
  })
})
