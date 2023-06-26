import multer from 'multer'

const uploadConfig = {
  // eslint-disable-next-line new-cap
  storage: multer.diskStorage({
    // destination: path.resolve(__dirname, '..', '..', 'uploads'),
    filename(_req, file, cb) {
      const [name] = file.originalname.split('.')
      // const filename = `${name}.mp4`
      cb(null, file.originalname)
    },
  }),
}


export default uploadConfig
