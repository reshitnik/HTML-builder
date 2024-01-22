const fs = require('fs');
const path = require('node:path')
const notes = '01-read-file//text.txt';
const notesDir = path.dirname(notes);
const notesFile = path.basename(notes);
const myPath = notesDir + notesFile;


const file = new fs.ReadStream(myPath, {encoding: 'utf-8'});
file.on('readable', function(){
    const data = file.read();
    console.log(data);
});
 
