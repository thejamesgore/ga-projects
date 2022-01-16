import React from 'react'

const CountriesSearchResults = ({ countries = [] }) => {
  return (
    <>
      {countries.map((data) => {
        if (data) {
          return (
            <div key={data._id}>
              <h1>{data.name}</h1>
            </div>
          )
        }
        return null
      })}
    </>
  )
}

export default CountriesSearchResults
