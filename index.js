const fs = require("fs");
const multer = require("multer");
const path = require("path");
const dotenv = require("dotenv");
const express = require("express");
const { s3 } = require("./aws-config");

const upload = multer({ dest: "photos/" });

dotenv.config({ path: "./.env" });

const app = express();

const port = process.env.PORT || 8000;

app.get("/", function (req, res) {
   res.send("Hello world");
});

app.post("/image", upload.single("image"), async function (req, res) {
   try {
      const originalName = req.file?.originalname;
      const fileName = req.file?.filename;
      const filePath = req.file?.path;

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

      const result = await uploadFile(filePath);

      // accessible url
      const url = result?.Location;
      const imagePath = `image/${result?.Key}`;

      // unlink the image to delete it from photos dir
      fs.unlink(filePath, function (err) {
         if (err) {
            console.log("error while unlinking file =>", err);
         }
      });

      res.json({
         success: true,
         message: "Photo uploaded successfully",
         url: url,
         imagePath: imagePath,
      });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Internal server error" });
   }
});

app.get("/image/:key", async function (req, res) {
   try {
      const key = req.params.key;

      console.log("key", key);
      function downloadFile(key) {
         const params = {
            Bucket: process.env.AWS_BUCKET_NAME,
            Key: key,
         };

         return s3.getObject(params).createReadStream();
      }

      const result = downloadFile(key);
      result.pipe(res);
   } catch (error) {
      console.log("error", error);
      res.json({
         success: false,
         message: error,
      });
   }
});

app.listen(port, () => {
   console.log(`Server running on PORT: ${port}`);
});
