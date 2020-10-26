import { Expose } from "class-transformer";
import "reflect-metadata";
import { Column, Entity } from "serverless-typeorm";
import { AbstractEntity } from "./abstract.entity";

interface ICreative {
  name: string;
  type: "banner" | "video" | "interactive";
  categories: string[];
}

@Entity("campaigns")
export class Campaigns extends AbstractEntity {
  @Expose()
  @Column()
  public name: string;

  @Column()
  public type: "awareness" | "traffic" | "sales";

  @Column()
  public creatives: ICreative[];

  constructor(props: any) {
    super();
    this.creatives = props && props.creatives ? props.creatives : [];
  }
}
