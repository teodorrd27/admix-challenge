import { Connection, Document, Schema, SchemaOptions } from "mongoose";

import { SoftDeletable } from "./common";

export interface IStores {
  type: string; // [AppStore, GooglePlay, SteamStore]
  storeUrl: string;
}

export interface IDemographics {
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

export interface IApps {
  appStores: IStores[];
  demographics: IDemographics;
  geos?: string[];
  appStoreInfo?: IAppStore;
  googlePlayStoreInfo?: IPlayStore;
}

const StoresSchema = new Schema({
  storeUrl: { type: String, required: true },
  type: { type: String, required: true },
});

const DemographicsSchema = new Schema({
  byAges: {
    mid: { type: Number, required: true },
    old: { type: Number, required: true },
    senior: { type: Number, required: true },
    young: { type: Number, required: true },
    youngMid: { type: Number, required: true },
  },
  male: { type: Number, required: true },
});

const AppStoreSchema = new Schema({
  free: { type: Boolean, required: true },
  genres: { type: [String], required: true },
  price: { type: Number, required: true },
  score: { type: Number, required: true },
  title: { type: String, required: true },
});

const PlayStoreSchema = new Schema({
  free: { type: Boolean, required: true },
  genreId: { type: String, required: true },
  genres: { type: String, required: true },
  price: { type: Number, required: true },
  score: { type: Number, required: true },
  title: { type: String, required: true },
});

// tslint:disable-next-line
const AppSchemaFields: Record<keyof IApps, any> = {
  appStores: [StoresSchema],
  demographics: { type: DemographicsSchema, required: true },
  geos: [String],
  appStoreInfo: AppStoreSchema,
  googlePlayStoreInfo: PlayStoreSchema,
  ...SoftDeletable,
};
const AppSchema = new Schema(AppSchemaFields, { timestamps: true });

interface IAppsDocument extends IApps, Document {}
export const Apps = (connection: Connection) =>
  connection.model<IAppsDocument>("Apps", AppSchema);
