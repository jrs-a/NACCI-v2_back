const mongoose = require('mongoose')

const Schema = mongoose.Schema

const reservationSchema = new Schema({
    title: {
        type: String,
        required: true
    },
    location: {
        type: String,
        required: true
    },
    // date: {
    //     type: Date,
    //     required: true
    // },
    noOfParticipants: {
        type: Number,
        required: true
    },
    pointPerson: {
        type: String,
        required: true
    },
    contact: {
        type: String,
        required: true
    },
    status: {
        type: Boolean
    }

}, { timestamps: true })

module.exports = mongoose.model('Reservation', reservationSchema)