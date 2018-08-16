const loginUser = {
  token: 'token',
  username: 'test', name: 'Mikko Mallikas'
}

const login = () => {
  return Promise.resolve(loginUser)
}

export default { login }
