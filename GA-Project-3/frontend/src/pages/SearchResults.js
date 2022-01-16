import React from 'react'
import { useParams } from 'react-router-dom'
import { getAllCountries } from '../lib/api'
import { useEffect } from 'react/cjs/react.development'

export default function SearchResults() {
  let id = useParams()
  return (
    <div>
      <h1>THIS SEARCH TERM IS {id.id} </h1>
    </div>
  )
}
