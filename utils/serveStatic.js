import path from 'node:path'
import fs from 'node:fs/promises'
import { sendResponse } from './sendResponse.js'
import { getContentType } from './getContentType.js'

export async function serveStatic(req, res, baseDir) {

 const publicPath = path.join(baseDir , 'public');
  const requestedFile = req.url === '/' ? 'index.html' : req.url; 
  const filePath = path.join(publicPath , requestedFile) ;

  try { 
    const extension = path.extname(filePath)
    const contentType = getContentType(extension)
    const content = await fs.readFile(filePath)
    sendResponse(res, 200, contentType , content)

  } catch (err) {
    // Check if the error code is 'ENOENT' (file not found)
    if (err.code === 'ENOENT') {
        console.log(`File not found: ${filePath}`);
        try {
            // If so, try to serve the custom 404.html page
            const errorFilePath = path.join(publicPath, '404.html');
            const errorContent = await fs.readFile(errorFilePath);
            sendResponse(res, 404, 'text/html', errorContent);
        } catch (error404) {
            // As a fallback, if 404.html is missing, send plain text
            sendResponse(res, 404, 'text/plain', '404 Not Found');
        }
    } else {
        // For any other kind of error, serve a 500 Server Error
        console.error(`Server Error: ${err.message}`);
        const errorHtml = `<html><h1>Server Error: ${err.code}</h1></html>`;
        sendResponse(res, 500, 'text/html', errorHtml);
    }
}

}
