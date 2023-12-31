const multer = require("multer");
const express = require("express");
const stream = require("stream");
const app = express();
const port = 3000;
const gd_folder_id = "1FpD-C0Al7OIP1Cf1HwHt4aGoOx_WewwY";
const { drive } = require("./GoogleDrive");
const path = require("path");
const { appsactivity } = require("googleapis/build/src/apis/appsactivity");
const env = require("dotenv");

env.config();

const SaveOneFileToDrive = async (
    bufferStream,
    fileObject,
    fileNameInDrive,
    folderId
) => {
    const fileExtension = path.extname(fileObject.originalname);

    const fileMetadata = {
        name: fileNameInDrive + fileExtension,
        parents: [folderId],
    };

    const media = {
        mimeType: fileObject.mimetype,
        body: bufferStream,
    };

    const res = await drive.files.create({
        resource: fileMetadata,
        media: media,
        fields: "id",
    });
    console.log(res);

    const fileId = res.data.id;

    await drive.permissions.create({
        fileId: fileId,
        requestBody: {
            role: "reader",
            type: "anyone",
        },
    });

    return fileId;
};

const DeleteFileInDrive = async (fileId) => {
    try {
        if (fileId !== undefined || fileId !== null || fileId !== "") {
            await drive.files.delete({
                fileId: fileId,
            });
        }
    } catch (err) {
        throw err;
    }
};

const createFolder = async (folderName) => {
    const fileMetadata = {
        name: folderName,
        mimeType: "application/vnd.google-apps.folder",
        parents: [gd_folder_id],
    };

    const response = await drive.files.create({
        resource: fileMetadata,
        fields: "id",
    });

    console.log("Folder ID: ", response.data.id);
    return response.data.id;
};

// Konfigurasi Multer dengan memoryStorage
const fileFilter = (req, file, cb) => {
    if (
        file.mimetype === "image/jpg" ||
        file.mimetype === "image/jpeg" ||
        file.mimetype === "image/png"
    ) {
        cb(null, true);
    } else {
        cb(new Error("File type not supported"), false);
    }
};

const upload = multer({
    storage: multer.memoryStorage(),
    limits: {
        fileSize: 2 * 1024 * 1024, // Limit file size to 5MB
        files: 2
    },
    fileFilter,
});

app.get("/", (req, res) => {
    res.send(
        '<form action="/upload" method="POST" enctype="multipart/form-data"><input type="file" name="file"><input type="file" name="file2"><input type="submit" value="Upload"></form>'
    );
});

app.get("/display", (req, res) => {
    const fileId = "1TRArwIwto53gu_MMYuSC1rZMK2Jvlb9J";
    const imageUrl = "https://drive.google.com/uc?export=view&id=" + fileId;
    if (!imageUrl) {
        res.status(400).send("URL gambar tidak diberikan");
        return;
    }

    res.send(`<img src="${imageUrl}" alt="Gambar">`);
});

app.post(
    "/upload",
    upload.fields([
        { name: "file", maxCount: 1 },
        { name: "file2", maxCount: 1 },
    ]),
    async (req, res) => {
        // Cek apakah file berhasil diunggah
        if (req.files) {
            // Mengakses buffer file yang diunggah
            let fileObject = req.files.file[0];
            let fileObject2 = req.files.file2[0];
            console.log(fileObject, fileObject2);
            // Lanjutkan dengan kode Anda...
            const folderId = await createFolder("Folder Baru");
            const bufferStream = new stream.PassThrough();
            bufferStream.end(fileObject.buffer);
            const bufferStream2 = new stream.PassThrough();
            bufferStream2.end(fileObject2.buffer);
            const fileId = await SaveOneFileToDrive(
                bufferStream,
                fileObject,
                "File Baru",
                folderId
            );
            const fileId2 = await SaveOneFileToDrive(
                bufferStream2,
                fileObject2,
                "File Baru 2",
                folderId
            );
            res.send("File berhasil diunggah");
        }
    }
);

app.listen(port, () => {
    console.log(`Server berjalan di http://localhost:${port}`);
});
