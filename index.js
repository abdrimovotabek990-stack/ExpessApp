import 'dotenv/config'
import express from 'express'
import path, {dirname}  from 'path'
import{fileURLToPath} from 'url'

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

const app = express()


app.get('/',(req, res, next) => {
    res.status(200)
    res.sendFile(path.join(__dirname, 'views', 'index.html'))
    
})

app.get('/about',(req, res, next) => {
    res.status(200)
    res.sendFile(path.join(__dirname, 'views', 'about.html'))
    
})


const PORT = process.env.PORT || 5000
app.listen(PORT, () => console.log(`Server ishga tushdi => ${PORT}`))