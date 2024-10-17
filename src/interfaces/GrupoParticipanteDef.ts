import { Field, InputType, Int, ObjectType } from "type-graphql";
//import Reuniao from "../models/Reuniao";
import GrupoParticipante from "../models/GrupoParticipante";
import {
  IPrimeDataTableRequest,
  PrimeDataTableRequest,
  PrimeDataTableResponse,
  PrimeFilterItemInt,
  PrimeFilterItemString,
  PrimeFilterItemStringArray,
} from "../utils/primeng/DataTableDef";

@InputType("GrupoParticipanteFilterInput")
export class GrupoParticipanteFilterInput {
  @Field((type) => PrimeFilterItemInt, { nullable: true })
  id?: PrimeFilterItemInt;

  @Field((type) => PrimeFilterItemString, { nullable: true })
  descricao?: PrimeFilterItemString;
}

@InputType("GrupoParticipanteListInput")
export class GrupoParticipanteListInput
  extends PrimeDataTableRequest(GrupoParticipanteFilterInput)
  implements IPrimeDataTableRequest<GrupoParticipanteFilterInput> {}

@ObjectType("GrupoParticipanteDataTable")
export class GrupoParticipanteDataTable extends PrimeDataTableResponse(GrupoParticipante) {}

@InputType("GrupoParticipanteInput")
export class GrupoParticipanteInput {
  @Field((Type) => Int, { nullable: true })
  id?: number;

  @Field((type) => String, { nullable: true })
  descricao?: string;

  @Field( (type) => Int, { nullable: true })
  azure_group_id: number;

  @Field((type) => String, { nullable: true })
  ativo?: string;
}