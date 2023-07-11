//membuat directory
const fs = require('fs');

// check if directory exist
// fs.existsSync banyak berguna buat nanti cek kalo file ada atau ga buat copy, delete dll
if (!fs.existsSync('./new')) {
    //eror kalo new already exist
    fs.mkdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory Created');
    });
}

if (fs.existsSync('./new')) {
    //eror kalo new already exist
    //ngapus file
    //tapi gabisa kalo directory nya ga kosong
    fs.rmdir('./new', (err) => {
        if (err) throw err;
        console.log('Directory Removed');
    });
}
