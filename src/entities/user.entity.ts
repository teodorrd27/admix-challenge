import { Expose } from "class-transformer";
import "reflect-metadata";
import { Column, Entity } from "serverless-typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity("users")
export class Users extends AbstractEntity {
  @Expose()
  @Column()
  public campaigns: string[];

  @Column()
  public name: string;

  @Column()
  public email: string;
}
