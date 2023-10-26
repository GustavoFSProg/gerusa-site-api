import express, { Router, Request, Response } from 'express'

const routes = Router()

import uploadConfig from './config/UploadConfig'
import multer from 'multer'
import postController from './controllers/postController'
import ContactsController from './controllers/contactsController'
import userController from './controllers/userController'
import { isAuthorized } from './authorize'
import { multerConfig } from './config/uploader'

const upload = multer(uploadConfig)

routes.post('/register', multerConfig, postController.RegisterPost)
routes.get('/get-all-posts',  postController.getAllPosts)
routes.get('/get-post/:id', postController.selectedPost)
routes.put('/update-post/:id', multerConfig, postController.UpdatePost)
routes.put('/update-likes/:id', postController.updateLikes)
routes.put('/update-views/:id', postController.updateViews)
// routes.put('/update-post/:id', upload.array('image[]', 3), postController.UpdatePost)
routes.delete('/delete-post/:id', postController.deletePost)
routes.delete('/delete-all-posts', postController.deleteAll)

routes.post('/register-contacts', ContactsController.RegisterContacts)
routes.get('/get-all-contacts', ContactsController.getAllContacts)

routes.post('/register-users', userController.createUser)
routes.post('/login', userController.Login)
// routes.delete('/delete-all', userController.deleteUserMany)
routes.get('/get-all-users', isAuthorized, userController.getAll)
routes.put('/update-password/:id', userController.updatePassword)

routes.post('/auth', userController.AuthUser)

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).send({ Message: ` App Running on Get` })
})

export default routes
