//Create simple server using node js
const http = require('http');
const url = require('url');

const server = http.createServer((req, res) => {
    const pathName  = req.url;
    if(pathName === '/' || pathName === '/overview'){
        res.end('hello from the overview');
    }else if(pathName === '/product'){
        res.end('Hello from product page');
    }else {
        res.writeHead(404, {
           'Content-type': 'text/html',
        })
        res.end('<h1>Error</h1>');
    }
})

server.listen(8000, '127.0.0.1', () => {
    console.log('Your server has started');
})