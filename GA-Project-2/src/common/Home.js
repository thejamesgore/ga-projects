import React from 'react'
import Login from '../auth/Login'
import '../styles/Home.css'

const Home = () => {
  return (
    <section className="hero is-fullheight-with-navbar landing">
      <div className="hero-body">
        <div className="front-element">
          <Login />
        </div>
      </div>
    </section>
  )
}

export default Home
