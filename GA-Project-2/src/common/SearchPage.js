import React, { useState, useEffect } from 'react'
import axios from 'axios'
import SearchCard from '../components/SearchCard'
import '../styles/SearchPage.css'

function SearchPage() {
  const [searchAddress, setSearchAddress] = useState()
  const [results, setResults] = useState({})
  const token = localStorage.getItem('accessToken')
  const handleSearch = () => {
    let string = window.location.pathname.substring(9)

    axios
      .get(
        `https://api.spotify.com/v1/search?q=${string}&type=show&market=US&limit=25&offset=0`,
        {
          headers: {
            Authorization: 'Bearer ' + token,
          },
        }
      )
      .then((response) => {
        setResults(response.data.shows)
      })
      .catch((err) => {
        console.error('there was an error fetching podcasts', err)
      })
    setSearchAddress(window.location.href)
  }

  useEffect(() => {
    handleSearch()
  }, [window.location.href])

  return (
    <div className="results-page">
      {results?.items
        ? results.items.map((item) => <SearchCard key={item[0]} {...item} />)
        : null}
    </div>
  )
}

export default SearchPage
