const multer = require("multer");
const dotenv = require("dotenv");
const express = require("express");

const {
   postImage,
   downloadImage,
   downloadAllImages,
} = require("./controllers");

const upload = multer({ dest: "photos/" });

dotenv.config({ path: "./.env" });

const app = express();

const port = process.env.PORT || 8000;

// post image
app.post("/image", upload.single("image"), postImage);

// download single image
app.get("/image/:key", downloadImage);

// get all images
app.get("/images", downloadAllImages);

app.listen(port, () => {
   console.log(`Server running on PORT: ${port}`);
});
