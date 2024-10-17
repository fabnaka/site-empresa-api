import { Transaction } from "sequelize";
import { Sequelize } from "sequelize-typescript";

export interface MigrationImpl {
  description: string;
  up: (db: Sequelize, t: Transaction) => Promise<any>;
  down: (db: Sequelize, t: Transaction) => Promise<any>;
}

export interface MigrationObject {
  [version: string]: MigrationImpl;
}

export type MigrationFunctions = () => MigrationImpl;

export interface MigrationConfig {
  rollback?: boolean;
  rollbackCount?: number;
}
