import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'

dotenv.config()

const { PORT } = process.env

const app = express()




  
app.use(cors({
  origin: "https://junho-blog.netlify.app"
 
}))


// app.use(cors())

app.use(express.json())
app.use(routes)


app.listen(PORT, () => {
  console.log(` App Running: ${PORT}`)
})

export default app


