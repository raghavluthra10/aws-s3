const fs = require("fs");
const multer = require("multer");
const multerS3 = require("multer-s3");
const dotenv = require("dotenv");
const express = require("express");

const { upload } = require("./upload");

dotenv.config({ path: "./.env" });

const app = express();

const port = process.env.PORT || 8000;

app.get("/", function (req, res) {
   res.send("Hello world");
});

const singleUpload = upload.single("image");

app.post("/image", function (req, res) {
   singleUpload(req, res, function (err, some) {
      if (err) {
         return res
            .status(422)
            .send({
               errors: [{ title: "Image Upload Error", detail: err.message }],
            });
      }

      return res.json({ imageUrl: req.file.location });
   });
});

app.listen(port, () => {
   console.log(`Server running on PORT: ${port}`);
});
