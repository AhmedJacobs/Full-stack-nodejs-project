import http from 'node:http';
import { serveStatic } from './utils/serveStatic.js';
// 1. Import handlePost along with handleGet
import { handleGet, handlePost } from './handlers/routeHandlers.js';

const PORT = 2500;
const __dirname = import.meta.dirname;

const server = http.createServer(async (req, res) => {
    if (req.url.startsWith('/api')) {
        if (req.method === 'GET') {
            return await handleGet(req, res);
        } else if (req.method === 'POST') {
            // 2. Call handlePost, not handleGet
            return await handlePost(req, res);
        }
    } else {
        return await serveStatic(req, res, __dirname);
    }
});

server.listen(PORT, () => console.log(`Connected on port: ${PORT}`));