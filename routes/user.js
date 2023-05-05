const express = require('express')

// controller functions
const { loginUser, signupUser } = require('../controllers/userController')

const router = express.Router()

// login route
router.post('/login', loginUser)
// router.post('/Auth', loginUser)

// signup route
router.post('/signup', signupUser)
// router.post('/Auth', signupUser)

module.exports = router