import express from 'express'
import { create } from 'express-handlebars';
import mongoose from 'mongoose';
import * as dotenv from 'dotenv'

// Routes
import Authroutes from './routes/auth.route.js'
import ProductsRoutes from './routes/products.route.js'

dotenv.config()

const app = express()

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs'
})

console.log(app)

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(express.static('public'))
app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(Authroutes)
app.use(ProductsRoutes)




const startApp = () => {
    try {
        mongoose.connect(process.env.MONGO_URL)
    .then(() => {
        console.log("MongoDB bazasiga muvaffaqiyatli ulandi");
    })
    .catch((err) => {
        console.log("Bazaga ulanishda xatolik yuz berdi:", err);
    });

    const PORT = process.env.PORT || 5000
    app.listen(PORT, () => console.log(`Server ishga tushdi => ${PORT}`))
    } catch (error) {
        console.log(error)
    }
}

startApp()