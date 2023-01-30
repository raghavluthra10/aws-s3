const AWS = require("aws-sdk");
const dotenv = require("dotenv");
const fs = require("fs");
const path = require("path");
dotenv.config({ path: "./.env" });

const s3 = new AWS.S3({
   accessKeyId: process.env.AWS_ACCESS_KEY,
   secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
   region: process.env.AWS_REGION,
});

function uploadFile(file) {
   try {
      const fileStream = fs.createReadStream(file);

      const uploadParams = {
         Bucket: process.env.AWS_BUCKET_NAME,
         // Add the required 'Key' parameter using the 'path' module.
         Key: path.basename(file),
         // Add the required 'Body' parameter
         Body: fileStream,
      };

      return s3.upload(uploadParams).promise();
   } catch (error) {
      console.log(error);
   }
}

module.exports = { uploadFile };
