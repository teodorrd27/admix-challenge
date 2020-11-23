import { Document } from "mongoose";
import { IUsersDocument } from "../schemas";

export enum ResponseStructure {
  CREATE,
  UPDATE,
  FETCH,
  AGGREGATION,
}

export interface BaseResponseBody {
  message: "Error" | "Success";
}

export interface GetResponseBody extends BaseResponseBody {
  [key: string]: Document | Error | string;
}

export interface MutationResponseBody extends BaseResponseBody {
  detail: Document | Error;
}

export interface AggregationBody extends BaseResponseBody {
  aggregation: Array<IUsersDocument & "score"> | Error;
}
