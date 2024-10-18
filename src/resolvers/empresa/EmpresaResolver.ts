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
import { ContextInterface } from "../../types";
import { Transaction } from "sequelize/types";
import { sequelize } from "../..";

import CrudUtils from "../../utils/primeng/CrudUtils";
import Empresa from "../../models/Empresa";
import { EmpresaService } from "./EmpresaService";
import { EmpresaDataTable, EmpresaInput, EmpresaListInput } from "../../interfaces/EmpresaDef";

@Service()
@Resolver((of) => Empresa)
export default class EmpresaResolver {
  constructor(
    private EmpresaService: any = Container.get(EmpresaService)
  ) {}

  //@Authorized()
  /* @UseMiddleware(CheckPerm([PERM.Empresa.Visualizar])) */
  @Query(() => EmpresaDataTable, { nullable: true })
  async filtrarEmpresa(
    @Arg("filter") filter: EmpresaListInput,
    @Ctx() ctx: ContextInterface
  ) {
    return await this.EmpresaService.filtrar(filter, ctx.usuario);
  }

  //@Authorized()
  /* @UseMiddleware(CheckPerm([PERM.Empresa.Visualizar])) */
  @Query(() => Empresa, { nullable: true })
  async buscarEmpresaPorId(@Arg("id", (Type) => Int) id: number) {
    return await this.EmpresaService.porId(id);
  }


  @Authorized()
  /* @UseMiddleware(CheckPerm([...buildPerm({
    isInsert: PERM.Empresa.Cadastrar,
    isUpdate: PERM.Empresa.Editar,
    isDelete: PERM.Empresa.Excluir
  })])) */
  @Mutation(() => Empresa, { nullable: true })
  async criarAlterarEmpresa(@Arg("data") data: EmpresaInput) {
    return await this.EmpresaService.criarAlterar(data);
  }

  @Authorized()
  @Query(() => [Empresa], { nullable: true })
  async listarEmpresa(@Ctx() ctx: ContextInterface) {
    return await Empresa.findAll();
  }


}
