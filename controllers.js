const fs = require("fs");
const path = require("path");
const { s3 } = require("./aws-config");
const {
   downloadFile,
   uploadFile,
   listObjectsFunction,
} = require("./helper/index");

async function postImage(req, res) {
   try {
      const filePath = req.file?.path;

      const result = await uploadFile(filePath);

      // in an ideal scenario, this url can be saved in a DB and later on used as a reference to download an image
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
      res.json({
         success: false,
         message: "internal server error",
         error: error,
      });
   }
}

async function downloadImage(req, res) {
   try {
      const key = req.params.key;

      console.log("key", key);

      const result = downloadFile(key);
      result.pipe(res);
   } catch (error) {
      console.log("error", error);
      res.json({
         success: false,
         message: "internal server error",
         error: error,
      });
   }
}

async function downloadAllImages(req, res) {
   try {
      const result = await listObjectsFunction();

      res.json({
         success: true,
         data: result,
      });
   } catch (error) {
      console.log("error", error);
      res.json({
         success: false,
         message: "internal server error",
         error: error,
      });
   }
}

module.exports = {
   postImage,
   downloadImage,
   downloadAllImages,
};
