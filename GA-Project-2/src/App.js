import React from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import NavBar from './common/NavBar'
import Home from './common/Home'
import Login from './auth/Login'
import PodcastIndex from './components/PodcastIndex'
import GetEpisodes from './components/GetEpisodes'
import SearchPage from './common/SearchPage'

function App() {
  return (
    <BrowserRouter>
      <NavBar />
      <Switch>
        <Route exact path="/" component={Home} />
        <Route path="/login" component={Login} />
        <Route path="/podcast/:id" component={GetEpisodes} />
        <Route path="/podcast" component={PodcastIndex} />
        <Route path="/results" component={SearchPage} />
      </Switch>
    </BrowserRouter>
  )
}

export default App
