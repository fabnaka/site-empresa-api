import { Op, Transaction } from "sequelize";
import  {nanoid} from "nanoid"
import Container, { Service } from "typedi";
import { sequelize } from "../..";
// import {
//   ParticipanteFilterInput,
//   ParticipanteInput,
// } from "../../interfaces/ParticipanteDef";
//import Participante from "../../models/Participante";
import { SessionToken } from "../../types";
import CrudUtils from "../../utils/primeng/CrudUtils";
import { IPrimeDataTableRequest } from "../../utils/primeng/DataTableDef";
//import ReuniaoParticipante from "../../models/ReuniaoParticipante";
//import { ComparadorDigitalConnection } from "./../../rest/comparacaoDigitalConnection";
//import { Base64 } from "js-base64";
import { format } from "date-fns";
//import ParticipanteFotoComparacao from "../../models/ParticipanteFotoComparacao";
import { GrupoParticipanteFilterInput, GrupoParticipanteInput } from "../../interfaces/GrupoParticipanteDef";
import GrupoParticipante from "../../models/GrupoParticipante";
import { AzureServicesGroupConnection } from '../../rest/azure-services/azure-services-group'

@Service()
export class GrupoParticipanteService {
  constructor() {}

  async filtrar(
    input: IPrimeDataTableRequest<GrupoParticipanteFilterInput>,
    usuario: SessionToken | undefined
  ) {
    return await GrupoParticipante.findAndCountAll<GrupoParticipante>({
      limit: input.rows,
      offset: input.first,
      order: CrudUtils.getOrder(input),
      where: CrudUtils.processFilters(input.filters, {}),
    });
  }

  async porId(id: number) {
    return await GrupoParticipante.findByPk(id);
  }

  async criarAlterar(data: GrupoParticipanteInput) {
    let t: Transaction = await sequelize.transaction();
    try {
      let grupo_participante = await GrupoParticipante.findByPk<GrupoParticipante>(data.id);

      if(grupo_participante && data.ativo) {
        await this.criarGrupoAzure(data, grupo_participante?.azure_group_id);                 
        await grupo_participante.destroy({transaction: t})

        await t.commit();
        return grupo_participante
      }

      if (grupo_participante) {
        grupo_participante.setAttributes({ ...data });
      } else {
        grupo_participante = GrupoParticipante.build({
          ...data,
        });
      }

      if( !grupo_participante.azure_group_id ) {
        grupo_participante.azure_group_id = nanoid().toLowerCase()                
      }
       
      let azure_group = await this.criarGrupoAzure(data, grupo_participante.azure_group_id)

      //grupo_participante.setAttributes({azure_group_id: azure_group.id})

      await grupo_participante.save({ transaction: t });

      await t.commit();

      return grupo_participante;
    } catch (error) {
      await t.rollback();
      throw error;
    }
  }

  async listar() {
    return await GrupoParticipante.findAll();
  }

  async criarGrupoAzure (data:any, azure_id:string|undefined) {
    data.personGroupId = azure_id
    let res = await AzureServicesGroupConnection.criarAlterarPersonGroup(data)
    return res
  }


}
