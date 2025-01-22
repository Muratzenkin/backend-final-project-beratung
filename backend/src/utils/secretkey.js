import { writeFileSync } from "fs";
import { v4 as uuidv4 } from "uuid";

function generateSecretKey() {
  return uuidv4().replace(/-/g, "");
}

const secretKey = generateSecretKey();
const envContent = `SECRET_KEY=${secretKey}\n`;

writeFileSync(".env", envContent, { flag: "a" });
console.log("Secret Key has been written to .env file");
