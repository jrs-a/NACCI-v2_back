require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const activityRoutes = require('./routes/activities')
const userRoutes = require('./routes/user')
const reservationRoutes = require('./routes/reservations')

// express app
const app = express()

// connect to db
// mongoose.connect(process.env.MONGO_URI)
//     .then(() => {
//     // listen for requests
//         app.listen(process.env.PORT, () => {
//             console.log('connected to db & listening on port', process.env.PORT)
//         })
//     })
//     .catch((error) => {
//         console.log(error)
//     })

mongoose.set('strictQuery', false);
const connectDB = async () => {
    try {
        const conn = await mongoose.connect(process.env.MONGO_URI);
        console.log('connected to mongodb', conn.connection.host);
    } catch (error) {
        console.log(error);
        process.exit(1);
    }
}

connectDB().then(() => {
    app.listen(process.env.PORT, () => {
        console.log('listening on port', process.env.PORT);
    })
})

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})

// avoid CORS and any POST or OPTIONS error
app.use(function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Origin, X-Requested-With, Content-Type, Accept");
    next();
 })

 // routes REQUIRED!
app.use('/api/activities', activityRoutes)
app.use('/api/reservations', reservationRoutes)
app.use('/api/user', userRoutes)

