import React from 'react'
import SearchCard from '../components/SearchCard'

function SearchResults(podcasts) {


    if (
      podcasts &&
      podcasts.data &&
      podcasts.data.shows &&
      podcasts.data.shows.items
    ) {
    let results = podcasts.data.shows.items
      console.log(`NAME >>> `, results[0].name)
      console.log(`IMAGE SRC >>>  `, results[0].images[0].url)
      console.log(`DESCRIPTION >>>  `, results[0].description)
      console.log(`PUBLISHER >>>  `, results[0].publisher)
    }
  
 
  return (
    <div>
      <p>

      </p>
    </div>
  )
}

export default SearchResults
