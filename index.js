import 'dotenv/config'
import express from 'express'
import { create } from 'express-handlebars';


const app = express()

const hbs = create({
    defaultLayout: 'main',
    extname: 'hbs'
})

app.engine('hbs', hbs.engine);
app.set('view engine', 'hbs');
app.set('views', './views');

app.get('/',(req, res, next) => {
    res.render('index')
})

app.get('/about',(req, res, next) => {  
    res.render('about')
})

const repo = repo

const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server ishga tushdi => ${PORT}`))