import { QueryTypes, Transaction } from "sequelize";
import { Sequelize } from "sequelize/types";
import { MigrationImpl } from "../utils/migrations/interfaces";

const MIGRATION: MigrationImpl = {
  description: "Default description of migration",
  up: async (db: Sequelize, t: Transaction) => {
    await db.query(
      `
      CREATE TABLE usuario (
        id INT AUTO_INCREMENT PRIMARY KEY,
        usuario VARCHAR(255) UNIQUE,
        senha VARCHAR(255),
        nome VARCHAR(255),
        ativo CHAR(1)
      );            
      `,
      {
        replacements: [],
        type: QueryTypes.UPDATE,
        transaction: t,
      }
    );
  },
  down: async (db: Sequelize, t: Transaction) => {
    await db.query(
      `
        DROP TABLE usuario`,
      {
        replacements: [],
        type: QueryTypes.UPDATE,
        transaction: t,
      }
    );
  },
};

export { MIGRATION };
