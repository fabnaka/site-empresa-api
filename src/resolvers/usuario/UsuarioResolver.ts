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
import { Service } from "typedi";
import {
  UsuarioDataTable,
  UsuarioInput,
  UsuarioListInput,
  UsuarioLoginInput,
} from "../../interfaces/UsuarioDef";
import Usuario from "../../models/Usuario";
import { ContextInterface } from "../../types";
import * as bcrypt from "bcrypt";

/* import { PERM } from "../../perm.enum"; */ //IMPLEMENTAR PERMISSÕES
/* import { buildPerm, CheckPerm } from "../../utils/checkPerm"; */

import { UsuarioService } from "./UsuarioService";
import TokenUtils from "../../utils/token/TokenUtils";
import CrudUtils from "../../utils/primeng/CrudUtils";

@Service()
@Resolver((of) => Usuario)
export default class UsuarioResolver {
  constructor(private usuarioService: UsuarioService) {}

  /* @Authorized() */
  /* @UseMiddleware(CheckPerm([PERM.Empresa.Visualizar])) */
  @Authorized()
  @Query(() => UsuarioDataTable, { nullable: true })
  async filtrarUsuario(
    @Arg("filter") filter: UsuarioListInput,
    @Ctx() ctx: ContextInterface
  ) {
    return await Usuario.findAndCountAll<Usuario>({
      limit: filter.rows,
      offset: filter.first,
      order: CrudUtils.getOrder(filter),
      where: CrudUtils.processFilters(filter.filters, {}),
    });
    //return await this.usuarioService.filtrar(filter, ctx.usuario);
  }

  /* @Authorized() */
  /* @UseMiddleware(CheckPerm([PERM.Empresa.Visualizar])) */
  @Authorized()
  @Query(() => Usuario, { nullable: true })
  async buscarUsuarioPorId(@Arg("id", (Type) => Int) id: number) {
    return await Usuario.findByPk(id);
    //return await this.usuarioService.porId(id);
  }

  /* @Authorized() */
  /* @UseMiddleware(CheckPerm([...buildPerm({
    isInsert: PERM.Empresa.Cadastrar,
    isUpdate: PERM.Empresa.Editar,
    isDelete: PERM.Empresa.Excluir
  })])) */
  //@Authorized()
  @Mutation(() => Usuario, { nullable: true })
  async criarAlterarUsuario(@Arg("data") data: UsuarioInput) {
    try {
      let usuario = await Usuario.findByPk<Usuario>(data.id);

      if (usuario) {
        usuario.setAttributes({ ...data });
      } else {
        usuario = await Usuario.findOne({ where: { usuario: data.usuario } });

        if (usuario) {
          throw new Error("Nome de usuário já cadastrado!");
        }

        if (data.senha) {
          const senha = await bcrypt.hash(data.senha, 10);

          usuario = Usuario.build({ ...data, senha });
        }
      }

      usuario ? await usuario.save() : "";

      return usuario;
    } catch (error) {
      throw error;
    }
  }

  @Authorized()
  @Query(() => [Usuario], { nullable: true })
  async listarUsuario( @Ctx() ctx: ContextInterface ) {
    return await Usuario.findAll();
  }

  //@Authorized()
  @Query(() => Usuario, { nullable: true })
  async usuarioLogado ( @Ctx() ctx: ContextInterface ) {
    return await Usuario.findByPk(ctx.usuario?.id);    
  }

  @Query(() => Usuario, { nullable: true })
  async login(
    @Arg("data") data: UsuarioLoginInput,
    @Ctx() ctx: ContextInterface
  ) {
    let usuario = await Usuario.findOne<Usuario>({
      where: {
        usuario: data.usuario,
      },
    });

    if (!usuario) {
      throw new Error("Usuário ou senha incorretos.");
    }

    if (data.senha && usuario.senha) {
      let isValid = await bcrypt.compare(data.senha, usuario.senha);

      if (isValid) {
        const token = await TokenUtils.encode({ id: usuario.id });

        usuario.token = token;

        return usuario;
      } else {
        throw new Error("Usuário ou senha incorretos.");
      }
    }
    //return await this.userService.login(data, ctx);
  }
}
