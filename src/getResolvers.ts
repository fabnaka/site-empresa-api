import { NonEmptyArray } from "type-graphql";
import UsuarioResolver from "./resolvers/usuario/UsuarioResolver";
import GrupoParticipanteResolver from "./resolvers/grupo-participante/GrupoParticipanteResolver";

export const getResolvers = ():
  | NonEmptyArray<Function>
  | NonEmptyArray<string> => {
  return [
    UsuarioResolver,
    GrupoParticipanteResolver
  ];
};
