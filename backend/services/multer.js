import multer from "multer";
import path from "path";
import { fileURLToPath } from "url";

// Isso é necessário para usar __dirname
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Armazena a imagem localmente temp.
const storage = multer.diskStorage({
  destination: function (request, file, cb) {
    cb(null, path.join(__dirname, "../uploads")); // pasta temporária
  },
  filename: function (request, file, cb) {
    const unique = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(null, unique + path.extname(file.originalname));
  }
});

const upload = multer({ storage });

export default upload;
