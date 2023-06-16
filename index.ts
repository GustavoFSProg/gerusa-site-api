import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './src/routes'

dotenv.config()

const { PORT } = process.env

// origin: ["https://junho-blog.netlify.app", "http://localhost:5173"] 

const app = express()


app.use(cors({
  origin: "http://localhost:5173"
 
}))

app.use(express.json())
app.use(routes)


app.listen(PORT, () => {
  console.log(` App Running: ${PORT}`)
})

export default app


