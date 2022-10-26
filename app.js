var http = require('http');
const axios = require('axios');
console.log(1);

axios.get('https://api.jsonbin.io/v3/qs/6358ab610e6a79321e34ab09').then(
  res1 => {
    console.log('res:', res1.data);
    http.createServer(function (req, res) {
      console.log(`Just got a request at ${req.url}!`)
      res.write(JSON.stringify(res1.data));
      res.end();
    }).listen(process.env.PORT || 3001);
  }
).catch(
  err => {
    console.log('err:', err);
  }
).finally(
  console.log('request by axios done')
)
console.log(2);
