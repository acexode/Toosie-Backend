/* eslint-disable prettier/prettier */
import fs from 'fs';
import multer from 'multer';
import { v2 as cloudinary } from 'cloudinary';
import { CloudinaryStorage } from 'multer-storage-cloudinary';


let storage = multer.diskStorage({
  destination(req, file, done) {
    const dist = './uploads';
    if (!fs.existsSync(dist)) fs.mkdirSync(dist);
    return done(null, dist);
  },
  filename(req, file, done) {
    done(null, file.originalname);
  },
});


  const config = {
        cloud_name: process.env.CLOUD_NAME,
        api_key: process.env.CLOUDINARY_API_KEY,
        api_secret: process.env.CLOUDINARY_API_SECRET
    };
    console.log(config)

  cloudinary.config(config);

  storage = new CloudinaryStorage({
    cloudinary,
  });


export default multer({ storage });
