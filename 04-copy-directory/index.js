const { error } = require('console');
const fs = require('fs');
const path = require('node:path')
const notes = '04-copy-directory/index.js';
const notesDir = path.dirname(notes);
const notesFile = path.basename(notes);
const myPath = notesDir + notesFile;

fs.mkdir(path.join(notesDir, 'files-copy'),
    { recursive: true },
    (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('Directory created successfully!');
    });

fs.readdir(path.join(notesDir, 'files-copy'), (err, fileList) =>{
    if (!err) {
        fileList.forEach(file => {
            fs.unlink(path.join(__dirname, 'files-copy', file), (err) => {
                if(err) {console.error(err)}
            })
        })
    }
})

fs.readdir(path.join(notesDir, 'files'), (err, fileList) => {
    if (!err) {
        fileList.forEach((file) =>{
            fs.copyFile(path.join(notesDir, 'files', file), path.join(notesDir, 'files-copy', file), (err)=>{
                if(err){
                    console.error('Eror')
                }
            })
        });
    } else {
        console.log('some Error');
        }
    })