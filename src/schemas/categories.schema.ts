import { Document, model, Schema } from "mongoose";

import { SoftDeletable } from "./common";

interface ICategory {
  title: string;
  googleCategories: string[];
  appStoreCategories: string[];
}
// tslint:disable-next-line
const CategorySchemaFields: Record<keyof ICategory, any> = {
  title: { type: String, required: true },
  googleCategories: { type: [String], required: true },
  appStoreCategories: { type: [String], require: true },
  ...SoftDeletable,
};

const CategorySchema = new Schema(CategorySchemaFields, { timestamps: true });

interface ICategoryDocument extends ICategory, Document {}
export const Category = model<ICategoryDocument>("Category", CategorySchema);
