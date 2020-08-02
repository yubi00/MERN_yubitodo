const express = require('express')
const Router = express.Router()
const bcrypt = require('bcryptjs')
const jwt = require('jsonwebtoken')
const auth = require('../../middleware/auth')

//Item Model
const User = require('../../models/User')

//@route POST api/auth
//@desc authenticate new user
//@access public
Router.post('/', (req, res) => {
    const { email, password } = req.body
    //simple validation
    if(!email || !password) {
        return res.status(400).json({
            message: 'Please enter all fields'
        })
    }

    //check for existing user
    User.findOne({ email })
        .then(user => {
            if(!user) return res.status(400).json({
                message: "User does not exist"
            })
           
            //validate password
            bcrypt.compare(password, user.password)
                .then(isMatch => {
                    if(!isMatch) return res.json(400).send({
                        message: "Invalid credentials"
                    })
                    jwt.sign(
                        { id: user._id },
                        process.env.JWT_SECRET,
                        { expiresIn: 360000 },
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

//@route GET api/auth/user
//@desc get user data
//@access private
Router.get('/user', auth, (req, res) => {
    User.findById(req.user.id)
    .select('-password')
    .then(user => res.json(user))
})

module.exports = Router
