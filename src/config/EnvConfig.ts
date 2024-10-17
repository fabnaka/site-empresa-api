import { SequelizeOptions } from "sequelize-typescript";

//ARQUIVO DE TYPE DO CONFIG.TS
export interface EnvConfig {
    sequelizeOptions: SequelizeOptions,
    logging: Logging
}

interface Logging {
    logsrc: string,
    type: string[],
    warn: boolean,
    info: boolean,
    dbug: boolean,
    error: boolean,
    assert: boolean
}