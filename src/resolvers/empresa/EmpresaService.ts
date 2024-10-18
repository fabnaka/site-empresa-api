import { Op, Transaction } from "sequelize";
import  {nanoid} from "nanoid"
import Container, { Service } from "typedi";
import { sequelize } from "../..";
import { SessionToken } from "../../types";
import CrudUtils from "../../utils/primeng/CrudUtils";
import { IPrimeDataTableRequest } from "../../utils/primeng/DataTableDef";
import { format } from "date-fns";
import { EmpresaFilterInput, EmpresaInput } from "../../interfaces/EmpresaDef";
import Empresa from "../../models/Empresa";

@Service()
export class EmpresaService {
  constructor() {}

  async filtrar(
    input: IPrimeDataTableRequest<EmpresaFilterInput>,
    usuario: SessionToken | undefined
  ) {
    return await Empresa.findAndCountAll<Empresa>({
      limit: input.rows,
      offset: input.first,
      order: CrudUtils.getOrder(input),
      where: CrudUtils.processFilters(input.filters, {}),
    });
  }

  async porId(id: number) {
    return await Empresa.findByPk(id);
  }

  async criarAlterar(data: EmpresaInput) {
    let t: Transaction = await sequelize.transaction();
    try {
      let empresa = await Empresa.findByPk<Empresa>(data.id);

      if(empresa && data.ativo) {
        await empresa.destroy({transaction: t})

        await t.commit();
        return empresa
      }

      if (empresa) {
        empresa.setAttributes({ ...data });
      } else {
        empresa = Empresa.build({
          ...data,
        });
      }       

      //empresa.setAttributes({azure_group_id: azure_group.id})

      await empresa.save({ transaction: t });

      await t.commit();

      return empresa;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async listar() {
    return await Empresa.findAll();
  }

}
