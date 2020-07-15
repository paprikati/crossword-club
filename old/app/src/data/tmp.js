const fs = require('fs');
const rawWords = fs.readFileSync('./words.txt', 'utf8');
const words = rawWords.split('\n');
