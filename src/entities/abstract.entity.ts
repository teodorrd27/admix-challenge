import { Expose, Transform } from "class-transformer";
import {
  Column,
  CreateDateColumn,
  ObjectIdColumn,
  UpdateDateColumn,
} from "serverless-typeorm";

export interface IAbstractModel extends Document {
  createdAt?: Date;
  updatedAt?: Date;
  id: string;
}

export abstract class AbstractEntity {
  @Expose()
  @ObjectIdColumn()
  public _id: string;

  @Expose({ groups: ["user", "admin", "ssp"] })
  @CreateDateColumn({ nullable: true })
  public createdAt?: Date;

  @Expose({ groups: ["user", "admin", "ssp"] })
  @UpdateDateColumn({ nullable: true })
  public updatedAt?: Date;

  @Expose({ groups: ["admin", "ssp"] })
  @Column()
  public isDeleted: boolean;

  @Expose({ groups: ["admin"] })
  @Column()
  // tslint:disable-next-line:variable-name
  public _v: string;
  constructor() {
    this.isDeleted = false;
    this._v = process.env.DOCUMENT_VERSION;
  }
}
