const fs = require("fs");
const multer = require("multer");
const dotenv = require("dotenv");
const express = require("express");
const { uploadFile } = require("./aws-config");

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

      const result = await uploadFile(filePath);

      res.json({
         success: true,
         message: "Photo uploaded successfully",
      });
   } catch (error) {
      console.log(error);
      res.json({ success: false, message: "Internal server error" });
   }
});

app.listen(port, () => {
   console.log(`Server running on PORT: ${port}`);
});
