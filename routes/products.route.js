import { Router } from "express";
import Product from "../models/Product.modul.js";
const router = Router()

router.get('/',(req, res) => {
    res.render('index', {
        title: 'Boom shop | Yuriii',
    })
})

router.get('/products',(req, res) => {  
    res.render('products', {
        title: 'Products | Yuriii',
        isProducts: true
    })
})

router.get('/add',(req, res) => {  
    res.render('add', {
        title: 'add | Yuriii',
        isAdd: true
    })
})

router.post('/add-products', async (req, res) => {
    const {title, description, image, price} = req.body
    const products = await Product.create(req.body)
    console.log(products);
    
    res.redirect('/')
})

export default router