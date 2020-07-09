const express = require('express')
const mongoose = require('mongoose')
const path = require('path')
const items = require('./routes/api/items')
const app = express()

app.use(express.json())
app.use(express.urlencoded({extended: true}))

//db config
const db = require('./config/keys').mongoURI

//connect to mongo
mongoose
    .connect(db, {useNewUrlParser: true,useUnifiedTopology: true})
    .then(() => console.log('Mongodb connected...'))
    .catch(err => console.log(err))

//Use routes
app.use('/api/items', items)

//serve static assets if in production
if(process.env.NODE_ENV === 'production') {
    app.use(express.static('client/build'))
    app.get('*', (req, res) => {
        res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'))
    })
}
const port = process.env.PORT || 5000

app.listen(port, ()=>{
    console.log(`Server started on port ${port}`)
})