import React from 'react'
import { Link } from 'react-router-dom'
import '../styles/PodcastCard.css'

const EpisodeCard = (props) => {
  const name = props.name
  const image = props.images[1].url
  const id = props.id
  const duration_ms = props.duration_ms
  const release_date = props.release_date

  return (
    <div className="column is-one-quarter-desktop is-one-third-tablet is-half-mobile">
      <Link to={`/podcast/${id}`}>
        <div className="card">
          <div className="card-header">
            <h4 className="card-header-title">{name}</h4>
          </div>
          <div className="card-image">
            <figure className="image is-1by1">
              <img
                src={image}
                alt={name}
                loading="lazy"
                width="200"
                hieght="200"
              />
            </figure>
          </div>
          <div className="card-content">
            <h5>Release Date of Episodes is: {release_date}</h5>
            <h5>The Duration in ms is: {duration_ms}</h5>
          </div>
        </div>
      </Link>
    </div>
  )
}

export default EpisodeCard
