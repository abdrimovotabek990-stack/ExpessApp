import { Router } from "express";
const router = Router()

router.get('/',(req, res) => {
    res.render('index', {
        title: 'Boom shop | Yuriii'
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

export default router