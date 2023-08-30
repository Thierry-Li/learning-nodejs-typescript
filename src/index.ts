import http from 'http';
// import https from 'https';

const server = http.createServer((req, res) => {
  if (req.url === '/health') {
    res.statusCode = 200;
    // res.setHeader('Content-Type', 'text/plain');
    // res.end('Server is healthy');
    res.setHeader('Content-Type', 'application/json');
    res.end(JSON.stringify({ status: 'ok, server is healthy' }));
  } else {
    res.statusCode = 404;
    res.setHeader('Content-Type', 'text/plain');
    res.end('Not found');
  }
});

const hostname = '127.0.0.1';
const port = 3000;

server.listen(port, hostname, () => {
  console.log(`Server is listening at https://${hostname}:${port} `);
});
