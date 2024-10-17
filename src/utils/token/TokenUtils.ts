import fs from "fs";
import jwt from "jsonwebtoken";
import path from "path";
import util from "util";

const readFile = util.promisify(fs.readFile);

export default class TokenUtils {
  private constructor() {}

  static async encode<T>(data: T, expirationTime = null): Promise<string> {
    let keyPath = path.join(__dirname, `keys`, `private.pem`);
    let privateKey = await readFile(keyPath, "utf-8");

    return jwt.sign({ data }, privateKey, {
      expiresIn: "24h",
      algorithm: "RS256",
    });
  }

  static async decode<T>(token: string): Promise<T> {
    let keyPath = path.join(__dirname, `keys`, `public.pem`);
    let publicKey = await readFile(keyPath, "utf-8");

    return new Promise((resolve, reject) => {
      jwt.verify(
        token,
        publicKey,
        { algorithms: ["RS256"] },
        (err, decoded: any) => {
          if (err) {
            reject(err);
          } else {
            resolve(decoded.data);
          }
        }
      );
    });
  }

  static async decodeBasic<T>(token: string): Promise<T> {
    const base64Credentials = token.split(" ")[1];
    const credentials = Buffer.from(base64Credentials, "base64").toString(
      "utf8"
    );
    const [user, password] = credentials.split(":");
    return { usuario: user, senha: password } as any;
  }
}
