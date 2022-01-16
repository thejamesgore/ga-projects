import axios from 'axios'
import { useHistory } from 'react-router'
import { useEffect } from 'react'

const baseURL = 'https://thejamesgore-project3.herokuapp.com'

export const registerUser = (formData) => {
  return axios.post(`${baseURL}/api/register`, formData)
}

export const loginUser = (formData) => {
  return axios.post(`${baseURL}/api/login`, formData)
}

export const LogoutUser = () => {
  const history = useHistory()

  useEffect(() => {
    removeToken()
    console.log(`Token removed from local storage`)
    history.push('/')
  })
}

export const isLoggedIn = () => {
  const token = getToken()
  if (!token) {
    return false
  }
}

export const getToken = () => {
  return window.localStorage.getItem('token')
}

export const setToken = (token) => {
  window.localStorage.setItem('token', token)
}

export const removeToken = () => {
  window.localStorage.removeItem('token')
}
