import { Request, Response } from 'express'
import productModel from '../models/productModel'
const { promisify } = require('util')
import fs from 'fs'

const unlink = promisify(fs.unlink)

async function getAll(req: Request, res: Response) {
  try {
    const data = await productModel.find()
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ message: 'DEU ERRO!' })
  }
}

async function getById(req: Request, res: Response) {
  try {
    const data = await productModel.findById(req.params.id)
    return res.status(200).send(data)
  } catch (error) {
    return res.status(400).send({ message: 'DEU ERRO!' })
  }
}

async function ProductRegister(req: Request, res: Response) {
  try {
    const { filename: image }: any = req.file

    const [name] = image.split('.')
    const filename = `${name}.jpg`

    await productModel.create({
      title: req.body.title,
      description: req.body.description,
      price: req.body.price,
      image: filename,
    })

    return res.status(201).send({ message: 'Product Created with success!' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function Update(req: Request, res: Response) {
  try {
    const { filename: image }: any = req.file

    const [name] = image.split('.')
    const filename = `${name}.jpg`

    await productModel.findByIdAndUpdate(req.params.id, {
      $set: {
        title: req.body.title,
        price: req.body.price,
        image: filename,
      },
    })

    return res.status(201).send({ message: 'Product Editado com success!' })
  } catch (error) {
    return res.status(400).send({ error })
  }
}

async function deleteOne(req: Request, res: Response) {
  try {
    const { id } = req.params

    const imagem = await productModel.findById(id)

    await productModel.findByIdAndDelete(id)

    fs.unlink(`uploads/${imagem.image}`, (err) => {
      if (err) throw err
      console.log('uploads/file.txt was deleted')
    })

    return res.status(201).send({ message: 'Product Deleted with success!' })
  } catch (error) {
    return res.status(400).send({ Mensagem: 'All cagado!!', error })
  }
}

// async function deleteAll(req: Request, res: Response) {
//   try {
//     const { id } = req.params

//     const imagem = await productModel.findById(id)

//     await productModel.deleteMany()

//     fs.unlink(`uploads/${imagem.image}`, (err) => {
//       if (err) throw err
//       console.log('uploads/file.txt was deleted')
//     })

//     return res.status(201).send({ message: 'Product Deleted with success!' })
//   } catch (error) {
//     return res.status(400).send({ Mensagem: 'All cagado!!', error })
//   }
// }

export default { getAll, getById, ProductRegister, deleteOne, Update }