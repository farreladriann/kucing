const { google } = require('googleapis')

const OAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
)

OAuth2Client.setCredentials({ refresh_token: '1//04p2supXQLTW0CgYIARAAGAQSNwF-L9IrZbBtmxDYAyk3WQE5dyrfpAx546A0j3r7LfLWbXe08GY6zKwlAhrDLvle6YEJ7auqpvM' })

const drive = google.drive({
    version: 'v3',
    auth: OAuth2Client
})

module.exports = {OAuth2Client, drive}