import { Request, Response } from 'express'
import { verifyToken } from './Token'

// eslint-disable-next-line import/prefer-default-export
export async function isAuthorized(req: Request, res: Response, next: any) {
  const token = req.body.token || req.headers['x-access-token']

  if (!token) return res.status(401).send({ error: 'Not authorized' })

  const { error, decode }: any = await verifyToken(token)

  if (error) return res.status(401).send({ error: 'Invalid token' })
  // req.body.currentUser = await getCurrentUser(decode.email)
  return next()
}
