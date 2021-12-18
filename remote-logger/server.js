const http = require('https');
const fs = require("fs");

/*
openssl genrsa -out privatekey.pem 1024
openssl req -new -key privatekey.pem -out certrequest.csr
openssl x509 -req -in certrequest.csr -signkey privatekey.pem -out certificate.pem
*/
var options = {
  key: fs.readFileSync('privatekey.pem').toString(),
  cert: fs.readFileSync('certificate.pem').toString()
};

const setCORS = (req, res) => {
  // Set CORS headers
  res.setHeader("Access-Control-Allow-Origin", "*");
  res.setHeader("Access-Control-Request-Method", "*");
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET");
  res.setHeader("Access-Control-Allow-Headers", "authorization, content-type");
}

const handler = function (req, res) {
  setCORS(req, res);
  res.writeHead(200);
  console.log(req.url);
  res.write(req.url);
  res.end(':)');
}

const server = http.createServer(options);
server.on("request", handler);
server.listen(8080);
