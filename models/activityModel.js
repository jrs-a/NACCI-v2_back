const mongoose = require('mongoose')

const Schema = mongoose.Schema

const activitySchema = new Schema({
    title: {
        type: String,
        required: true
    },
    body: {
        type: String,
        required: true
    },
    coverurl: {
        type: String
    }
}, { timestamps: true })

module.exports = mongoose.model('Activity', activitySchema)