import { Sequelize } from "sequelize-typescript";
import { MigrationConfig } from "./interfaces";
import { QueryTypes, Transaction } from "sequelize";
import { MigrationInit } from "./gen.init";

export namespace Migrations {
  export async function initMigrations(
    db: Sequelize,
    opts: MigrationConfig = { rollback: false, rollbackCount: 1 }
  ) {
    try {
      await db.query(`
        CREATE TABLE IF NOT EXISTS migration (
          migration VARCHAR(100) NOT NULL UNIQUE,
          data_hora TEXT NULL
        );
      `);
    } catch (err) {
      console.log(err);
    }

    const migrations = MigrationInit();

    const migrationInserts = (await db.query(
      `SELECT migration FROM migration ORDER BY migration`,
      { type: QueryTypes.SELECT }
    )) as { migration: string }[];

    if (opts.rollback) {
      console.warn("--rollback is enabled");
    }

    let keysVersions = Object.keys(migrations);

    let versionsApply = 0;
    let dbVersion = migrationInserts.length
      ? migrationInserts[migrationInserts.length - 1].migration
      : "0";

    if (opts.rollback && dbVersion !== "0") {
      const findMigrationInstruction = keysVersions.find(
        (el) => el === dbVersion
      );

      if (!findMigrationInstruction) {
        throw new Error(
          `Fail apply rollback, migration ${dbVersion} not found!`
        );
      }

      let t: Transaction = await db.transaction();
      try {
        const migApply = migrations[findMigrationInstruction];
        console.info(
          `🧐 APPLYING ${
            !opts.rollback ? "⬆UP VERSION" : "⬇DOWN VERSION"
          } Migration ${dbVersion} ${migApply.description}`
        );
        if (!opts.rollback) {
          await migApply.up(db, t);
        } else {
          await migApply.down(db, t);
        }
        await db.query(`DELETE FROM migration WHERE migration = ?`, {
          type: QueryTypes.DELETE,
          replacements: [findMigrationInstruction],
          transaction: t,
        });

        await t.commit();
      } catch (error) {
        console.error(error);
        await t.rollback();
      }
    } else {
      for (const v of !opts.rollback ? keysVersions : keysVersions.reverse()) {
        if (
          !opts.rollback &&
          migrationInserts.map((el) => el.migration).indexOf(v) === -1
        ) {
          let t: Transaction = await db.transaction();
          try {
            const migApply = migrations[v];
            console.info(
              `🧐 APPLYING ${
                !opts.rollback ? "⬆UP VERSION" : "⬇DOWN VERSION"
              } Migration ${v} ${migApply.description}`
            );
            if (!opts.rollback) {
              await migApply.up(db, t);
            } else {
              await migApply.down(db, t);
            }

            versionsApply++;

            console.log(v);

            await db.query(
              `INSERT INTO migration (migration, data_hora) VALUES (?,?);`,
              {
                type: QueryTypes.INSERT,
                replacements: [v, new Date()],
                transaction: t,
              }
            );

            await t.commit();

            console.info(
              `👍  SUCCESS APPLY Migratrion ${v} ${migApply.description}`
            );
          } catch (error) {
            console.error(error);
            await t.rollback();
          }
        }
      }
    }

    if (versionsApply) {
      console.log(
        `🚀 ${versionsApply} updates apply, your last migration is ${dbVersion}`
      );
    } else {
      console.info(`👏 DB Version is updated last Migration ${dbVersion}!`);
    }
  }
}
