const { google } = require('googleapis')

const OAuth2Client = new google.auth.OAuth2(
    '344177767351-gt7ck4jm73nl6vcfp9a9hpe7n494oljb.apps.googleusercontent.com',
    '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',
    'https://developers.google.com/oauthplayground'
)

OAuth2Client.setCredentials({ refresh_token: '1//04tH91_DnzNbZCgYIARAAGAQSNwF-L9IrDEoXyefX_GYX1jPrHT_rTDVQAL3oeBH9Bm3D-W86tc1q-teQn09ZyjwkxuBI79oZGMU' })

const drive = google.drive({
    version: 'v3',
    auth: OAuth2Client
})

module.exports = {OAuth2Client, drive}