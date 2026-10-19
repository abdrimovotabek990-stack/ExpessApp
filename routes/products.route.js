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

router.get('/products',async(req, res) => {  
    const user = req.userId ? req.userId.toString() : null
    const myProducts = await Product.find({user}).populate('user').lean()
    res.render('products', {
        title: 'Products | Yuriii',
        isProducts: true,
        myProducts: myProducts,
    })
})

router.get('/add',authMiddleware, (req, res) => {
    res.render('add', {
        title: 'add | Yuriii',
        isAdd: true,
        errorAddProducts: req.flash('errorAddProducts')
    })
})

router.get('/product/:id', async(req, res) =>{
    const id = req.params.id
    const product = await Product.findById(id).populate('user').lean()
    
    res.render('product', {
        product: product,
    })
})

router.get('edit-product/:id', async(req, res) =>{
    const id = req.params.id
    const product = await Product.findById(id).populate('user').lean()
    res.render('edit-product',{
        product:  product,
        errorEditProducts: req.flash('errorEditProducts')
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


router.post('/edit-product/:id', async(req, res) =>{
    const {title, description, image, price} = req.body
    if(!title || !description || !image || !price) {
        req.flash('errorEditProducts', "Ochiq maydonlarni to'ldiring!")
        res.redirect('/add')
        return
    }

    await Product.findByIdAndUpdate(id, req.body, {new: true})

    res.redirect('/products')
})

export default router