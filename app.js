import { login, handleCallback, isAuthenticated } from './constants/transmitConfig.js'

// app.js
const express = require('express')
const bodyParser = require('body-parser')
const userRoutes = require('./routes/userRoutes')

const app = express()
const PORT = process.env.PORT || 3000

// Middleware
app.use(bodyParser.json())

// Ruta para iniciar el flujo de autenticación
app.get('/login', (req, res) => {
  login()
})

// Ejemplo de una ruta protegida
app.get('/protected', (req, res) => {
  if (isAuthenticated()) {
    res.send('Este es un recurso protegido.')
  } else {
    res.redirect('/login')
  }
})

// Rutas
app.use('/api', userRoutes)
// Ruta de redirección después de la autenticación
app.get('/callback', async (req, res) => {
  const code = req.query.code
  await handleCallback(code)
  res.send('Autenticación completada. Ahora puedes acceder a los recursos protegidos.')
})

// Iniciar servidor
app.listen(PORT, () => {
  console.log(`Servidor iniciado en el puerto http://localhost:${PORT}`)
})
