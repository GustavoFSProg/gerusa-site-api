import md5 from 'md5'
import jwt from 'jsonwebtoken'

export function encryptPassword(password: any) {
  return md5(password, process.env.SECRET as string & { asBytes: true })
}

export function isEmail(email: any) {
  // eslint-disable-next-line no-useless-escape
  return /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/.test(email)
}

export function isPassword(password: any) {
  const validade = /(?=.*[a-z])(?=.*[A-Z])(?=.*\d).{8,}/
  if (validade.test(password)) return true
  return false
}

export async function generateToken(data: any) {
  const { email, password } = data
  return jwt.sign({ email, password }, process.env.SECRET as string & { asBytes: true }, {
    expiresIn: '1d',
  })
}

// export async function decodeToken(token) {
//   return jwt.decode(token,  process.env.SECRET as string & { asBytes: true }))
// }

export function verifyToken(token: any) {
  return (
    jwt.verify(token, process.env.SECRET as string & { asBytes: true }),
    (error: any, decode: any) => {
      if (error) return { error } as any
      return { decode } as any
    }
  )
}

// export async function isUser(data: any) {
//   const { email, password } = data
//   const user = await User.findOne(
//     password ? { email, password: encryptPassword(password) } : { email }
//   )
//   return user
// }

// export async function createUser(data: any) {
//   const user = await User.create({
//     name: data.name,
//     email: data.email,
//     avatar: data.avatar || null,
//     password: encryptPassword(data.password),
//   })
//   return user
// }

// export async function getCurrentUser(email: any) {
//   const currentUser = await User.findOne({ email })
//   return currentUser
// }



// const upload = multer({
//   storage: storage,
//   limits: { fileSize: 40000, files: 10 },//supondo que o máximo seriam 10 arquivos
//   fileFilter: function(req, file, cb) {
//   checkFileType(file, cb);
//   }
//   }).array('myImage');