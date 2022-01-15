import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import '../styles/NavBar.css'
import { useHistory } from 'react-router-dom'

const NavBar = () => {
  const [searchTerm, setSearchTerm] = useState('')
  const history = useHistory()

  const handleSearch = () => {
    if (localStorage.getItem('accessToken')) {
      history.push(`/results/${searchTerm}`)
    } else {
      history.push('/')
    }
  }

  return (
    <nav>
      <div>
        <div className="is-navbar">
          <Link to="/" className="navbar-item home">
            Home
          </Link>
          <Link to="/podcast" className="navbar-item podcasts">
            Podcasts
          </Link>
          <Link
            to="/podcast/:id"
            className="navbar-item has-background-success"
          >
            Episodes
          </Link>
          <div className="search-bar-container">
            <div className="fa fa-search  navbar-item" id="search-bar"></div>
            <input
              type="text"
              placeholder="Search for a podcast"
              className="search-bar"
              spellcheck="false"
              onChange={(event) => {
                setSearchTerm(event.target.value)
              }}
            />
            <button className="button is-info" onClick={handleSearch}>
              Search
            </button>
            <div className="fa fa-times navbar-item"></div>
          </div>
          <a
            href="https://github.com/thejamesgore/ga-projects/tree/main/GA-Project-2"
            className="navbar-item login-logout"
          >
            GitHub Files
          </a>
        </div>
      </div>
    </nav>
  )
}

export default NavBar
