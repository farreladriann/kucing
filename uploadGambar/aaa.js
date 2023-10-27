const { gd } = require('date-fns/locale');
const fs = require('fs');
const { google }= require('googleapis');
const { OAuth2Client, drive } = require('./GoogleDrive');
const path = require('path');

const filePath = path.join(__dirname, 'the_numbers.png')

const   uploadOneFile = async () => {
    try {
        const response = await drive.files.create({
            media: {
                mimeType: "image/jpeg" || "image/jpg" || "image/png",
                body: fs.createReadStream(filePath),
            },
            resource: {
                name: 'konmtol.png',
                parents: ['1R-FPHsyZVAtTZfKORs6XLclkkRNMn4Wx']
            },
            fields: "id",
        })

        console.log(response.data);
    } catch (error) {
        console.log(error.message)
    }
}

uploadOneFile();
