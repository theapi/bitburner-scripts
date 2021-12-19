var client = require('./elasticsearch/connection.js');
const config = require('config');
const elasticsearch = config.get('elasticsearch');

client.indices.create({
  "index": elasticsearch.bitburner.index,
  "body": {
    "mappings": {
      "_doc": {
        "properties": {
          "timestamp": {
            "type": "date"
          },
          "action": {
            "type": "text",
            "fields": { "raw": { "type": "keyword" } }
          },
          "server": {
            "type": "text",
            "fields": { "raw": { "type": "keyword" } }
          },
          "amount": {
            "type": "double"
          },
        }
      }
    }
  }
})
.then((msg) => {
  console.log(msg);
})
.catch ((err) => {
  console.error('failed: ' + err);
})
;
