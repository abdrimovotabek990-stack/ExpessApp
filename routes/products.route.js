import { Router } from "express";
import Product from "../models/Product.modul.js";
import authMiddleware from "../middlewares/auth.middleware.js";
import userMiddleware from "../middlewares/user.middleware.js";
const router = Router()

router.get('/',async (req, res) => {
    const products = await Product.find().lean()
  
    
    res.render('index', {
        title: 'Boom shop | Yuriii',
        products: products.reverse(),
        userId: req.userId ? req.userId.toString() : null,
    })
})

router.get('/products',(req, res) => {  
    res.render('products', {
        title: 'Products | Yuriii',
        isProducts: true
    })
})

router.get('/add',authMiddleware, (req, res) => {
    res.render('add', {
        title: 'add | Yuriii',
        isAdd: true,
        errorAddProducts: req.flash('errorAddProducts')
    })
})

router.post('/add-products',userMiddleware, async (req, res) => {
    const {title, description, image, price} = req.body
    if(!title || !description || !image || !price) {
        req.flash('errorAddProducts', "Ochiq maydonlarni to'ldiring!")
        res.redirect('/add')
        return
    }
    console.log(req.userId);
    await Product.create({...req.body, user: req.userId})
    res.redirect('/')
})

export default router