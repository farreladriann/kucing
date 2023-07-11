const http = require("http");
const path = require("path");
const fs = require("fs");
const fsPromises = require("fs").promises;

const logEvents = require("./logEvents");
const EventEmitter = require("events");
class Emitter extends EventEmitter {}
//initialize object
const myEmitter = new Emitter();

const PORT = process.env.PORT || 3700;

const server = http.createServer((req, res) => {
    console.log(req.url, req.method);

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
// myEmitter.on('log', (msg) => {logEvents(msg);});

// myEmitter.emit('log', 'Log event emitted!');
//Emit event
// myEmitter.emit('log', 'Log event emitted!');

// logEvents('KONTOOOLLL');
