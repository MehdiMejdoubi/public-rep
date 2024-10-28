//Create simple server using node js
const http = require('http');

const server = http.createServer((req, res) => {
    res.end('hello from the server');
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Your server has started');
})