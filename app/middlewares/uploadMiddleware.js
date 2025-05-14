const multer = require('multer');
const path = require('path');
const fs = require('fs');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    let folder = path.join(__dirname, '..', 'uploads', 'general');

    if (req.originalUrl.includes('/profile')) {
        folder = path.join(__dirname, '..', 'uploads', 'profiles');
    } else if (req.originalUrl.includes('/boardgame')) {
        folder = path.join(__dirname, '..', 'uploads', 'boardgames');
    } else if (req.originalUrl.includes('/event')){
        folder = path.join(__dirname,'..','uploads','events');
    }

    // Verifica que exista, si no, créalo
    if (!fs.existsSync(folder)) {
        fs.mkdirSync(folder, { recursive: true });
        console.log(`📂 Carpeta creada: ${folder}`);
    }
    cb(null, folder);
  },
  filename: (req, file, cb) => {
    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const ext = path.extname(file.originalname);
    cb(null, file.fieldname + '-' + uniqueSuffix + ext);
  },
});

const upload = multer({ storage });

// Exporta los métodos de multer para distintos casos
module.exports = {
  uploadSingle: (fieldName) => upload.single(fieldName),
  uploadArray: (fieldName, maxCount = 10) => upload.array(fieldName, maxCount),
  uploadFields: (fields) => upload.fields(fields),
  rawMulter: upload,
};
