const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
//initialize object
const myEmitter = new Emitter();

myEmitter.on('log', (msg, fileName) => {logEvents(msg, fileName);});

const PORT = process.env.PORT || 4040;

const serveFile = async (filePath, contentType, response) => {
    try {
        const rawData = await fsPromises.readFile(
            filePath,
            contentType.includes('image') ? '' : 'utf8'
            );

        const data = contentType === 'application/json' 
            ? JSON.parse(rawData) : rawData;

        response.writeHead(
            filePath.includes('404.html') ? 404 : 200, 
            { 'Content-Type': contentType });

        response.end(contentType === 'application/json' ? JSON.stringify(data) : data);
        //jadi kea gini kalo json
        // [{"firstname":"Dave","lastname":"Gray"},{"firstname":"John","lastname":"Smith"}]
        // response.end(data);
        // console.log(data);
    } catch (err) {
        console.error(err);
        myEmitter.emit('log', `${err.name} : ${err.message}`, 'errLog.txt');
        response.statusCode = 500;
        response.end();
    }
}

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);
    myEmitter.emit('log', `${req.url}\t${req.method}`, 'reqLog.txt');

    const extension = path.extname(req.url);

    let contentType;

    switch (extension) {
        case ".css":
            contentType = "text/css";
            break;
        case ".js":
            contentType = "text/javascript";
            break;
        case ".json":
            contentType = "application/json";
            break;
        case ".jpg":
            contentType = "image/jpeg";
            break;
        case ".png":
            contentType = "image/png";
            break;
        case ".txt":
            contentType = "text/plain";
            break;
        default:
            contentType = "text/html";
    }

    let filePath =
        contentType === "text/html" && req.url === "/"
            ? path.join(__dirname, "views", "index.html")
            : contentType === "text/html" && req.url.slice(-1) === "/" //kalo yg terakhir '/'
            ? path.join(__dirname, "views", req.url, "index.html")
            : contentType === "text/html"
            ? path.join(__dirname, "views", req.url)
            : path.join(__dirname, req.url);

    if (!extension && req.url.slice(-1) !== "/") filePath += ".html";
    console.log(filePath);
    const fileExists = fs.existsSync(filePath); //kalo file dengan path nya filePath gaada di sistem ini
    if (fileExists) {
        console.log("mantapplahbanng");
        //serve the file
        serveFile(filePath, contentType, res);
    } else {
        switch (path.parse(filePath).base) {
            case 'old-page.html':
                //serve 301 response
                res.writeHead(301, { 'Location' : '/new-page.html' });//301 itu ngebalikin ke head web
                console.log('kucing');
                res.end();
                break;
            case 'www-page.html':
                //serve 301 response
                res.writeHead(301, { 'Location' : '/' });//301 itu ngebalikin ke head web
                res.end();
                break;
            default:
                //serve 404 response
                serveFile(path.join(__dirname, 'views', '404.html'), 'text/html', res);
        };
    }
    // if (req.url === "/" || req.url === "index.html") {
    //     res.statusCode = 200;
    //     res.setHeader = ('Konten bp', 'text/html');
    //     filePath = path.join(__dirname, 'views', 'index.html');
    //     fs.readFile(filePath, 'utf8', (err, data) => {
    //         res.end(data);
    //     });
    // }
});

server.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});

//add listener for the log event


// myEmitter.emit('log', 'Log event emitted!');
//Emit event
// myEmitter.emit('log', 'Log event emitted!');

// logEvents('KONTOOOLLL');
