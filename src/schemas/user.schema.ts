import { Connection, Document, Schema, Types } from "mongoose";

import { SoftDeletable } from "./common";

export interface IUsers {
  campaigns?: Types.ObjectId[];
  name: string;
  email: string;
}

// tslint:disable-next-line
const UsersSchemaFields: Record<keyof IUsers, any> = {
  campaigns: [{ type: Types.ObjectId, ref: "Campaign" }],
  name: { type: String, required: true },
  email: { type: String, required: true },
  ...SoftDeletable,
};

const UsersSchema = new Schema(UsersSchemaFields, { timestamps: true });

export interface IUsersDocument extends IUsers, Document {}
export const Users = (connection: Connection) =>
  connection.model<IUsersDocument>("Users", UsersSchema);
