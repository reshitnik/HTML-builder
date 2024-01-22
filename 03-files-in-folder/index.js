const fs = require('fs');
const path = require('node:path')
const notes = './03-files-in-folder/secret-folder';
// const notesDir = path.dirname(notes);
// const notesFile = path.basename(notes);



fs.readdir(notes, {withFileTypes: true}, (err, fileList) => {
    if (!err) {
        fileList.forEach((file) =>{
            fs.stat(`${file.path}/${file.name}`, (err, stats)=>{
                if(err){
                    console.error('Eror')
                }
                if (stats.isFile()) {
                    console.log(`${path.basename(file.name, path.extname(file.name))} - ${path.extname(file.name)} - ${stats['size']}kb`);
                }
            })
        });
    } else {
        console.log('some Error');
        }
    })

