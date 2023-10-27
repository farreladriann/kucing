const multer = require("multer");
const express = require("express");
const stream = require('stream');
const app = express();
const port = 3000;
const gd_folder_id = '1FpD-C0Al7OIP1Cf1HwHt4aGoOx_WewwY'
const { drive } = require('./GoogleDrive');
const path = require('path');

const SaveOneFileToDrive = async (bufferStream, fileObject, fileNameInDrive, folderId) => {
    const fileExtension = path.extname(fileObject.originalname);

    const fileMetadata = {
        name: fileNameInDrive + fileExtension,
        parents: [folderId]
    }

    const media = {
        mimeType: fileObject.mimetype,
        body: bufferStream
    }

    const res = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: 'id'
    })
    console.log(res)

    const fileId = res.data.id;
    console.log(fileId)
    return fileId;
}

// Konfigurasi Multer dengan memoryStorage
const fileFilter = (req, file, cb) => {
    if (file.mimetype === 'image/jpg' || file.mimetype === 'image/jpeg' || file.mimetype === 'image/png') {
        cb(null, true);
    }
    else {
        cb(new Error('File type not supported'), false);
    }
}

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 1024 * 1024 * 2,
        files: 1
    },
    fileFilter
})

app.get("/", (req, res) => {
    res.send(
        '<form action="/upload" method="POST" enctype="multipart/form-data"><input type="file" name="file"><input type="submit" value="Upload"></form>'
    );
});

app.post("/upload", upload.single("file"), async (req, res) => {
    // Cek apakah file berhasil diunggah
    if (req.file) {
        // Mengakses buffer file yang diunggah
        
        // Contoh pemrosesan buffer, misalnya menyimpannya sebagai file baru
        // Di sini, kami hanya menampilkan panjang buffer sebagai contoh
        let fileObject = req.file;
        console.log(fileObject);
        let bufferStream = new stream.PassThrough();
        console.log(bufferStream)
        bufferStream.end(fileObject.buffer);
        // const response = await drive.files.create({
        //     resource: {
        //         name: 'konmtol' + path.extname(fileObject.originalname),
        //         parents: [gd_folder_id]
        //     },
        //     media: {    
        //         mimeType: "image/jpeg" || "image/jpg" || "image/png",
        //         body: bufferStream,
        //     },
        //     fields: "id",
        // });
        const fileId = await SaveOneFileToDrive(bufferStream, fileObject, 'testBaru', gd_folder_id);
        res.send(
            `id nnya ${fileId}.`
        );
    } else {
        res.send("Tidak ada file yang diunggah.");
    }
});

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
