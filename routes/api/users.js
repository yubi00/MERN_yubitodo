const express = require('express')
const Router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const config = require('config')

//Item Model
const User = require('../../models/User')

//@route POST api/useres
//@desc register new user
//@access public
Router.post('/', (req, res) => {
    const { name, email, password } = req.body
    //simple validation
    if(!name || !email || !password) {
        return res.status(400).send({
            message: 'Please enter all fields'
        })
    }

    //check for existing user
    User.findOne({ email })
        .then(user => {
            if(user) return res.status(400).send({
                message: "User already exist"
            })
            const newUser = new User({
                name,
                email,
                password
            })

            //create salt and hash
            bcrypt.genSalt(10, (err, salt) => {
                bcrypt.hash(newUser.password, salt, (err, hash) => {
                    if(err) throw err
                    newUser.password = hash
                    newUser.save()
                        .then(user => {
                            jwt.sign(
                                { id: user._id },
                                config.get('JWT_SECRET'),
                                { expiresIn: 3600 },
                                (err, token) => {
                                    if(err) throw err
                                    res.send({
                                        user: {
                                            id: user._id,
                                            name: user.name,
                                            email: user.email
                                        },
                                        token
                                    })
                                }
                            )
                           
                        })
                })
            })
        })
})



module.exports = Router
