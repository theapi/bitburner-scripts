
const fs = require('fs');

const atob = (base64) => {
  return Buffer.from(base64, 'base64').toString('binary');
};

const encoded = fs.readFileSync('./gamesave.json', { encoding: 'utf-8' });
const saveString = decodeURIComponent(escape(atob(encoded)));

// console.log(saveString);
fs.writeFileSync('./gamesave-edit.json', saveString);