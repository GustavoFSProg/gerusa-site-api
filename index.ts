import express, { Request, Response } from 'express'
import cors from 'cors'
import dotenv from 'dotenv'
import routes from './src/routes'
import path from 'path'

dotenv.config()

const { PORT } = process.env

// origin: ["https://junho-blog.netlify.app", "http://localhost:5173"] 

const app = express()


// app.use(cors({
//   origin: ["https://gerusa-site.netlify.app", "http://localhost:5173"]
  
// }))

app.use(cors())

app.use(express.json())
app.use(routes)


// app.use('/files', express.static(path.resolve(__dirname, '..', 'src/uploads')))

app.listen(PORT, () => {
  console.log(` App Running: ${PORT}`)
})


export default app


