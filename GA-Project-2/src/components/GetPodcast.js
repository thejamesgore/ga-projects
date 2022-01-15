import React, { useEffect, useState } from 'react'
import { useHistory } from 'react-router-dom'
import axios from 'axios'
import PodcastCard from './PodcastCard'

const podcastEndpoint = 'https://api.spotify.com/v1/me/shows'

const GetPodcast = () => {
  const [token, setToken] = useState('')
  const [data, setData] = useState({})
  const [showlist, setShowlist] = useState([])
  const history = useHistory()
  let showIds = []

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      setToken(localStorage.getItem('accessToken'))
    } else {
      history.push('/')
    }
  }, [])

  useEffect(() => {
    handleGetPodcasts()
  }, [token])

  useEffect(() => {
    if (data) {
      let values = data.items
      for (let val in values) {
        showIds.push(values[val].show.id)
      }
    }
  }, [data])

  useEffect(() => {
    console.log(`SHOW IDs >>>>>>> `, showIds)
  }, [showIds])

  const handleGetPodcasts = () => {
    axios
      .get(podcastEndpoint, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => {
        console.error('there was an error fetching podcasts', err)
      })
  }

  return (
    <div className="podcasts is-flex">
      {data?.items
        ? data.items.map((item) => (
            <PodcastCard key={item.show.name} {...item} />
          ))
        : null}
    </div>
  )
}

export default GetPodcast
