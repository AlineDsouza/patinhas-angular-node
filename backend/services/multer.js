import multer from "multer";
import { CloudinaryStorage } from "multer-storage-cloudinary";
import cloudinary from "./cloudinary.js"; // importa sua config


const storage = new CloudinaryStorage({
  cloudinary,
  params: {
    folder: "pets", // pasta onde as imagens serão guardadas
    allowed_formats: ["jpg", "png", "jpeg"]
  }
});


const upload = multer({ storage });


export default upload;