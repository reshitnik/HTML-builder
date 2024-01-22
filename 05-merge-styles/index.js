const fs = require('fs');
const path = require('node:path')
const notes = '05-merge-styles/index.js';
const notesDir = path.dirname(notes);
const notesFile = path.basename(notes);
const myPath = path.join(notesDir, notesFile);
const stylePath = path.join(notesDir,'styles' );



console.log(path.join(notesDir,'styles' ));

function readCss (way) {
    const arr = [];
    fs.readFile(way, 'utf-8', (err, data) => {
        if (err) {
            console.log(err)
        }
        fs.appendFile(path.join(notesDir, 'project-dist', 'bundle.css'), `${data} \n`, (err) => {
            if(err) throw err;
          });
    })
}

fs.writeFile(path.join(notesDir, 'project-dist', 'bundle.css'), '', (err) => {
    if(err) throw err;
  });




fs.readdir(stylePath, {withFileTypes: true}, (err, fileList) => {
    if (!err) {
        fileList.forEach((file) =>{
            fs.stat(`${file.path}/${file.name}`, (err, stats)=>{
                if(err){
                    console.error('Eror')
                }
                if (stats.isFile() && path.extname(file.name) === '.css') {
                    readCss(path.join(stylePath, file.name))
                }
            })
        });
    } else {
        console.log('some Error');
        }
    })

