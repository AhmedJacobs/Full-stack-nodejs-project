import path from 'node:path';
import fs from 'node:fs/promises';

const __dirname = import.meta.dirname;

export async function getData() {
    // Create a path to the data file
    const filePath = path.join(__dirname, '..', 'data', 'data.json');

    try {
        // Read the file as a string
        const jsonString = await fs.readFile(filePath, 'utf8');
        // Parse the string into a JavaScript object/array
        const parsedData = JSON.parse(jsonString);
        // Return the final data
        return parsedData;

    } catch (err) {
        // If any error occurs, log it and return an empty array
        // to prevent the application from crashing.
        console.error("Error in getData():", err);
        return [];
    }
}