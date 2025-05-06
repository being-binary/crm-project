import express from 'express'
import cors from 'cors'
import db from './database/mongoose.js'
import userRouter from './routes/userRouter.js'
import employeeRouter from './routes/employeeRouter.js'
const port = 8080
const app = express()
db()
app.use(cors({
    origin:['http://localhost:5173', 'https://crm-project-psi-snowy.vercel.app'],
    credentials: true
}))
app.use(express.json())

app.get('/', (req, res)=>{
    res.send('hello')
})

app.use('/user', userRouter)
app.use('/employee', employeeRouter)

app.listen(port, ()=>{
    console.log(`http://localhost:${port}`)
})