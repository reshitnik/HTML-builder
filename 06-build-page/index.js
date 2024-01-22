const fs = require('fs');
const path = require('node:path')
const notes = '06-build-page/index.js';
const notesDir = path.dirname(notes);
const notesFile = path.basename(notes);
const myPath = path.join(notesDir, notesFile);
// const stylePath = path.join(notesDir);


// 1. создание папки project-dist
fs.mkdir(path.join(notesDir, 'project-dist'),
    { recursive: true },
    (err) => {
        if (err) {
            return console.error(err);
        }
        console.log('project-dist created successfully!');
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
            console.error('Eror')
        }
    })
};

// чтение папки assets
function readAll(way){
fs.readdir(way, {withFileTypes: true}, (err, fileList) => {
    if (!err) {
        fileList.forEach((file) =>{
            fs.stat(`${file.path}/${file.name}`, (err, stats)=>{
                if(err){
                    console.error('Eror')
                }
                if (stats.isDirectory()) {
                    console.log('dir path - ', path.join(notesDir, 'project-dist', 'assets', file.name))
                    createFolders(path.join(notesDir, 'project-dist', 'assets', file.name))
                    readAll(path.join(notesDir, 'assets', file.name))
                }
                if (stats.isFile ()) {
                    copyFile(path.join(file.path, file.name), path.join(notesDir, 'project-dist', 'assets', path.basename(file.path), file.name))
                }
            })
        });
    } else {
        console.log('some Error');
        }
    })
};

readAll(path.join(notesDir, 'assets'));

// создание и компилирование файла style.css
function createFiles(filePath, some = '') {
    fs.writeFile(filePath, some, (err) => {
        if(err) throw err;
    })
};

createFiles(path.join(notesDir, 'project-dist', 'style.css'));


function readCss (way) {
    // const arr = [];
    fs.readFile(way, 'utf-8', (err, data) => {
        if (err) {
            console.error(err)
        }
        fs.appendFile(path.join(notesDir, 'project-dist', 'style.css'), `${data} \n`, (err) => {
            if(err) throw err;
          });
    })
}

const stylePath = path.join(notesDir, 'styles')

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
        console.error(err);
        }
    });

// создание файла index.html и заполнение его
createFiles(path.join(notesDir, 'project-dist', 'index.html'));

fs.readFile(path.join(notesDir, 'template.html'), (err, htmlData) => {
    if(!err) {
        const partArr = htmlData.toString('utf-8').split('{{header}}');
        const htmlArr = [];
        htmlArr.push(partArr[0]);
        htmlArr.push(partArr[1].split('{{articles}}')[0]);
        htmlArr.push(partArr[1].split('{{articles}}')[1].split('{{footer}}')[0]);
        htmlArr.push(partArr[1].split('{{articles}}')[1].split('{{footer}}')[1]);
        // htmlArr.forEach((file, i )=> )
        htmlArr.forEach((file, i )=> createFiles(path.join(notesDir, 'components', `part${i}.html`), some = file))
    } else {
        console.error(err)
    }
})

function addHtml(part) {
fs.readFile(path.join(notesDir, 'components', part), 'utf-8' ,(err, data) => {
    if (!err) {
        fs.appendFile(path.join(notesDir, 'project-dist', 'index.html'), data, (err) => {
            if(err) throw err;
        });
    } else {
        console.error(err);
        }
    });
};

addHtml('part0.html');
addHtml('header.html');
addHtml('part1.html', 'part1.html');
addHtml('articles.html');
addHtml('part2.html', 'part2.html');
addHtml('footer.html');
addHtml('part3.html', 'part3.html');

function deleteFile(part){
    fs.unlink(path.join(notesDir, 'components', part), (err) => {
        if (err) throw err;
})
}

deleteFile('part0.html');
deleteFile('part1.html');
deleteFile('part2.html');
