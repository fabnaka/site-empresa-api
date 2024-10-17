import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
@ObjectType("GrupoParticipante")
@Table({
  modelName: "GrupoParticipante",
  tableName: "grupo_participante",
  updatedAt: false,
  createdAt: false,
})
export default class GrupoParticipante extends Model {
  @Field((Type) => Int)
  @PrimaryKey
  @AutoIncrement
  @Column({
    type: DataType.INTEGER,
  })
  id?: number;

  @Field((Type) => String, { nullable: true })
  @Column({
    type: DataType.STRING(255),
  })
  descricao?: string;

  @Field((Type) => String)
  @Column({
    type: DataType.STRING(255),
  })
  azure_group_id?: string;

  @Field((Type) => String, { nullable: true })
  @Column({
    type: DataType.CHAR(1),
  })
  ativo?: string;
}
