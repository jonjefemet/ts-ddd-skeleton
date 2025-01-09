import "reflect-metadata";
import { Column, CreateDateColumn } from "typeorm";

export default abstract class BaseEntity {

  @Column({
    type: "varchar",
    length: 45,
    name: "UsuarioCreacion"
  })
    createdBy: string;

  @CreateDateColumn({
    type: "datetime",
    nullable: false,
    name: "FechaCreacion"
  })
    createdAt: Date;

  @Column({
    type: "varchar",
    length: 45,
    name: "UsuarioUltimaModificacion"
  })
    updatedBy: string;

  @CreateDateColumn({
    type: "datetime",
    nullable: false,
    name: "FechaUltimaModificacion"
  })
    updatedAt: Date;

  @Column({
    type: "tinyint",
    precision: 4,
    name: "Estado"
  })
    status: number;

}