const { google } = require('googleapis')

const OAuth2Client = new google.auth.OAuth2(
    '835166406485-1mbmb7hlj4f68t9jnpsbgd1sao1v8qa9.apps.googleusercontent.com',
    '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',
    'https://developers.google.com/oauthplayground'
)

OAuth2Client.setCredentials({ refresh_token: '1//04p2supXQLTW0CgYIARAAGAQSNwF-L9IrZbBtmxDYAyk3WQE5dyrfpAx546A0j3r7LfLWbXe08GY6zKwlAhrDLvle6YEJ7auqpvM' })

const drive = google.drive({
    version: 'v3',
    auth: OAuth2Client
})

module.exports = {OAuth2Client, drive}