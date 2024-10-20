import { QueryTypes, Transaction } from "sequelize";
import { Sequelize } from "sequelize/types";
import { MigrationImpl } from "../utils/migrations/interfaces";

const MIGRATION: MigrationImpl = {
  description: 'Default description of migration',
  up: async (db: Sequelize, t: Transaction) => {
    await db.query(`
        CREATE TABLE empresa (
        id INT AUTO_INCREMENT PRIMARY KEY,
        nome VARCHAR(255) NOT NULL,
        cnpj VARCHAR(14) NOT NULL,
        endereco VARCHAR(255) NOT NULL,
        telefone VARCHAR(14) NOT NULL,
        email VARCHAR(255) NOT NULL
        );
        `, {
      replacements: [],
      type: QueryTypes.UPDATE,
      transaction: t
    });
  },
  down: async (db: Sequelize, t: Transaction) => {
    await db.query(`
        DROP TABLE empresa`, {
      replacements: [],
      type: QueryTypes.UPDATE,
      transaction: t
    });
  }
}

export { MIGRATION };
