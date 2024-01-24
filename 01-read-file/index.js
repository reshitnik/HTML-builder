const fs = require('fs');
const path = require('node:path')
const notes = '01-read-file/text.txt';
const notesDir = path.dirname(notes);

const reader = fs.createReadStream(path.join(notesDir, 'text.txt'), {

  encoding: 'utf8',

});

reader.on('data', (text) => process.stdout.write(text));


