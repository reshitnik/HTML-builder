const { error } = require('console');
const fs = require('fs');
const path = require('node:path')
const notes = '06-build-page/index.js';
const notesDir = path.dirname(notes);
// const notesDir = path.join(__dirname);
const notesFile = path.basename(notes);
const myPath = path.join(notesDir, notesFile);
const stylePath = path.join(notesDir, 'styles')
console.log(path.basename(notes))


// 1. создание папки project-dist
fs.mkdir(path.join(notesDir, 'project-dist'),
    { recursive: true },
    (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('project-dist created successfully!');
        fs.readdir(stylePath, {withFileTypes: true}, (err, fileList) => {
            if (!err) {
                fileList.forEach((file) =>{
                    fs.stat(`${file.path}/${file.name}`, (err, stats)=>{
                        if(err){
                            console.error('Eror css')
                        }
                        if (stats.isFile() && path.extname(file.name) === '.css') {
                            readCss(path.join(stylePath, file.name))
                        }
                    })
                });
            } else {
                console.error(err);
                }
            });

    });

// 2. создание папок функция
function createFolders(pathWay){
    fs.mkdir(pathWay,
        { recursive: true },
        (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('assets created successfully!');
        });
}



// копирование файлов в accets
function copyFile(fromFile, toFile){
  fs.copyFile(fromFile, toFile, (err)=>{
        if(err){
            console.error(err)
        }
    })
};

// чтение папки assets
function CopyAll(toDir, fromDir){
    fs.mkdir(path.join(toDir),
        { recursive: true },
        (err) => {
            if (err) {
                return console.error(err);
            }
            console.log('assets created successfully!');

    
    fs.readdir(fromDir, {withFileTypes: true}, (err, fileList) => {
        if (!err) {
            fileList.forEach(file => {
                if (file.isDirectory()) {
                    console.log(file.path, file.name)
                    CopyAll(path.join(notesDir,'project-dist', 'assets', file.name), path.join(notesDir, 'assets', file.name))
                } else {
                    copyFile(path.join(file.path, file.name), path.join(notesDir, 'project-dist', 'assets', path.basename(file.path), file.name))
                }
            })
        } else {
            console.log('some Error');
            }
        })
    });
    };

CopyAll(path.join(notesDir, 'project-dist'), path.join(notesDir, 'assets'));

// создание и компилирование файла style.css
function createFiles(filePath, some = '') {
    fs.writeFile(filePath, some, (err) => {
        if(err) throw err;
    })
};

createFiles(path.join(notesDir, 'project-dist', 'style.css'));


function readCss (way) {
    fs.readFile(way, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
        }
        fs.appendFile(path.join(notesDir, 'project-dist', 'style.css'), `${data} \n`, (err) => {
            if(err) throw err;
          });
    })
}

fs.readFile(path.join(notesDir, 'template.html'), 'utf-8', (err, data) =>{
    if (err) {
        console.err(err)
    }
    let text = data;
    let tags = text.match(/{{[a-z]+}}/g);
    tags = tags.map((tag) => tag.match(/\w+/g)[0]);
    fs.readdir(path.join(notesDir, 'components'), { withFileTypes: true }, (err, htmlList) => {
        if (err) {
            console.err(err)
        } else {
        htmlList.forEach((html) => {
            console.log('aaaaaaaaaaaa', html.name)
            if (tags.includes(html.name.replace('.html', ''))) {
              const reader = fs.createReadStream(path.join(notesDir, 'components', html.name), {encoding: 'utf8'},);
              reader.on('data', (text2) => {
                text = text.replace(`{{${html.name.replace('.html', '')}}}`, `${text2}`);
                fs.writeFile(path.join(notesDir, 'project-dist', 'index.html'), text, (err) =>{
                    if (err) {console.log(error)}
                })
            })
        }})
    }})
})

