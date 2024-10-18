import {
  AutoIncrement,
  Column,
  DataType,
  Model,
  PrimaryKey,
  Table,
} from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
@ObjectType("Empresa")
@Table({
  modelName: "Empresa",
  tableName: "empresa",
  updatedAt: false,
  createdAt: false,
})
export default class Empresa extends Model {
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
  nome?: string;

  @Field((Type) => String)
  @Column({
    type: DataType.STRING(14),
  })
  cnpj?: string;

  @Field((Type) => String, { nullable: true })
  @Column({
    type: DataType.STRING(255),
  })
  endereco?: string;

  @Field((Type) => String, { nullable: true })
  @Column({
    type: DataType.STRING(14),
  })
  telefone?: string;

  @Field((Type) => String, { nullable: true })
  @Column({
    type: DataType.STRING(14),
  })
  email?: string;

  @Field((Type) => String, { nullable: true })
  @Column({
    type: DataType.CHAR(1),
  })
  ativo?: string;
}
