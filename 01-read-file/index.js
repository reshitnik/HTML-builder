const fs = require('fs');
const path = require('node:path')
const notes = '01-read-file/text.txt';
const notesDir = path.dirname(notes);
const notesFile = path.basename(notes);
const myPath = path.join(notesDir,notesFile);


fs.readFile(myPath, 'utf-8', (err, data) => {
    if (err) {
        console.log(err)
    } else {
        console.log(data)
    }
});


