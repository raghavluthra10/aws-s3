const AWS = require("aws-sdk");
const dotenv = require("dotenv");

dotenv.config({ path: "./.env" });

AWS.config.update({
   accessKeyId: process.env.AWS_ACCESS_KEY,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region: process.env.AWS_REGION,
});

const s3 = new AWS.S3();

module.exports = { s3 };
