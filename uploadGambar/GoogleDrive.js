const { google } = require('googleapis')
const env = require('dotenv')

const OAuth2Client = new google.auth.OAuth2(
    "835166406485-1mbmb7hlj4f68t9jnpsbgd1sao1v8qa9.apps.googleusercontent.com",
    "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",
    "https://developers.google.com/oauthplayground"
)

// access token : 1//04Wj85KwdznO_CgYIARAAGAQSNwF-L9IrXfaIY8RBf6_a9JLIoMUGIaeVYt0CLP-yuZe0IFE-DvvxoC3zTg8N0Ipjj32ebqcFW9M

OAuth2Client.setCredentials({ refresh_token: "1//04Wj85KwdznO_CgYIARAAGAQSNwF-L9IrXfaIY8RBf6_a9JLIoMUGIaeVYt0CLP-yuZe0IFE-DvvxoC3zTg8N0Ipjj32ebqcFW9M" })

const drive = google.drive({
    version: 'v3',
    auth: OAuth2Client
})

module.exports = {OAuth2Client, drive}