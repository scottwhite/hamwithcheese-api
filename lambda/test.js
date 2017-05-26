var config  = require('./config').aws;
var AWS = require('aws-sdk');
var express = require('express');
var app = express();

var awsconfig = new AWS.Config(config);

var s3 = new AWS.S3();
// var s3stream = s3.getObject({
//       Bucket: config.bucket,
//       Key: 'cheese.html',
//       ResponseContentType: 'text/html'
//     }).createReadStream();
app.get('/', function(req, res){

s3.getObject({
      Bucket: config.bucket,
      Key: 'cheese.html',
      ResponseContentType: 'text/html'
    }, function(err, data){
    if (err){
        res.send(err.stack);
    } else{
        res.set('Content-Type', 'text/html');
        res.send(data.Body.toString('utf-8'))
    }
  });

});
// var response = {
//   statusCode: 200,
//   headers: {
//     'Content-Type': 'text/html',
//     'Access-Control-Allow-Origin': '*',
//     'Access-Control-Allow-Headers': 'Content-type'
//   },
//   body: s3stream
// };

// app.get('/', function(req, res){
//   s3stream.pipe(res);
// });

app.listen(3000);
