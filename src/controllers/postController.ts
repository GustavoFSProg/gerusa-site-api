import { PrismaClient } from '@prisma/client'
import { Request, Response } from 'express'
import { convertBufferToString, uploader } from '../config/uploader'

var cloudinary = require('cloudinary')

var imagem = ''
let figura = null

const prisma = new PrismaClient()

async function RegisterPost(req: Request, res: Response) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })

    // cloudinary.uploader.upload(req.file?.path, function (result: any, error: any) {
    //   imagem = result.secure_url
    //   resultado = result
    //   console.log(resultado)
    // })

    const file = convertBufferToString(req)
    if (file === undefined)
      return res.status(400).json({ error: 'Error converting buffer to string' })

    const { secure_url } = await uploader.upload(file)

    const data = await prisma.posts.create({
      data: {
        title: req.body.title,
        image: secure_url,
        text: req.body.text,
        desc: req.body.desc,
        likes: Number(req.body.likes),
        views: Number(req.body.views),
        author: req.body.author,
      },
    })

    return res.status(201).send({ msg: 'Success!', data })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }
}

async function UpdatePost(req: Request, res: Response) {
  try {
    cloudinary.config({
      cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
      api_key: process.env.CLOUDINARY_API_KEY,
      api_secret: process.env.CLOUDINARY_API_SECRET,
    })
    const dados = await prisma.posts.findFirst({
      where: { id: req.params.id },
      select: { image: true },
    })

    // console.log(file)
    if (!req.file) {
      figura = dados
      console.log('Entrou no if file!')

      const data = await prisma.posts.update({
        where: { id: req.params.id },
        data: {
          title: req.body.title,
          text: req.body.text,
          desc: req.body.desc,
          author: req.body.author,
        },
      })
      return res.status(400).json({ error: 'Post atualizado menos a imagem!!' })
    } else {
      const file: any = convertBufferToString(req)

      const { secure_url } = await uploader.upload(file)

      await prisma.posts.update({
        where: { id: req.params.id },
        data: {
          title: req.body.title,
          image: secure_url,
          text: req.body.text,
          desc: req.body.desc,
          author: req.body.author,
        },
      })
    }

    return res.status(201).send({ msg: 'Success!' })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }
}

async function updateLikes(req: Request, res: Response) {
  try {
    const data: any = await prisma.posts.findFirst({
      where: { id: req.params.id },
    })

    if (!data) return res.status(200).send({ msg: 'Post not found!' })

    const updateLikes = data.likes + 1

    await prisma.posts.update({
      where: { id: req.params.id },
      data: {
        likes: updateLikes,
      },
    })

    return res.status(200).send({ data, updateLikes, msg: 'Update likes Success!!' })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

async function updateViews(req: Request, res: Response) {
  try {
    const data: any = await prisma.posts.findFirst({
      where: { id: req.params.id },
    })

    if (!data) return res.status(200).send({ msg: 'Post not found!' })

    const updateViews = data.views + 1

    await prisma.posts.update({
      where: { id: req.params.id },
      data: {
        views: updateViews,
      },
    })

    return res.status(200).send({ data, updateLikes, msg: 'Update likes Success!!' })
  } catch (error) {
    return res.status(400).send({ msg: 'ERROR!!', error })
  }
}

async function getAllPosts(req: Request, res: Response) {
  try {
    const data = await prisma.posts.findMany({
      orderBy: { createdAt: 'desc' },
    })

    return res.status(201).send({ data })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }
}

async function deletePost(req: Request, res: Response) {
  try {
    await prisma.posts.delete({
      where: { id: req.params.id },
    })

    return res.status(201).send({ msg: 'Deletado' })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }
}

async function deleteAll(req: Request, res: Response) {
  try {
    await prisma.posts.deleteMany({})

    return res.status(201).send({ msg: 'Deletado' })
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }
}

async function selectedPost(req: Request, res: Response) {
  try {
    const data = await prisma.posts.findFirst({
      where: { id: req.params.id },
    })

    return res.status(201).send(data)
  } catch (error) {
    return res.status(400).send({ msg: 'Error!', error })
  }
}

export default {
  getAllPosts,
  updateViews,
  updateLikes,
  deleteAll,
  deletePost,
  selectedPost,
  RegisterPost,
  UpdatePost,
}
