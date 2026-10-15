import { Router } from "express";
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


router

export default router