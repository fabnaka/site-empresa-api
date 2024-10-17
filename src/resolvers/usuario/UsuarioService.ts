import { Transaction } from "sequelize/types";
import * as bcrypt from "bcrypt";
import { Service } from "typedi";
import { sequelize } from "../..";
import {
  UsuarioAlterarSenhaInput,
  UsuarioFilterInput,
  UsuarioInput,
  UsuarioLoginInput,
} from "../../interfaces/UsuarioDef";
import Usuario from "../../models/Usuario";
import { ContextInterface, SessionToken } from "../../types";
import CrudUtils from "../../utils/primeng/CrudUtils";
import { IPrimeDataTableRequest } from "../../utils/primeng/DataTableDef";
import TokenUtils from "../../utils/token/TokenUtils";

@Service()
export class UsuarioService {
  async filtrar(
    input: IPrimeDataTableRequest<UsuarioFilterInput>,
    usuario: SessionToken | undefined
  ) {
    return await Usuario.findAndCountAll<Usuario>({
      limit: input.rows,
      offset: input.first,
      order: CrudUtils.getOrder(input),
      where: CrudUtils.processFilters(input.filters, {}),
    });
  }

  async porId(id: number) {
    return await Usuario.findByPk(id);
  }

  async criarAlterar(data: UsuarioInput) {
    let t: Transaction = await sequelize.transaction();
    try {
      let usuario = await Usuario.findByPk<Usuario>(data.id);

      if (usuario) {
        usuario.setAttributes({ ...data });
      } else {
        if (data.senha) {
          const senha = await bcrypt.hash(data.senha, 10);

          usuario = Usuario.build({ ...data, senha });
        }
      }

      usuario ? await usuario.save({ transaction: t }) : "";

      await t.commit();
      return usuario;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async listar() {
    return await Usuario.findAll();
  }

  async login(data: UsuarioLoginInput, ctx: ContextInterface) {
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

        if(usuario.ativo === 'N'){
          throw new Error("Este usuário foi desativado. Não é possível acessar.")
        }

        const token = await TokenUtils.encode({ id: usuario.id });

        usuario.token = token;

        return usuario;
      } else {
        throw new Error("Usuário ou senha incorretos.");
      }
    }
  }

  async alterarSenha(
    data: UsuarioAlterarSenhaInput,
    usuarioSessao: SessionToken | undefined
  ) {
    let t: Transaction = await sequelize.transaction();
    try {
      const senha = await bcrypt.hash(data.senha, 10);
      let usuario = await Usuario.findByPk(data.id);

      if (usuario) {
        usuario.setAttributes({ senha });
        await usuario.save({ transaction: t });
      }

      await t.commit();
      return usuario;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }
}
