const http = require('http');

const server = http.createServer((req, res) => {
    res.writeHead(200/* ini kode berhasil kea 404 kalo gagal */, {'Content-Type': 'text/plain'});
    res.end('Hello World!');
});

server.listen(3000, '127.0.0.1', () => {
    console.log('Server running at http://127.0.0.1:3000/');
});

console.log(http.server)