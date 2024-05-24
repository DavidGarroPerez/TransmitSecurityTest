// frontend/js/index.js

import { login, handleCallback } from '../../constants/transmitConfig.js'

document.getElementById('loginButton').addEventListener('click', () => {
  login();
})

window.onload = () => {
  const urlParams = new URLSearchParams(window.location.search)
  const code = urlParams.get('code')
  if (code) {
    handleCallback(code)
  }
}
