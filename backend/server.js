require('dotenv').config()
const express = require("express")
const workoutRoutes = require ('./routes/workouts')
const userRoutes = require ('./routes/users')
const mongoose = require('mongoose')

const app = express()

// middleware
//middleware for getting access to the request bodys
app.use(express.json())

app.use((req, res, next) => {
    console.log(req.path, req.method)
    next()
})
//routes
//only to test the api
// app.get("/", (req,res) => {
//     res.json({mssg: 'Welcome to the app'})
// })

//Now we will import our routes
app.use('/api/workouts', workoutRoutes)
app.use('/api/user', userRoutes)

//connect to db
mongoose.connect(process.env.MONG_URI)
.then(() => {
    app.listen(process.env.PORT, () => {
        console.log(`connected to db & listening on port ${process.env.PORT}`)
    })
})
.catch((error) => {
    console.log(error)
})

// listen for requests
// app.listen(process.env.PORT, () => {
//     console.log(`listening on port ${process.env.PORT}`)
// })