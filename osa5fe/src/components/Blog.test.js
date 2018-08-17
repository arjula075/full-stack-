import React from 'react'
import { shallow, mount } from 'enzyme'
import App from '../App'
import SimpleBlog from './simpleBlog'
import blogService from '../services/blogs'
import loginService from '../services/login'
import Blog from '../components/Blog'
import LoginComponent from '../components/login'
import NewBlogComponent from '../components/newBlogs'
const utils = require('../utils/utils.js')


// setting up test data
utils.logOut()

const auxiliaryFunc = (data) => {
  console.log('auxiliaryFunc', data);
}

const testUser = {
  name: 'test',
  username: 'test',
  password: 'token'
}

const initialBlogs = [
	{
		"title": "Ari's first blog",
		"author": "Ari Lahti",
		"url": "https://jotain.jossain",
		"likes": 1,
    "user" : {
      "username": "test"
    }
	},
	{
		"title": "And now to something completely different",
		"author": "John Cleese",
		"url": "https://muuta.muualla",
		"likes": 2,
    "user" : {
      "username": "test"
    }
	}
]

const props4Blog = {
  blogs: initialBlogs,
  toggleVisibility: auxiliaryFunc,
  likePressed: auxiliaryFunc,
  userName: testUser.username,
  deleteBlog: auxiliaryFunc,
}


describe('<SimpleBlog />', () => {
  test('renders content', () => {
    const blog =	{
    		"title": "Ari's first blog",
    		"author": "Ari Lahti",
    		"url": "https://jotain.jossain",
    		"likes": 2,
        "user" : {
          "username": "test"
        }
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

describe('<App /> empty to beging with', async() => {
  // yae, found a bug with tests!
  test('check that we do not have blogs rendered', () => {
    //console.log('props4Blog', props4Blog);
    //let app = mount(<App />)
    //app.update()
    //console.log('app, after update', app.html())
    //const contentDiv = app.find('.blogEntry')
    //console.log('contentDiv, after update', contentDiv.debug())
      let blogCont
      try  {
        blogCont = mount(<Blog blogs={props4Blog.blogs} toggleVisibility={props4Blog.toggleVisibility} likePressed={props4Blog.likePressed} user = {props4Blog.userName} deleteBlog  = {props4Blog.deleteBlog}/>)
      }
      catch (e2) {
        console.log('e2', e2);
      }

      try  {
        console.log('blogCont', blogCont.debug());
        }
      catch (e3) {
        console.log('e3', e3);
      }

      try  {
        blogCont.update()
        }
      catch (e3) {
        console.log('e3', e3);
      }

      try  {
        console.log('blogCont, after update', blogCont.debug())
        }
      catch (e3) {
        console.log('e3', e3);
      }
      let contentDivWithData
      try  {
        contentDivWithData = blogCont.find('.blogEntry')
        }
      catch (e3) {
        console.log('e3', e3);
      }

      try  {
        console.log('contentDivWithData, after update', typeof contentDivWithData, contentDivWithData.length)
        }
      catch (e3) {
        console.log('e3', e3);
      }
      try  {
        for (var key in contentDivWithData) {
            if (p.hasOwnProperty(key)) {
              console.log(key + " -> " + p[key]);
            }
        }
      }
      catch (e3) {
        console.log('e3', e3);
      }


}

  })




})
