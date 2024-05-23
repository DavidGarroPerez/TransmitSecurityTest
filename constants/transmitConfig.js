// constants/transmitConfig.js

import axios from 'axios'

const clientId = 'YOUR_CLIENT_ID'
const clientSecret = 'YOUR_CLIENT_SECRET'
const redirectUri = 'YOUR_REDIRECT_URI'
const baseURL = 'https://api.transmitsecurity.com'

const transmitClient = axios.create({
  baseURL,
  headers: {
    'Content-Type': 'application/json'
  }
})

const login = () => {
  const authUrl = `${baseURL}/oauth2/authorize?response_type=code&client_id=${clientId}&redirect_uri=${redirectUri}&scope=openid profile email`
  window.location.href = authUrl
}

const handleCallback = async (code) => {
  try {
    const response = await transmitClient.post('/oauth2/token', {
      grant_type: 'authorization_code',
      code,
      redirect_uri: redirectUri,
      client_id: clientId,
      client_secret: clientSecret
    })

    const { accessToken, idToken, refreshToken } = response.data
    console.log('Tokens de autenticación:', accessToken, idToken, refreshToken)
    // Guarda los tokens en almacenamiento local o en cookies según sea necesario
  } catch (error) {
    console.error('Error manejando el callback de autenticación:', error)
  }
}

const isAuthenticated = () => {
  const token = localStorage.getItem('access_token')
  return !!token
}

export { login, handleCallback, isAuthenticated }
