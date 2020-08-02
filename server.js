const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const app = express()
require('dotenv').config({ path: './config/dev.env'})

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//connect to mongo
mongoose
    .connect(process.env.MONGO_URI, {useNewUrlParser: true, useUnifiedTopology: true, useCreateIndex: true})
    .then(() => console.log('Mongodb connected...'))
    .catch(err => console.log(err))

//Use routes
app.use('/api/items', require('./routes/api/items'))
app.use('/api/users', require('./routes/api/users'))
app.use('/api/auth', require('./routes/api/auth'))

//serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
        
    })
}
const port = process.env.PORT

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})