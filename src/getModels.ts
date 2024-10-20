import { ModelCtor } from "sequelize-typescript";
import Usuario from "./models/Usuario";
import Empresa from "./models/Empresa";

export const getModels = (): ModelCtor[] => {
  return [Usuario, Empresa];
};
