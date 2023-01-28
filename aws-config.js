const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

const s3 = new AWS.S3({
   accessKeyId: process.env.AWS_ACCESS_KEY,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
});

module.exports = s3;
