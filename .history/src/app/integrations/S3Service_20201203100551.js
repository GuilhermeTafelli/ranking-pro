const AWS = require('aws-sdk');

const ACCESS_KEY = process.env.AWS_S3_ACCESS_KEY 
const SECRET_KEY = process.env.AWS_S3_SECRET_KEY
const BUCKET_NAME = process.env.AWS_S3_BUCKET_NAME
const REGION = process.env.AWS_S3_REGION

const s3 = new AWS.S3({
    accessKeyId: ACCESS_KEY,
    secretAccessKey: SECRET_KEY,
    region: REGION
});


class S3Service {
    async uploadFilePublicRead(base64EncodedImage, key){

        var buf = new Buffer.from(base64EncodedImage.replace(/^data:\w+\/\w+;base64,/, ""), 'base64');
        const contentType = base64EncodedImage.split(';')[0]
        console.log(contentType)
        const params = {
            Bucket: BUCKET_NAME,
            Key: key,
            Body: buf,
            ACL: "public-read",
            ContentType: contentType,
            ContentEncoding: 'base64',
        };

        const response = await s3.upload(params).promise();
        
        return response.Location
    };
}

module.exports = new S3Service()