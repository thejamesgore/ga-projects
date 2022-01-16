import express from 'express'
import countriesController from '../controllers/countriesController.js'
import commentsController from '../controllers/commentsController.js'
import citiesController from '../controllers/citiesController.js'

import userController from '../controllers/userController.js'
import secureRoute from '../middleWare/secureRoute.js'

const Router = express.Router()

Router.route('/countries')
  .get(countriesController.getAllCountries)
  .post(secureRoute, countriesController.createCountry)

Router.route('/countries/:id')
  .get(countriesController.getCountry)
  .delete(secureRoute, countriesController.deleteCountry)
  .put(secureRoute, countriesController.updateCountry)

Router.route('/countries/:id/comments').post(commentsController.createComment)

Router.route('/countries/:id/comments/:commentId')

  .put(secureRoute, commentsController.updateComment)
  .delete(secureRoute, commentsController.deleteComment)

Router.route('/countries/:id/city').post(
  secureRoute,
  citiesController.createCity
)
Router.route('/cities/:id').delete(secureRoute, citiesController.deleteCity)

Router.route('/register').post(userController.registerUser)
Router.route('/login').post(userController.loginUser)

Router.route('/user').get(userController.getAllUsers)
Router.route('/user/:id').get(userController.getUser)

export default Router
