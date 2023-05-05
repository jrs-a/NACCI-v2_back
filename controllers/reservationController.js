const mongoose = require('mongoose')
const Reservation = require('../models/reservationModel')

//get all reservations
const getReservations = async (req, res) => {

    const user_id = req.user._id

    const reservations = await Reservation.find({ user_id }).sort({createdAt: -1}) //finds all values and sorts by date in descending order.
    res.status(200).json(reservations)
}

//get single reservation
const getSingleReservation = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Id does not exist!'})
    }

    const reservations = await Reservation.findById(id)

    if (!reservations) {
        return res.status(404).json({error: 'No reservations exist'})
    }
    res.status(200).json(reservations)
}

//create a reservation
const createReservation = async (req, res) => {
    const {title, location, date, noOfParticipants, pointPerson, contact, status} = req.body

    try {
        const user_id = req.user._id
        const reservations = await Reservation.create({title, location, noOfParticipants, pointPerson, contact, status, user_id}) //change values in postman when editing this
        res.status(200).json(reservations)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

//delete a reservation
const deleteReservation = async (req, res) => {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Id does not exist!'})
    }  

    const reservations = await Reservation.findByIdAndDelete({_id: id})
    if (!reservations) {
        return res.status(404).json({error: 'No reservations exist'})
    }
    res.status(200).json(reservations)
}

const updateReservation = async (req, res)=> {
    const {id} = req.params
    if(!mongoose.Types.ObjectId.isValid(id)) {
        return res.status(404).json({error: 'Id does not exist!'})
    }   
    
    const reservations = await Reservation.findOneAndUpdate({_id: id}, {
      ...req.body
    })

    if (!reservations) {
        return res.status(404).json({error: 'No reservation exist'})
    }
    res.status(200).json(reservations)
}

//export 
module.exports = {
    createReservation,
    getReservations,
    getSingleReservation,
    deleteReservation,
    updateReservation
}