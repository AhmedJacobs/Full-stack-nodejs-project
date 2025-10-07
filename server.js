import http from 'node:http'
import { serveStatic } from './utils/serveStatic.js'
import { handleGet } from './handlers/routeHandlers.js'
const PORT = 2500

const __dirname = import.meta.dirname

const server = http.createServer(async (req, res) => {

if(req.url.startsWith('/api')){
    if (req.method === 'GET'){
        return await handleGet(req, res); 
    }
    else if (req.method === 'POST'){
        return await handleGet(req , res) ; 
    }

    /*
Challenge: 
   1. Add a route for a POST request to '/api'.
   2. When a request comes in, pass the req and res to handlePost().
*/
}else {
    return await serveStatic(req , res , __dirname); 
}
}) ; 

server.listen(PORT, ()=> console.log(`Connected on port: ${PORT}`))
 