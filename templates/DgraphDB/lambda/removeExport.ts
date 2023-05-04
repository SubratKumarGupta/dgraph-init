import * as fs from 'fs';

const inputFile = 'lambda/lambdas.js';
const outputFile = 'lambda/lambdas.js';

// Read input file
const inputContent = fs.readFileSync(inputFile, 'utf-8');

// Remove "export {}" string
const modifiedContent = inputContent.split('export {};').join('');

// Write modified content to output file
fs.writeFileSync(outputFile, modifiedContent);
