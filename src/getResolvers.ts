import { NonEmptyArray } from "type-graphql";
import UsuarioResolver from "./resolvers/usuario/UsuarioResolver";
import EmpresaResolver from "./resolvers/empresa/EmpresaResolver";

export const getResolvers = ():
  | NonEmptyArray<Function>
  | NonEmptyArray<string> => {
  return [
    UsuarioResolver,
    EmpresaResolver
  ];
};
