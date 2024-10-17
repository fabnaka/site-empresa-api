import {
  Arg,
  Authorized,
  Ctx,
  Int,
  Mutation,
  Query,
  Resolver,
  UseMiddleware,
} from "type-graphql";
import Container, { Service } from "typedi";
//   import {
//     ReuniaoDataTable,
//     ReuniaoInput,
//     ReuniaoListInput,
//   } from "../../interfaces/ReuniaoDef";
//   import Reuniao from "../../models/Reuniao";
import { ContextInterface } from "../../types";
import { Transaction } from "sequelize/types";
import { sequelize } from "../..";

/* import { PERM } from "../../perm.enum"; */ //IMPLEMENTAR PERMISSÕES
/* import { buildPerm, CheckPerm } from "../../utils/checkPerm"; */

//   import { ReuniaoService } from "./ReuniaoService";
//   import Participante from "../../models/Participante";
//   import ReuniaoParticipante from "../../models/ReuniaoParticipante";
import CrudUtils from "../../utils/primeng/CrudUtils";
import GrupoParticipante from "../../models/GrupoParticipante";
import { GrupoParticipanteService } from "./GrupoParticipanteService";
import { GrupoParticipanteDataTable, GrupoParticipanteInput, GrupoParticipanteListInput } from "../../interfaces/GrupoParticipanteDef";

@Service()
@Resolver((of) => GrupoParticipante)
export default class GrupoParticipanteResolver {
  constructor(
    private grupoParticipanteService: GrupoParticipanteService = Container.get(GrupoParticipanteService)
  ) {}

  //@Authorized()
  /* @UseMiddleware(CheckPerm([PERM.Empresa.Visualizar])) */
  @Query(() => GrupoParticipanteDataTable, { nullable: true })
  async filtrarGrupoParticipante(
    @Arg("filter") filter: GrupoParticipanteListInput,
    @Ctx() ctx: ContextInterface
  ) {
    return await this.grupoParticipanteService.filtrar(filter, ctx.usuario);
  }

  //@Authorized()
  /* @UseMiddleware(CheckPerm([PERM.Empresa.Visualizar])) */
  @Query(() => GrupoParticipante, { nullable: true })
  async buscarGrupoParticipantePorId(@Arg("id", (Type) => Int) id: number) {
    return await this.grupoParticipanteService.porId(id);
  }


  @Authorized()
  /* @UseMiddleware(CheckPerm([...buildPerm({
    isInsert: PERM.Empresa.Cadastrar,
    isUpdate: PERM.Empresa.Editar,
    isDelete: PERM.Empresa.Excluir
  })])) */
  @Mutation(() => GrupoParticipante, { nullable: true })
  async criarAlterarGrupoParticipante(@Arg("data") data: GrupoParticipanteInput) {
    return await this.grupoParticipanteService.criarAlterar(data);
  }

  @Authorized()
  @Query(() => [GrupoParticipante], { nullable: true })
  async listarGrupoParticipante(@Ctx() ctx: ContextInterface) {
    return await GrupoParticipante.findAll();
  }


}
