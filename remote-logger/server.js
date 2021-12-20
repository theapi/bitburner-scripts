const http = require('https');
const fs = require("fs");
const config = require('config');

const esClient = require('./elasticsearch/connection.js');
const ElasticsearchLogger = require('./ElasticsearchLogger.js');
const esConfig = config.get('elasticsearch');
const esLogger = new ElasticsearchLogger(esClient, esConfig.bitburner.index);

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
  res.setHeader("Access-Control-Allow-Methods", "OPTIONS, GET, POST");
  res.setHeader("Access-Control-Allow-Headers", "authorization, content-type");
}

const handler = function (req, res) {
  setCORS(req, res);
  res.writeHead(200);
  if ( req.method === 'OPTIONS' ) {
		res.end();
		return;
	}

  if ( req.method === 'POST' ) {
		console.log('POST')
    let body = '';
    request.on('data', function(data) {
      body += data
    })
    request.on('end', function() {
      console.log(JSON.stringify(body, null, 2));
      response.end('post received')
    })
		return;
	}

  // GET request
  console.log(req.url);
  const data = req.url.split("/");
  console.log(data);
  const payload = {
    timestamp: new Date().getTime(),
    "action": data[1],
    "server": data[2],
    "amount": data[3],
  };
  esLogger.log(payload);
  res.write(req.url);
  res.end(':)');
}

const server = http.createServer(options);
server.on("request", handler);
server.listen(8080);
