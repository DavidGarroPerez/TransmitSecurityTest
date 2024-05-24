// routes/userRoutes.js
import express from 'express'
import { login, getAllUsers, getUserById, createUser, updateUser, deleteUser } from '../controllers/userController.js'
import authenticateToken from '../middleware/authenticateToken.js'; // Solo importa la función middleware

const router = express.Router()

// Endpoints públicos
router.post('/users/login', login)

// Endpoints protegidos por token
// router.use(authenticateToken); // Descomenta si deseas proteger todas las rutas debajo de esta línea

// Definir rutas para usuarios
router.get('/users/showUsers', getAllUsers)
router.get('/users/getUser/:id', getUserById)
router.post('/users/createUser', createUser)
router.put('/users/updateUser/:id', authenticateToken, updateUser)
router.delete('/users/deleteUser/:id', authenticateToken, deleteUser)

export default router
