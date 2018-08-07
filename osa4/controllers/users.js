const bcrypt = require('bcrypt')
const usersRouter = require('express').Router()
const User = require('../models/user')
const config = require('../utils/config')

usersRouter.get('/', async (request, response) => {
  try {
    const users = await User.find({})
    .populate('blogs')
    response.json(users.map(user => User.format(user)))
  }
  catch (err) {
    console.log(err)
    response.status(400).json({ error: 'server error' })
    return
  }

})

usersRouter.post('/', async (request, response) => {
  try {
    const body = request.body

    if (!body.password) {
      console.log('no password', body.password)
      response.status(400).json({ error: 'no password' })
      return
    }
    if (body.password.length < 3) {
      console.log('too short password', body.password)
      response.status(400).json({ error: 'too small password' })
      return
    }

    const saltRounds = 10
    const passwordHash = await bcrypt.hash(body.password, saltRounds)

    const user = new User({
      username: body.username,
      name: body.name,
      adult: body.adult,
      passwordHash
    })

    const savedUser = await user.save()

    response.json(savedUser)
  } catch (exception) {
    console.log(exception)
    response.status(500).json({ error: 'something went wrong...' })
  }
})

module.exports = usersRouter
