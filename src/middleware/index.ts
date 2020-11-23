import { APIGatewayProxyEvent, APIGatewayProxyResult } from "aws-lambda";
import { HandlerLambda, MiddlewareObject } from "middy";
import { Connection, createConnection, Document } from "mongoose";
import { IServiceCache } from "../handlers/handler";
import { IUsersDocument } from "../schemas/user.schema";
import Challenge from "../services/challenge";
import {
  AggregationBody,
  BaseResponseBody,
  GetResponseBody,
  MutationResponseBody,
  ResponseStructure as RS,
} from "../types/response.type";

export interface Response extends Partial<APIGatewayProxyResult> {
  mongoRes?: Document | Error;
  resourceKey?: string;
  bodyObject?: object;
  aggregation?: Array<IUsersDocument & "score"> | Error;
  responseStructure: RS;
  statusCodeSuccess: number;
}

// tslint:disable-next-line
export const StatusCodeMiddleware = (): MiddlewareObject<any, any> => {
  return {
    // tslint:disable-next-line
    after: async (handler: HandlerLambda<any, Response>): Promise<void> => {
      const { mongoRes, aggregation, statusCodeSuccess } = handler.response;
      mongoRes &&
        (handler.response.statusCode =
          mongoRes instanceof Error ? 400 : statusCodeSuccess);
      aggregation &&
        (handler.response.statusCode =
          mongoRes instanceof Error ? 400 : statusCodeSuccess);
    },
  };
};

// tslint:disable-next-line
export const StringifyMiddleware = (): MiddlewareObject<any, any> => {
  return {
    after: async (handler: HandlerLambda<any, Response>): Promise<void> => {
      handler.response.body = JSON.stringify(handler.response.bodyObject);
      return;
    },
  };
};

// tslint:disable-next-line
export const ConstructResourceResponseMiddleware = (): MiddlewareObject<
  any,
  any
> => {
  return {
    after: async (
      handler: HandlerLambda<APIGatewayProxyEvent, Response>,
    ): Promise<void> => {
      const {
        mongoRes,
        aggregation,
        resourceKey,
        responseStructure,
      } = handler.response;
      const bodyObject: BaseResponseBody = {
        message: mongoRes instanceof Error ? "Error" : "Success",
      };
      switch (responseStructure) {
        case RS.FETCH:
          (bodyObject as GetResponseBody)[resourceKey] = mongoRes;
          break;
        case RS.AGGREGATION:
          (bodyObject as AggregationBody).aggregation = aggregation;
          break;
        default:
          (bodyObject as MutationResponseBody).detail = mongoRes;
          break;
      }
      handler.response.bodyObject = bodyObject;
      return;
    },
  };
};

// tslint:disable-next-line
export const WaitForEmptyLoopFalseMiddleware = (): MiddlewareObject<
  any,
  any
> => {
  return {
    before: async (handler: HandlerLambda): Promise<void> => {
      handler.context.callbackWaitsForEmptyEventLoop = false;
      return;
    },
  };
};

// tslint:disable-next-line
export const ServiceCacheMiddleware = (
  serviceCache: IServiceCache,
): MiddlewareObject<any, any> => {
  return {
    before: async (): Promise<void> => {
      if (serviceCache.ChallengeService) {
        return;
      }
      const connection: Connection = await createConnection(
        process.env.MONGO_URI,
        {
          bufferCommands: false,
          bufferMaxEntries: 0,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        },
      );
      serviceCache.ChallengeService = new Challenge(connection);
      return;
    },
  };
};
