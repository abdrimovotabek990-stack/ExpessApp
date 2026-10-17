import jwt from 'jsonwebtoken'

import User from '../models/User.js'
import * as dotenv from 'dotenv'

dotenv.config()


export default async function (req, res, next) {
    if(!req.cookies.token){
        next()
        return
    }

    const token = req.cookies.token
    const decode = jwt.verify(token, process.env.JWT_SECRET)
    const user = await User.findById(decode.userId)

    if (!user) {
        res.clearCookie('token')
        res.redirect('/login')
        return 
    }
    
    req.userId = user._id
    next()
}