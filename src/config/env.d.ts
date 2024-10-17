//ARQUIVO DE TYPE DO .ENV
declare namespace NodeJS {
    export interface ProcessEnv {
      DB_NAME: string;
      DB_HOST: string;
      DB_USER: string;
      DB_PASS: string;
      DB_PORT: string;
      PORT: string;
    }
}