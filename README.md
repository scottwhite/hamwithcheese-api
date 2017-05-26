# hamwithcheese-api
test for lambda to read s3 object based off query param from api gateway
flow is 
GET request to api url with name parameter -> proxies through to lambda, lambda reads the name param and serves up the s3 object
or an error message

lambda -> need to add a config.js that has

    module.exports = {
      aws: {
        accessKeyId:'<your access key>',
        secretAccessKey:'<your secret key>',
        bucket:'<bucket name>',
        region:'<aws region, ex; us-east-1>'
      }
    }


zip up the 2 files config.js, index.js

    zip -X hamwithcheese-api.zip config.js index.js 

Create lambda and use upload zip file

Create S3 bucket, currently code is looking for cheese or ham (for s3 objects cheese.html, ham.html), tweak accordingly 

Create API gateway and point to lambda, choose lambda proxy integration (Inegration Method panel), easy way to get queryparameters.

http://docs.aws.amazon.com/apigateway/latest/developerguide/api-gateway-create-api-as-simple-proxy-for-lambda.html
