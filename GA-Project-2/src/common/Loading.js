import React from 'react'
import '../styles/GetEpisodes.css'

const Loading = () => {
  return (
    <section className="hero is-fullheight-with-navbar">
      <div className="hero-body">
        <div className="container">
          <p className="title is-1 has-text-centered has-text-black">
            <span role="img" aria-label="logo" className="logo-emoji">
              Select a podcast
            </span>{' '}
            <img
              src="https://c.tenor.com/GNoM45eC-t4AAAAM/mr-bean-rowan-atkinson.gif"
              alt="choosign-gif"
            ></img>
          </p>
        </div>
      </div>
    </section>
  )
}

export default Loading
