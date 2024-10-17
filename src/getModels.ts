import { ModelCtor } from "sequelize-typescript";
import Usuario from "./models/Usuario";
import GrupoParticipante from "./models/GrupoParticipante";

export const getModels = (): ModelCtor[] => {
  return [Usuario, GrupoParticipante];
};
