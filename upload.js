const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
dotenv.config({ path: "./.env" });
const { s3 } = require("./aws-config.js");

const upload = multer({
   storage: multerS3({
      s3: s3,
      bucket: process.env.AWS_BUCKET_NAME,
      acl: "public-read",
      metadata: function (req, file, cb) {
         console.log("metadata ==>", file.fieldname);
         cb(null, { fieldName: file.fieldname });
      },
      key: function (req, file, cb) {
         cb(null, Date.now().toString());
      },
   }),
});

module.exports = { upload };
