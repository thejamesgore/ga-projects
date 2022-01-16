import jwt from 'jsonwebtoken'
import User from '../models/user.js'
import dotenv from 'dotenv'

dotenv.config()

async function secureRoute(req, res, next) {
  try {
    const authToken = req.headers.authorization

    if (!authToken || !authToken.startsWith('Bearer')) {
      return res
        .status(401)
        .send({ message: 'Not authorized to perform this funciton' })
    }

    const token = authToken.replace('Bearer ', '')

    console.log('🤖 AUTHTOKEN' + ' ' + authToken)
    console.log('🤖 STRIPPED TOKEN' + ' ' + token)

    jwt.verify(token, process.env.SECRET, async (err, data) => {
      if (err) {
        return res.status(401).send({ message: 'Unauthorized' })
      }

      console.log('RESPONSE FROM JWT IS >>> ', data)

      const user = await User.findById(data.userId)

      if (!user) {
        return res.status(404).send({ message: 'User not found' })
      }

      req.currentUser = user

      next()
    })
  } catch (err) {
    console.log(err)
    return res.status(401).send({ message: 'Unauthorized user!!' })
  }
}

export default secureRoute
