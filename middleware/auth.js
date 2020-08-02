const jwt = require('jsonwebtoken')
const config = require('config')

const auth = (req, res, next) => {
    const token = req.header('x-auth-token')

    //check for token
    if(!token) {
       return  res.status(401).send({
            message: "No token, Unauthorized access"
        })
    }
    
    try {    
        //verify token
        const decoded = jwt.verify(token, process.env.JWT_SECRET)

        //dd user from payload
        req.user = decoded
        next()
    }catch(e) {
        res.status(400).send({
            message: "token is not valid"
        })
    }

}

module.exports = auth