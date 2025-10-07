import {getData} from '../utils/getData.js'
import { sendResponse } from '../utils/sendResponse.js';


async function parseJSONBody(req) {
    return new Promise((resolve, reject) => {
        let body = '';
        req.on('data', chunk => {
            body += chunk.toString();
        });
        req.on('end', () => {
            try {
                resolve(JSON.parse(body));
            } catch (error) {
                reject(error);
            }
        });
    });
}

export async function handleGet(req , res ){
    const data = await getData();
    const stringifiedData = JSON.stringify(data);  
    sendResponse(res , 200 , 'application/json' , stringifiedData); 
}

export async function handlePost(req, res) {
    // 1. Log the required message to the console
    console.log('POST request received');

    // 2. Send a simple response to close the connection
    res.end('POST request handled.');
}
// handlePost
// parseJSONBody() will collect and parse the incoming JSON
// santizeData() 
// addNewSighting() will do the donkey work of adding the data to our dataset
// sendResponse()

/*
Challenge:
  1. Create and export a function called handlePost().
  2. For now, that function can just log 'POST request received'.
*/
