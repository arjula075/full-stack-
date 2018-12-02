const getUserFromMemory = () => {
  const loggedUserJSON = window.localStorage.getItem('loggedBlogAppUser')
  if (loggedUserJSON) {
        const user = JSON.parse(loggedUserJSON)
        return user
  }
  else {
    return null
  }
}

const getBlogsFromMemory = () => {
  const loggedBlogsJSON = window.localStorage.getItem('loggedBlogAppUserBlogs')
  if (loggedBlogsJSON) {
        window.localStorage.removeItem('loggedBlogAppUserBlogs')
        const blogs = JSON.parse(loggedBlogsJSON)
        return blogs
  }
  else {
    return null
  }
}

const setUserToMemory = (user) => {
  window.localStorage.setItem('loggedBlogAppUser', JSON.stringify(user))
}
const setBlogsToMemory = (blogs) => {
  window.localStorage.setItem('loggedBlogAppUserBlogs', JSON.stringify(blogs))
}


const logOut = () => {
   window.localStorage.removeItem('loggedBlogAppUser')
   window.location.reload()
}

const displayNone = () => {
  return {
    display: 'none'
  }
}

const displayNormal = () => {
  return {
    display: ''
  }
}

const initializedFetchBlogArray = (blogs) => {
  blogs.sort((a, b) => b.likes - a.likes)
  for (let i = 0; i < blogs.length; i++) {
    blogs[i].visibility = false
  }
  return blogs
}

const makeAuthString = (token) => {
  let authString = token
  if (token && !token.toLowerCase().startsWith('bearer ')) {
    authString = 'bearer '.concat(token)
  }
  return authString
}

module.exports = {
  getUserFromMemory,
  logOut,
  setUserToMemory,
  displayNone,
  displayNormal,
  setBlogsToMemory,
  getBlogsFromMemory,
  initializedFetchBlogArray,
  makeAuthString
}
