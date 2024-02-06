const { GoogleSpreadsheet } = require('google-spreadsheet');
const OAuth2Client = require('./OAuth2Client');

const accessSpreadsheetDocument = async () => {
    const doc = new GoogleSpreadsheet(process.env.GOOGLE_SPREADSHEET_ID, OAuth2Client);
    await doc.loadInfo();
    return doc;
}

const doc = (async () => {
    try {
        return await accessSpreadsheetDocument();
    }
    catch (err) {
        console.error(err);
    }
})();

module.exports = doc;
