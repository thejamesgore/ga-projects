import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/PodcastCard.css'

const PodcastCard = (props) => {
  const name = props.show.name
  const publisher = props.show.publisher
  const total_episodes = props.show.total_episodes
  const image = props.show.images[1].url
  const id = props.show.id
  // destructuring
  // add an object here
  // console.log('this is props in podcast card', props) // to display what's inside the the object

  return (
    // add in an object in the link
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
      <Link to={`/podcast/${id}`}>
        <div className="card">
          <div className="card-header">
            <h4 className="card-header-title">{name}</h4>
          </div>

          <div className="card-image">
            <figure className="image is-1by1">
              {/* <Link to='episodes link'> */}
              <img
                src={image}
                alt={name}
                loading="lazy"
                width="200"
                hieght="200"
                // onClick={function}
              ></img>
              {/* </Link> */}
            </figure>
          </div>

          <div className="card-content">
            <h5>Number of Episodes: {total_episodes}</h5>
            <h5>The Publisher is: {publisher}</h5>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default PodcastCard
