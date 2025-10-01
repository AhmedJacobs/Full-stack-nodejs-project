// index.js
import http from 'http';

const server = http.createServer((req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end('<h1>Hello from ES Module Server!</h1>');
});

const port = 8000;
server.listen(port, () => { console.log(`Server running at http://localhost:${port}/`);});