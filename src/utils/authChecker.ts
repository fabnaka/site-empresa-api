import { AuthenticationError } from "apollo-server-errors";
import { AuthChecker } from "type-graphql";
import { ContextInterface } from "../types";

export const authChecker: AuthChecker<ContextInterface> = ({ root, args, context, info }, roles) => {

  if (!context.usuario?.id) {
    throw new AuthenticationError("Acesso não autenticado.");
  };

  return true;
}