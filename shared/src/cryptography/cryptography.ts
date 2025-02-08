import crypto from "node:crypto";
import { readFileSync } from "node:fs";
import { join } from "node:path";

export interface ICryptography {
  encrypt: (data: string) => Promise<string>;
  decrypt: (data: string) => Promise<string>;
}

export class Cryptography implements ICryptography {
  private readonly _publicKey: string;
  private readonly _privateKey: string;

  constructor(keysFolder: string) {
    this._publicKey = readFileSync(join(keysFolder, "public.pem"), "utf8");
    this._privateKey = readFileSync(join(keysFolder, "private.pem"), "utf8");
  }

  public async encrypt(data: string): Promise<string> {
    return crypto
      .publicEncrypt(this._publicKey, Buffer.from(data))
      .toString("base64");
  }

  public async decrypt(data: string): Promise<string> {
    return crypto
      .privateDecrypt(this._privateKey, Buffer.from(data, "base64"))
      .toString();
  }
}
