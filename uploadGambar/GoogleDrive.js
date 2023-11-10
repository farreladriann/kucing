const { google } = require('googleapis')

const OAuth2Client = new google.auth.OAuth2(
    GOOGLE_CLIENT_ID,
    GOOGLE_CLIENT_SECRET,
    GOOGLE_REDIRECT_URI
)

OAuth2Client.setCredentials({ refresh_token: GOOGLE_REFRESH_TOKEn })

const drive = google.drive({
    version: 'v3',
    auth: OAuth2Client
})

module.exports = {OAuth2Client, drive}