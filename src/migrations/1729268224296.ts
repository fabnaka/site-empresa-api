import { QueryTypes, Transaction } from "sequelize";
import { Sequelize } from "sequelize/types";
import { MigrationImpl } from "../utils/migrations/interfaces";

const MIGRATION: MigrationImpl = {
  description: 'Default description of migration',
  up: async (db: Sequelize, t: Transaction) => {
    await db.query(
      `
      INSERT INTO usuario (usuario, senha, nome, ativo) VALUES ('master', '$2b$10$fzVR/eT2o8a85stYhIKbJOHoRI30v4Bv8GoGWnhyj0uRFDcvukL/y', 'Master', 'S')
      `, {
      replacements: [],
      type: QueryTypes.UPDATE,
      transaction: t
    });
  },
  down: async (db: Sequelize, t: Transaction) => {
    await db.query(`
        DROP TABLE teste_migration_2`, {
      replacements: [],
      type: QueryTypes.UPDATE,
      transaction: t
    });
  }
}

export { MIGRATION };
