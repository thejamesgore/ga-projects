import User from '../models/user.js'
import jwt from 'jsonwebtoken'

async function registerUser(req, res, next) {
  try {
    const user = await User.create(req.body)
    res.status(201).send(user)
  } catch (err) {
    next(err)
  }
}

async function loginUser(req, res, next) {
  const password = req.body.password
  try {
    const user = await User.findOne({ email: req.body.email })

    if (!user) {
      return res.status(404).send({ message: 'not a user' })
    }

    if (!user.validatePassword(password)) {
      return res.status(401).send({ message: 'Unauthorized' })
    }
    const secret = 'travel'
    const token = jwt.sign({ userId: user._id }, secret, {
      expiresIn: '12h',
    })
    res.status(202).send({ token, message: 'Login successful' })
  } catch (err) {
    next(err)
  }
}

async function getAllUsers(_req, res, next) {
  try {
    const users = await User.find()

    return res.status(200).json(users)
  } catch (err) {
    next(err)
  }
}

async function getUser(req, res, next) {
  const id = req.params.id
  const decoded = jwt.decode(id)

  try {
    const user = await User.findById(decoded.userId).populate(
      'createdCountries'
    )

    if (!user) {
      return res.status(404).send({ message: 'User does not exit' })
    }
    return res.status(200).json(user)
  } catch (err) {
    next(err)
  }
}

export default { registerUser, loginUser, getUser, getAllUsers }
