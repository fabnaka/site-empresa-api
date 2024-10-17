import 'reflect-metadata'

import chalk from "chalk";
import express from "express";

import dotenv from "dotenv";

import path from "path";
import { ApolloServer } from "apollo-server";

import { buildSchema } from "type-graphql";

import { envConfig } from "./config/config";

import { Sequelize } from "sequelize-typescript";
import { getModels } from "./getModels";

import { authChecker } from "./utils/authChecker";
import { getResolvers } from "./getResolvers";

import * as http from "http";
import { Migrations } from "./utils/migrations/migrations.main";
import { contextParser, wsContextParser } from "./utils/contextParser";

export let sequelize: Sequelize;

const main = async () => {
  dotenv.config();

  //ALTERAR ISSO DEPOIS PARA O DEPLOY
  process.env['NODE_TLS_REJECT_UNAUTHORIZED']='0';

  sequelize = new Sequelize(envConfig.sequelizeOptions);

  sequelize.addModels(getModels());

  await sequelize.authenticate();

  await Migrations.initMigrations(sequelize, { rollback: false });

  console.log(chalk.blue("db connection has been established successfully."));

  const app = express();
  
  const schema = await buildSchema({
    resolvers: getResolvers(),
    authChecker: authChecker,
    validate: false,
    globalMiddlewares: [],
  });

  const apolloServer = new ApolloServer({
    schema,
    context:contextParser,
    formatError: (err) => {
      console.log('\n' + chalk.red(err) + '\n');
      return err;
    }
  });

  await apolloServer.listen();
  
  const httpServer = http.createServer(app);

  await new Promise<void>((resolve) =>
    httpServer.listen({ port: process.env.PORT }, resolve)
  );

  console.log(
    chalk.green(`server ready at http://localhost:4000/graphql`)
  );
};

main().catch((err) => {
  console.error("\n" + chalk.red(err) + "\n");
});
