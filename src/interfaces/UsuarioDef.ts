import { Field, InputType, Int, ObjectType } from "type-graphql";
import Usuario from "../models/Usuario";
import {
  IPrimeDataTableRequest,
  PrimeDataTableRequest,
  PrimeDataTableResponse,
  PrimeFilterItemInt,
  PrimeFilterItemString,
  PrimeFilterItemStringArray,
} from "../utils/primeng/DataTableDef";

@InputType("UsuarioFilterInput")
export class UsuarioFilterInput {
  @Field((type) => PrimeFilterItemInt, { nullable: true })
  id?: PrimeFilterItemInt;

  @Field((type) => PrimeFilterItemString, { nullable: true })
  usuario?: PrimeFilterItemString;

  @Field((type) => PrimeFilterItemString, { nullable: true })
  nome?: PrimeFilterItemString;

  @Field((type) => PrimeFilterItemString, { nullable: true })
  ativo?: PrimeFilterItemString;

}

@InputType("UsuarioListInput")
export class UsuarioListInput
  extends PrimeDataTableRequest(UsuarioFilterInput)
  implements IPrimeDataTableRequest<UsuarioFilterInput> {}

@ObjectType("UsuarioDataTable")
export class UsuarioDataTable extends PrimeDataTableResponse(Usuario) {}

@InputType("UsuarioLoginInput")
export class UsuarioLoginInput {
  @Field((Type) => String, { nullable: false })
  usuario?: string;

  @Field((Type) => String, { nullable: false })
  senha?: string;
}

@InputType("UsuarioAlterarSenhaInput")
export class UsuarioAlterarSenhaInput {
  @Field((Type) => Int, { nullable: false })
  id: number;

  @Field((Type) => String, { nullable: false })
  senha: string;
}

@InputType("UsuarioInput")
export class UsuarioInput {
  @Field((Type) => Int, { nullable: true })
  id?: number;

  @Field((type) => String, { nullable: true })
  usuario?: string;

  @Field((type) => String, { nullable: true })
  nome?: string;

  @Field((type) => String, { nullable: true })
  senha?: string;
  
  @Field((type) => String, { nullable: true })
  ativo?: string;
}
