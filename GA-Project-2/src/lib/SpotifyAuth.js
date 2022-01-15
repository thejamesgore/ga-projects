import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import '../styles/App.css'

// Variables used to serve up the loginUrl to the Spotify API

const spotifyAuthEndpoint = 'https://accounts.spotify.com/authorize' // Auth endpoint
const redirectUri = 'https://thejamesgore-project2.herokuapp.com/' // redirect url after user is logged in
const clientID = '6949ff5463d648b5adc4aaf83e84c1d5' // our client ID
const spaceDelimiter = '%20'
const scopes = [
  // The functinoality we request from the Spotify API for the app. We can add further functionality by adding scopes from the spotify documentation
  `user-library-read`,
  `user-library-modify`,
]

const scopesUrlParam = scopes.join(spaceDelimiter)

const getReturnedParamsFromSpotifyAuth = (hash) => {
  const stringAfterHashtag = hash.substring(1)
  const paramsInUrl = stringAfterHashtag.split('&')
  const paramsSplitUp = paramsInUrl.reduce((accumulater, currentValue) => {
    // console.log(currentValue)
    const [key, value] = currentValue.split('=')
    accumulater[key] = value
    return accumulater
  }, {})

  console.log(paramsSplitUp.access_token)
  return paramsSplitUp
}

const SpotifyAuth = () => {
  const history = useHistory()

  useEffect(() => {
    if (window.location.hash) {
      const { access_token, expires_in, token_type } =
        getReturnedParamsFromSpotifyAuth(window.location.hash)

      localStorage.clear()

      localStorage.setItem('accessToken', access_token)
      localStorage.setItem('tokenType', token_type)
      localStorage.setItem('expiresIn', expires_in)
      history.push('/podcast')
      if (history.location.pathname === '/podcast') {
      }
    }
  })

  const handleLogin = () => {
    window.location = `${spotifyAuthEndpoint}?client_id=${clientID}&redirect_uri=${redirectUri}&scope=${scopesUrlParam}&response_type=token&show_dialog=true`
  }

  return (
    <div className="container">
      <button className="spotifyAuth__button" onClick={handleLogin}>
        <span className="shape"></span>LOGIN TO SPOTIFY
      </button>
    </div>
  )
}

export default SpotifyAuth
