import { Connection, Document, Schema } from "mongoose";

import { SoftDeletable } from "./common";

export interface ICreative {
  name: string;
  type: "banner" | "video" | "interactive";
  categories: string[];
}

export interface ICampaign {
  name: string;
  type: "awareness" | "traffic" | "sales";
  creatives: ICreative[];
}

const CreativeSchema = new Schema({
  name: { type: String, required: true },
  type: { type: String, required: true },
  categories: { type: [String], required: true },
});

// tslint:disable-next-line
const CampaignSchemaFields: Record<keyof ICampaign, any> = {
  name: { type: String, required: true },
  type: { type: String, required: true },
  creatives: { type: [CreativeSchema], required: true },
  ...SoftDeletable,
};

const CampaignSchema = new Schema(CampaignSchemaFields, { timestamps: true });

export interface ICampaignDocument extends ICampaign, Document {}
export const Campaigns = (connection: Connection) =>
  connection.model<ICampaignDocument>("Campaign", CampaignSchema);
