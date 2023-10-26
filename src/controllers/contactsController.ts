import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'

var cloudinary = require('cloudinary')

var imagem = ''
var resultado = ''

const prisma = new PrismaClient()

async function RegisterContacts(req: Request, res: Response) {
  try {
    const data = await prisma.contato.create({
      data: {
        nome: req.body.nome,
        email: req.body.email,
        telefone: req.body.telefone,
        message: req.body.message
      }
    })

    return res.status(201).send({ msg: 'Success!', data })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }
}

async function getAllContacts(req: Request, res: Response) {
  try {
    const data = await prisma.contato.findMany({
      orderBy: { createdAt: 'desc' }
    })

    return res.status(201).send({ data })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }
}

async function deleteContacts(req: Request, res: Response) {
  try {
    const data = await prisma.contato.delete({
      where: { id: req.params.id }
    })

    return res.status(201).send({ msg: 'Mensagem deletada com sucesso!' })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }
}

export default { RegisterContacts, deleteContacts, getAllContacts }
