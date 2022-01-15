import React, { useEffect, useState } from 'react'
import { useParams, useHistory } from 'react-router-dom'
import axios from 'axios'
import EpisodeCard from './EpisodeCard'
import Loading from '../common/Loading'
import '../styles/GetEpisodes.css'

const GetEpisodes = () => {
  const { id } = useParams()
  const token = localStorage.getItem('accessToken')
  const [data, setData] = useState({})
  const [state, setState] = React.useState({ episodes: null })
  const history = useHistory()
  let showIDs = null

  const handleGetEpisodes = () => {
    axios
      .get(`https://api.spotify.com/v1/shows/${id}/episodes`, {
        headers: {
          Authorization: 'Bearer ' + token,
        },
      })
      .then((response) => {
        setData(response.data)
      })
      .catch((err) => {
        console.error('there was an error fetching episodes', err)
      })
  }

  // useEffect(() => {
  //   if (!showIDs) {
  //     history.push('/podcast')
  //   }
  // }, [])

  useEffect(() => {
    if (localStorage.getItem('accessToken')) {
      handleGetEpisodes()
    } else {
      history.push('/')
    }
  }, [token])

  // if (state.episodes === null) {
  //   return <Loading />
  // }

  return (
    <div className="episodes-container">
      <div className="episodes-list">
        {data?.items
          ? data.items.map((item) => <EpisodeCard key={item.name} {...item} />)
          : null}
      </div>
    </div>
  )
}

// use this to get the ID out from the url and get the podcast episodes

export default GetEpisodes
