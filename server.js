require('dotenv').config()

const express = require('express')
const mongoose = require('mongoose')
const activityRoutes = require('./routes/activities')

// express app
const app = express()

// middleware
app.use(express.json())
app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
// -app.use(ex[ress.urlencoded({ extended: false})]);
// app.use(
//     cors ({
//         origin: ['http://localhost:3000', 
//                 'https://philecotourism.onrender.com'],
//     })
// )

// routes
app.use('/api/activities', activityRoutes)

// connect to db
mongoose.connect(process.env.MONGO_URI)
    .then(() => {
    // listen for requests
        app.listen(process.env.PORT, () => {
            console.log('connected to db & listening on port', process.env.PORT)
        })
    })
    .catch((error) => {
        console.log(error)
    })


// process.env