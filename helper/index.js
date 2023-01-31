const fs = require("fs");
const path = require("path");
const { s3 } = require("../aws-config");

function uploadFile(file) {
   try {
      const fileStream = fs.createReadStream(file);

      const uploadParams = {
         Bucket: process.env.AWS_BUCKET_NAME,
         Key: path.basename(file),
         Body: fileStream,
      };

      return s3.upload(uploadParams).promise();
   } catch (error) {
      console.log(error);
   }
}

function downloadFile(key) {
   const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      Key: key,
   };

   return s3.getObject(params).createReadStream();
}

function listObjectsFunction() {
   const params = {
      Bucket: process.env.AWS_BUCKET_NAME,
      MaxKeys: 10,
   };

   return s3.listObjects(params).promise();
}

module.exports = {
   downloadFile,
   uploadFile,
   listObjectsFunction,
};
