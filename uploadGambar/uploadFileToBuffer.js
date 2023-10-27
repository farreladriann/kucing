const multer = require('multer')

const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('File type not supported'), false);
    }
}

const uploadFileToBuffer = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 2,
        files: 1
    },
    fileFilter
})

module.exports = uploadFileToBuffer;