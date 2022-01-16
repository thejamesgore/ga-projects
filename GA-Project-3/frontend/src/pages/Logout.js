import React, { useEffect } from 'react'
import { useHistory } from 'react-router-dom'
import { isLoggedIn, removeToken } from '../lib/auth'

export default function Logout({ callback }) {
  const history = useHistory()
  useEffect(() => {
    removeToken()
    history.push('/countries')
    callback()
  }, [isLoggedIn])
  return <p>Logout</p>
}
