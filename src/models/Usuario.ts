import {
  AutoIncrement,
  Column,
  DataType,
  ForeignKey,
  Model,
  PrimaryKey,
  Table,
  BelongsTo,
} from "sequelize-typescript";
import { Field, Int, ObjectType } from "type-graphql";
@ObjectType("Usuario")
@Table({
  modelName: "Usuario",
  tableName: "usuario",
  updatedAt: false,
  createdAt: false,
})
export default class Usuario extends Model {
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
  usuario?: string;

  @Field((Type) => String, { nullable: true })
  @Column({
    type: DataType.STRING(255),
  })
  nome?: string;

  @Field((Type) => String, { nullable: true })
  @Column({
    type: DataType.TEXT,
  })
  senha?: string;

  @Field((Type) => String, { nullable: true })
  token?: string;

  @Field((Type) => String, { nullable: true })
  @Column({
    type: DataType.CHAR(1),
  })
  ativo?: string;
}
