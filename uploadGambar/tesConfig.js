const { GoogleSpreadsheet } = require("google-spreadsheet");
const { google } = require("googleapis");

async function accessSpreadsheet() {
    const OAuth2Client = new google.auth.OAuth2(
        "937186527844-vvph5uba1an6g4k9ue3bao2o4qe04ifv.apps.googleusercontent.com",
        "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",
        "https://developers.google.com/oauthplayground"
    );

    OAuth2Client.setCredentials({
        refresh_token:
            "1//04_XQWFrXYTHlCgYIARAAGAQSNwF-L9Ir1a69FA24IRpkTK-d1I3ip4Qq4FOabGoEGIDifWt6bCqB71Bgzm5v1SUDHaxh2TG9-Og",
    });

    const doc = new GoogleSpreadsheet("1-0aiSmdUS_mkyHi5bsv0R1XIwkSwJV4Yz8gaKVvN1t0", OAuth2Client);
    // Use the same OAuth2 client for Google Spreadsheet
    await doc.loadInfo();

    console.log(doc.title);
    const sheet = doc.sheetsByIndex[0];
    const rows = await sheet.getRows();
    console.log(rows.length);
}

accessSpreadsheet();
