const fsPromises = require('fs').promises;
//atau juga bisa
//const fs = require('fs')
//const fsPromises = fs.promises
const path = require('path');

const fileOps = async() => {
    try {
        //ngambil data kea (err, data) kea yang sebelumnya
        const data = await fsPromises.readFile(path.join(__dirname, 'files1', 'st1.txt'), 'utf8');
        console.log(data);
        await fsPromises.unlink(path.join(__dirname, 'files1', 'st1.txt'), 'utf8');//menghapus file st1
        //kode berjalan sesuai urutan
        await fsPromises.writeFile(path.join(__dirname, 'files1', 'where.txt'), 'Where\nthe\nplace\nbehind');
        await fsPromises.appendFile(path.join(__dirname, 'files1', 'where.txt'), 'Where\nthi\nplice\nbihind');
        await fsPromises.rename(path.join(__dirname, 'files1', 'where.txt'), path.join(__dirname, 'files1', 'newwhere.txt'));
        await fsPromises.copyFile(path.join(__dirname, 'files1', 'newwhere.txt'), path.join(__dirname, 'files1', 'copynewwhere.txt'));
        const newData = await fsPromises.readFile(path.join(__dirname, 'files1', 'copynewwhere.txt'), 'utf8');
        console.log(newData);
    } catch (err) {
        console.log('Error di backend');
        console.error(err);
    }
}

fileOps();