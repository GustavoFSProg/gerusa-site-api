import express, { Router, Request, Response } from 'express'

const routes = Router()

import uploadConfig from './config/uploadConfig'
import multer from 'multer'
import postController from './controllers/postController'
import ContactsController from './controllers/contactsController'
import userController from './controllers/userController'
import { isAuthorized } from './authorize'

const upload = multer(uploadConfig)

routes.post('/register', isAuthorized, upload.single('image'), postController.RegisterPost)
routes.get('/get-all-posts', isAuthorized, postController.getAllPosts)
routes.get('/get-post/:id', postController.selectedPost)
routes.put('/update-post/:id', upload.single('image'), postController.UpdatePost)
routes.put('/update-likes/:id', postController.updateLikes)
routes.put('/update-views/:id', postController.updateViews)
// routes.put('/update-post/:id', upload.array('image[]', 3), postController.UpdatePost)
routes.delete('/delete-post/:id', postController.deletePost)
routes.delete('/delete-all-posts', postController.deleteAll)

routes.post('/register-contacts', ContactsController.RegisterContacts)
routes.get('/get-all-contacts', isAuthorized, ContactsController.getAllContacts)

routes.post('/register-users', userController.createUser)
routes.post('/login', userController.Login)

routes.post('/auth', userController.AuthUser)

routes.get("/", (req: Request, res: Response) => {
  return res.status(200).send({ Message: ` App Running on Get` })
})

export default routes