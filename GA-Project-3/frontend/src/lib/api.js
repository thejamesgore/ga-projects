import axios from 'axios'
import { getToken } from './auth'
const baseUrl = 'https://thejamesgore-project3.herokuapp.com'

export const getAllCountries = async () => {
  const data = await axios.get(`${baseUrl}/api/countries`)
  return data
}

export const getAllCountriesById = async () => {
  const data = await axios.get(`${baseUrl}/api/countries/${id}`)
  console.log('This is our countries returning with Ids')
  return data
}

export const createCountry = (formData) => {
  const requestConfig = {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
  return axios.post(`${baseUrl}/api/countries`, formData, requestConfig)
}

export const deleteCountry = (id) => {
  const requestConfig = {
    headers: { Authorization: `Bearer ${getToken()}` },
  }
  return axios.delete(`${baseUrl}/countries/${id}`, requestConfig)
}

export const getUser = async (id) => {
  const user = await axios.get(`${baseUrl}/api/user/${id}`)
  return user
}

export const getPhoto = async (country) => {
  let pexelsApiKey = process.env.REACT_APP_PEXELS_API_KEY2
  const requestConfig = {
    headers: {
      Authorization: `Bearer ${pexelsApiKey}`,
    },
  }

  const photo = await axios.get(
    `https://api.pexels.com/v1/search?query=${country}&per_page=1`,
    requestConfig
  )
  return photo
}
