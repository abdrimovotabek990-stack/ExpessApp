import { Router } from "express";
import User from "../models/User.js";
const router = Router()

router.get('/login',(req, res) => {  
    res.render('login', {
        title: 'login | Yuriii',
        isLogin: true
    })
})

router.get('/register',(req, res) => {  
    res.render('register', {
        title: 'Register | Yuriii',
        isRegister: true
    })
})


router.post('/login',(req, res) => {
    res.redirect('/')
})

router.post('/register', async(req, res) => {
    const body = req.body
console.log(body);

    const userData = {
        firstName: body.firstname,
        lastName: body.lastname,
        email: body.email,
        password: body.password,
    }
    const user = await User.create(userData)
    console.log(user);
    res.redirect('/')
})


export default router