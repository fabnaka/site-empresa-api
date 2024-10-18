import { ModelCtor } from "sequelize-typescript";
import Usuario from "./models/Usuario";
import GrupoParticipante from "./models/Empresa";

export const getModels = (): ModelCtor[] => {
  return [Usuario, GrupoParticipante];
};
