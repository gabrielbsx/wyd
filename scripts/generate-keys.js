import crypto from "node:crypto";
import { writeFileSync } from "node:fs";

const { privateKey, publicKey } = crypto.generateKeyPairSync("rsa", {
  modulusLength: 4096,
  publicKeyEncoding: {
    type: "spki",
    format: "pem",
  },
  privateKeyEncoding: {
    type: "pkcs8",
    format: "pem",
  },
});

writeFileSync("../keys/private.pem", privateKey);
writeFileSync("../keys/public.pem", publicKey);
