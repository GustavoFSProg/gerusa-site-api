import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './routes'
import path from 'path'

dotenv.config()

const { PORT } = process.env

const app = express()

app.use(
  cors({
    origin: [
      'https://gamm-traducoes.netlify.app',
      'http://localhost:5173',
      'https://gustasoneca.000webhostapp.com',
    ],
  })
)

// app.use(cors())

app.use(express.json())
app.use(routes)

// app.use('/files', express.static(path.resolve(__dirname, '..', 'uploads')))

app.listen(PORT, () => {
  console.log(` App Running: ${PORT}`)
})

export default app
