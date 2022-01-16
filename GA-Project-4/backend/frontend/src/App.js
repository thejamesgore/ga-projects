import React from 'react'
import { HashRouter, Route, Switch } from 'react-router-dom'

import Home from './common/Home'
import NavBar from './components/NavBar'
import ProductPage from './common/ProductPage'
import Cart from './common/Cart'
import LoginPage from './common/LoginPage'
import RegisterPage from './common/RegisterPage'
import ProfilePage from './common/ProfilePage'
import ShippingPage from './common/ShippingPage'
import PaymentPage from './common/PaymentPage'
import ConfirmationPage from './common/ConfirmationPage'

function App() {
  return (
    <HashRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login/" component={LoginPage} />
        <Route path="/register/" component={RegisterPage} />
        <Route path="/profile/" component={ProfilePage} />
        <Route path="/shipping/" component={ShippingPage} />
        <Route path="/payment/" component={PaymentPage} />
        <Route path="/confirmation/" component={ConfirmationPage} />
        <Route path="/product/:id" component={ProductPage} />
        <Route path="/cart/:id?" component={Cart} />
      </Switch>
    </HashRouter>
  )
}

export default App
