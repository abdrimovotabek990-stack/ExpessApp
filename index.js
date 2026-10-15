import 'dotenv/config'
import express from 'express'
import { create } from 'express-handlebars';
import Authroutes from './routes/auth.route.js'
import ProductsRoutes from './routes/products.route.js'

const app = express()

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.use(Authroutes)
app.use(ProductsRoutes)






const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server ishga tushdi => ${PORT}`))