import multer from "multer";
import { mkdirSync, existsSync } from "node:fs";
import { randomUUID } from "node:crypto";
import path from "path";

// multer with disk storage engine
if (!existsSync("./uploads")) {
  console.log("Uploads folder does not exist. Creating…");
  mkdirSync("./uploads");
}

const storage = multer.diskStorage({
  destination: "./uploads/",
  filename: function (req, file, callback) {
    const suffix = file.originalname.split(".").at(-1);
    const filename = randomUUID() + "." + suffix;
    console.log(filename);
    callback(null, filename);
  },
});

export const upload = multer({ storage });
