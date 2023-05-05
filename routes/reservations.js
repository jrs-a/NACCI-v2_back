const express = require('express')
const router = express.Router()
const {
    createReservation,
    getReservations,
    getSingleReservation,
    deleteReservation,
    updateReservation
} = require('../controllers/reservationController')
const requireAuth = require('../middleware/requireAuth')

// require auth for all reservation routes
router.use(requireAuth)

// GET all reservations
router.get('/', getReservations)

// GET a single reservation
router.get('/:id',getSingleReservation)

// POST a new reservation
router.post('/', createReservation)

// DELETE a reservation
router.delete('/:id', deleteReservation)

// UPDATE a reservation
router.patch('/:id', updateReservation)

module.exports = router