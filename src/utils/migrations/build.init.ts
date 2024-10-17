import { readdirSync, writeFileSync } from "fs";
import { join } from "path";

export function buildInit() {
  const dir = readdirSync(join(__dirname, "..", "..", "migrations")).sort(
    function (a, b) {
      if (a < b) {
        return -1;
      }
      if (a > b) {
        return 1;
      }
      return 0;
    }
  );

  let importsStr = createImports(dir);
  importsStr += 'import { MigrationObject } from "./interfaces";\n';
  const bodyStr = createBody(dir);
  writeFileSync("./src/utils/migrations/gen.init.ts", importsStr + bodyStr, {
    encoding: "utf-8",
  });
}

function createImports(dir: string[]) {
  return dir.reduce(
    (prev, curr) =>
      prev +
      `import { MIGRATION as M_${curr.replace(
        ".ts",
        ""
      )} } from "../../migrations/${curr.replace(".ts", "")}";\n`,
    ""
  );
}

function esp(n: any) {
  return [...Array(n).keys()].reduce((prev, curr) => prev + `\t`, "");
}

function createBody(dir: string[]) {
  return `export function MigrationInit(): MigrationObject {\n\treturn {\n${dir
    .map(
      (el) => `${esp(2)}'${el.replace(".ts", "")}': M_` + el.replace(".ts", "")
    )
    .join(",\n")}\n${esp(1)}}\n}`;
}

buildInit();
