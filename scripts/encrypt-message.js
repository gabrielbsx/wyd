import crypto from "node:crypto";
import { readFileSync } from "node:fs";

const publicKey = readFileSync("../keys/public.pem");

const message = "specter";

const encryptedMessage = crypto.publicEncrypt(publicKey, Buffer.from(message));

console.log(encryptedMessage.toString("base64"));
