const fs = require('fs');
const path = require('node:path')
const notes = './03-files-in-folder/secret-folder';

fs.readdir(notes, {withFileTypes: true}, (err, fileList) => {
    if (!err) {
        fileList.forEach((file) =>{
            fs.stat(`${file.path}/${file.name}`, (err, stats)=>{
                if(err){
                    console.error('Eror')
                }
                if (stats.isFile()) {
                    console.log(`${path.basename(file.name, path.extname(file.name))} - ${path.extname(file.name).replace('.', '')} - ${Math.round((stats.size / 1024) * 1000) / 1000}kb`);
                }
            })
        });
    } else {
        console.log('some Error');
        }
    })

