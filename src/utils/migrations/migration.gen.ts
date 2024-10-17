import { readFileSync, writeFileSync } from "fs";
import { join } from "path";
import { buildInit } from "./build.init";

export namespace GenMigration {
  export function newMigration() {
    const migrationPath = join(__dirname, "..", "..", "migrations");

    const newFileMig = join(
      migrationPath,
      new Date().getTime().toString() + ".ts"
    );

    var text = readFileSync(join(__dirname, "mig.template.txt"));
    writeFileSync(newFileMig, text);
    buildInit();
  }
}

const type = process.argv[2]; // up down

if (type === "new-migration") GenMigration.newMigration();

if (type === "refresh-mig") buildInit();
