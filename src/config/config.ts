import chalk from "chalk";
import { EnvConfig } from "./EnvConfig";
require("dotenv").config();

export let envConfig: EnvConfig;

envConfig = {
  sequelizeOptions: {
    dialect: 'mysql',
    database: process.env.DB_NAME,
    host: process.env.DB_HOST,
    password: process.env.DB_PASS,
    username: process.env.DB_USER,
    port: Number(process.env.DB_PORT),
    logging: /* false */ (sql) => console.log(chalk.blue(sql)),
  },
  logging: {
    logsrc: `${process.cwd()}/log`,
    type: ["console", "file"],
    dbug: true,
    error: true,
    info: true,
    warn: true,
    assert: true,
  }
};
