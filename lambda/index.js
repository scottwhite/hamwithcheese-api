var config  = require('./config').aws;
var AWS = require('aws-sdk');


exports.handler = function(event, context, callback) {
  var s3 = new AWS.S3();
  var response = {
    statusCode: 200,
    headers: {
      'Content-Type': 'text/html',
      'Access-Control-Allow-Origin': '*',
      'Access-Control-Allow-Headers': 'Content-type'
    }
  };
  //todo process
  var whichfile, nidx, files=['cheese', 'ham'];
  if(event.queryStringParameters){
    nidx = files.indexOf(event.queryStringParameters.name);
    whichfile = files[nidx];
  }
  if(!whichfile){
    response.body = 'Not a valid choice';
    response.statusCode = 400;
    callback(null, response);
    return;
  }
  s3.getObject({
        Bucket: config.bucket,
        Key: whichfile + '.html',
        ResponseContentType: 'text/html'
      }, function(err, data){
      if (err){
        response.statusCode = 500;
        response.body = err.statck;
        callback(err.stack, response);
      } else{
        response.body = data.Body.toString('utf-8');
        callback(null, response);
      }
  });
}
