import { Router } from "express";
import User from "../models/User.js";
import brcypt from 'bcrypt'
import { generateJWTToken } from "../services/token.js";


const router = Router()

router.get('/login',(req, res) => {  
    if(req.cookies.token){
    res.redirect('/')
    return
    }
    res.render('login', {
        title: 'login | Yuriii',
        isLogin: true,
        loginError: req.flash('loginError')
    })
})

router.get('/register',(req, res) => {  
    if(req.cookies.token){
    res.redirect('/')
    return
    }
    res.render('register', {
        title: 'Register | Yuriii',
        isRegister: true,
        registerError: req.flash('registerError')
    })

})

router.get('/logout',(req, res) => {
    res.clearCookie('token')
    res.redirect('/')
    return
})

router.post('/login',async (req, res) => {
    const {email, password} = req.body
    
    if(!email || !password) {
        req.flash('loginError', "Ochiq maydonlarni to'ldiring!")
        res.redirect('/login')
        return
    }


    const existuser = await User.findOne({email})
    if(!existuser) {
        req.flash('loginError', "User not found")
        res.redirect('/login')  
        return  
    }

    const isPassEqual = await brcypt.compare(password, existuser.password)  
    
    if(!isPassEqual) {
        req.flash('loginError', "Parol xato")
        res.redirect('/login')  
        return  
    }
    
    const token = generateJWTToken(existuser._id)
    res.cookie('token', token, {httpOnly: true, secure: true})
    
    res.redirect('/')
})

router.post('/register', async(req, res) => {
    
    const {firstname, lastname, email, password} = req.body
    if(!firstname || !lastname || !email || !password) {
        req.flash('registerError', "Ochiq maydonlarni to'ldiring!")
        res.redirect('/register')
        return
    }
    const condidate = await User.findOne({email})
    if (condidate) {
        req.flash('registerError', 'User already exist')
        res.redirect('/register')
        return
    }

    const hashedPassword = await brcypt.hash(req.body.password, 10)

    const userData = {
        firstName: firstname,
        lastName: lastname,
        email: email,
        password: hashedPassword,
    }
    const user = await User.create(userData)
    const token = generateJWTToken(user._id)
    res.cookie('token', token, {httpOnly: true, secure: true})
    // console.log(token);
    res.redirect('/')
})


export default router