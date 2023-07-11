const fs = require("fs");
const path = require("path");

fs.readFile(path.join(__dirname, 'files', 'st.txt'), 'utf8', (err, data) => {
    if (err) throw err;
    console.log(data);
});

fs.readFile('./files/st.txt', (err, data) => {
    if (err) throw err;
    console.log(data.toString());
});

console.log("helloooo");

// CALLBACK HELL
// membuat file baru newST.txt dengan isi 'NASI kucing'
fs.writeFile(path.join(__dirname, 'files', 'newST.txt'), 'NASI kucing', (err) => {
    if (err) throw err;
    console.log('complete');
    // console.log(data);//undefined bahkan kalo taro data di callback
    fs.appendFile(path.join(__dirname, 'files', 'newST.txt'), '\nnambahinDINEWST', (err) => {
        if (err) throw err;
        console.log('appendnewst complete');

        fs.rename(path.join(__dirname, 'files', 'newST.txt'), path.join(__dirname, 'files', 'NEWnewST.txt'), (err) => {
            if (err) throw err;
            console.log('appendnewst complete');     
        });
    });
});

//kalo gada file nya ya dibuat, kalo ada ya ditambahin
fs.appendFile(path.join(__dirname, 'files', 'test.txt'), 'nambahin', (err) => {
    if (err) throw err;
    console.log('appendtest complete');
});


//exit on uncaught errors
process.on("uncaughtException", (err) => {
    console.error(`There was an uncaught error : ${err}`);
    process.exit(1);
});