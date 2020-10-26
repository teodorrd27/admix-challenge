import { Expose } from "class-transformer";
import "reflect-metadata";
import { Column, Entity } from "serverless-typeorm";
import { AbstractEntity } from "./abstract.entity";

interface IStores {
    type: string; // [AppStore, GooglePlay, SteamStore]
    storeUrl: string;
}

interface IDemographics {
    male: number; // Percentage of Male Audience (i.e. if 50+ audience predominantly male)
    byAges: {
        young: number; // 18 and below
        youngMid: number; // 19 to 24
        mid: number; // 25 to 34
        old: number; // 25 to 34
        senior: number; // 45 and above
    };
}
interface IAppStore {
    free: boolean;
    genres: string[];
    price: number;
    score: number;
    title: string;
}

interface IPlayStore {
    free: boolean;
    genres: string;
    genreId: string;
    price: number;
    score: number;
    title: string;
}

@Entity("apps")
export class Apps extends AbstractEntity {
  @Expose()
  @Column()
  public appStores?: IStores[];

  @Column()
  public demographics: IDemographics;

  @Column()
  public geos?: string[];

  @Column()
  public appStoreInfo?: IAppStore;
  @Column()
  public googlePlayStoreInfo?: IPlayStore;
}
