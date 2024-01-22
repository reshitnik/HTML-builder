const fs = require('fs');
const readline = require('readline');
const rl = readline.createInterface({
  input: process.stdin,
  output: process.stdout
});

const path = require('node:path');
const notes = '02-write-file//02-write-file.txt';
const notesDir = path.dirname(notes);
const notesFile = path.basename(notes);
const myPath = notesDir + notesFile;

fs.writeFile(myPath, '', (err) => {
  if(err) throw err;
});

function answer(data) {
  fs.appendFile(myPath, `${data} \n`, (err) => {
    if(err) throw err;
  });
}

rl.question('Wrire something ', function (something) {
  answer(something)
  rl.setPrompt('What? ')
  rl.prompt();
  rl.on('line', function (ask) {
    if (ask.toLowerCase().trim() === 'exit') {
      rl.close();
    } else {
      rl.setPrompt("Write something else. exit to leave ");
      rl.prompt();
      answer(ask)
    }

});
    });
 rl.on('close', function(){
  console.log('Bye Bye');
 })


