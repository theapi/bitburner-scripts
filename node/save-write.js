
const fs = require('fs');

const btoa = (text) => {
  return Buffer.from(text, 'binary').toString('base64');
};

const data = fs.readFileSync('./gamesave-edit.json', { encoding: 'utf-8' });
const saveString = btoa(unescape(encodeURIComponent(data)));

//console.log(saveString);
fs.writeFileSync('./gamesave-hacked.json', saveString);
