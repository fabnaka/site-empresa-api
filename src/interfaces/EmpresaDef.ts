import { Field, InputType, Int, ObjectType } from "type-graphql";
import Empresa from "../models/Empresa";
import {
  IPrimeDataTableRequest,
  PrimeDataTableRequest,
  PrimeDataTableResponse,
  PrimeFilterItemInt,
  PrimeFilterItemString,
  PrimeFilterItemStringArray,
} from "../utils/primeng/DataTableDef";

@InputType("EmpresaFilterInput")
export class EmpresaFilterInput {
  @Field((type) => PrimeFilterItemInt, { nullable: true })
  id?: PrimeFilterItemInt;

  @Field((type) => PrimeFilterItemString, { nullable: true })
  descricao?: PrimeFilterItemString;
}

@InputType("EmpresaListInput")
export class EmpresaListInput
  extends PrimeDataTableRequest(EmpresaFilterInput)
  implements IPrimeDataTableRequest<EmpresaFilterInput> {}

@ObjectType("EmpresaDataTable")
export class EmpresaDataTable extends PrimeDataTableResponse(Empresa) {}

@InputType("EmpresaInput")
export class EmpresaInput {
  @Field((Type) => Int, { nullable: true })
  id?: number;

  @Field((type) => String, { nullable: true })
  nome?: string;

  @Field((type) => String, { nullable: true })
  cnpj?: string;

  @Field((type) => String, { nullable: true })
  endereco?: string;

  @Field((type) => String, { nullable: true })
  telefone?: string;

  @Field((type) => String, { nullable: true })
  email?: string;

  @Field((type) => String, { nullable: true })
  ativo?: string;
}