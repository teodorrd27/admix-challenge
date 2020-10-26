import { Expose } from "class-transformer";
import "reflect-metadata";
import { Column, Entity } from "serverless-typeorm";
import { AbstractEntity } from "./abstract.entity";

@Entity("categories")
export class Category extends AbstractEntity {
  @Expose()
  @Column()
  public title: string;

  @Column()
  public googleCategories: string[];

  @Column()
  public appStoreCategories: string[];

}
