import Middy from "@middy/core";
import { APIGatewayProxyEvent, Context } from "aws-lambda";
import { Types } from "mongoose";
import {
  ConstructResourceResponseMiddleware,
  Response,
  ServiceCacheMiddleware,
  StatusCodeMiddleware,
  StringifyMiddleware,
  WaitForEmptyLoopFalseMiddleware,
} from "../middleware";
import { ICampaign, ICreative, IUsers } from "../schemas";
import Challenge from "../services/challenge";
import { ResponseStructure } from "../types/response.type";

type HttpEventWithParams = APIGatewayProxyEvent & {
  pathParameters: {
    id?: string;
    userId?: string;
  };
};

export interface IServiceCache {
  ChallengeService: Challenge;
}
const Cache: IServiceCache = {
  ChallengeService: null,
};

const CommonPreMiddlewares = [
  WaitForEmptyLoopFalseMiddleware(),
  ServiceCacheMiddleware(Cache),
];
const CommonPostMiddlewares = [
  StringifyMiddleware(),
  StatusCodeMiddleware(),
  ConstructResourceResponseMiddleware(),
]; // posts run in reverse order!

const getUserById = Middy(
  async (event: HttpEventWithParams): Promise<Response> => {
    return {
      mongoRes: await Cache.ChallengeService.findUserByID(
        Types.ObjectId(event.pathParameters.id),
      ),
      resourceKey: "user",
      responseStructure: ResponseStructure.FETCH,
      statusCodeSuccess: 200,
    };
  },
).use([...CommonPreMiddlewares, ...CommonPostMiddlewares]);

const createUser = Middy(
  async (event: APIGatewayProxyEvent): Promise<Response> => {
    const newUser: IUsers = JSON.parse(event.body);

    const opRes = await Cache.ChallengeService.createUser(newUser);
    return {
      mongoRes: opRes,
      responseStructure: ResponseStructure.CREATE,
      statusCodeSuccess: 201,
    };
  },
).use([...CommonPreMiddlewares, ...CommonPostMiddlewares]);

const updateUser = Middy(
  async (event: HttpEventWithParams): Promise<Response> => {
    const newUser: Partial<IUsers> = JSON.parse(event.body);
    const opRes = await Cache.ChallengeService.updateUser(
      newUser,
      Types.ObjectId(event.pathParameters.id),
    );
    return {
      mongoRes: opRes,
      responseStructure: ResponseStructure.UPDATE,
      statusCodeSuccess: 200,
    };
  },
).use([...CommonPreMiddlewares, ...CommonPostMiddlewares]);

const createCampaign = Middy(
  async (event: APIGatewayProxyEvent): Promise<Response> => {
    const newCampaign: ICampaign = JSON.parse(event.body);

    const opRes = await Cache.ChallengeService.createCampaign(newCampaign);
    return {
      mongoRes: opRes,
      responseStructure: ResponseStructure.CREATE,
      statusCodeSuccess: 201,
    };
  },
).use([...CommonPreMiddlewares, ...CommonPostMiddlewares]);

const updateCampaign = Middy(
  async (event: HttpEventWithParams): Promise<Response> => {
    const newUser: Partial<ICampaign> = JSON.parse(event.body);
    const opRes = await Cache.ChallengeService.updateCampaign(
      newUser,
      Types.ObjectId(event.pathParameters.id),
    );
    return {
      mongoRes: opRes,
      responseStructure: ResponseStructure.UPDATE,
      statusCodeSuccess: 200,
    };
  },
).use([...CommonPreMiddlewares, ...CommonPostMiddlewares]);

const getCampaignById = Middy(
  async (event: HttpEventWithParams): Promise<Response> => {
    const opRes = await Cache.ChallengeService.findCampaignByID(
      Types.ObjectId(event.pathParameters.id),
    );
    return {
      mongoRes: opRes,
      resourceKey: "campaign",
      responseStructure: ResponseStructure.FETCH,
      statusCodeSuccess: 200,
    };
  },
).use([...CommonPreMiddlewares, ...CommonPostMiddlewares]);

const getUserCampaigns = Middy(
  async (event: HttpEventWithParams): Promise<Response> => {
    const opRes = await Cache.ChallengeService.findCampaignsByUserID(
      Types.ObjectId(event.pathParameters.userId),
    );
    return {
      mongoRes: opRes,
      resourceKey: "userCampaigns",
      responseStructure: ResponseStructure.FETCH,
      statusCodeSuccess: 200,
    };
  },
).use([...CommonPreMiddlewares, ...CommonPostMiddlewares]);

const assignCampaign = Middy(
  async (event: HttpEventWithParams): Promise<Response> => {
    const { campaignId } = JSON.parse(event.body);
    const opRes = await Cache.ChallengeService.assignCampaignToUser(
      campaignId,
      Types.ObjectId(event.pathParameters.id),
    );
    return {
      mongoRes: opRes,
      responseStructure: ResponseStructure.UPDATE,
      statusCodeSuccess: 200,
    };
  },
).use([...CommonPreMiddlewares, ...CommonPostMiddlewares]);

const assignCreatives = Middy(
  async (event: HttpEventWithParams): Promise<Response> => {
    const creative: ICreative = JSON.parse(event.body);
    const opRes = await Cache.ChallengeService.assignCreativeToCampaign(
      creative,
      Types.ObjectId(event.pathParameters.id),
    );
    return {
      mongoRes: opRes,
      responseStructure: ResponseStructure.UPDATE,
      statusCodeSuccess: 200,
    };
  },
).use([...CommonPreMiddlewares, ...CommonPostMiddlewares]);

type Demographic = "young" | "youngMid" | "mid" | "old" | "senior";
export interface IRankRequest {
  categories?: string[];
  store: "AppStore" | "GooglePlay";
  gender: "male" | "female";
  demographics: Demographic[];
  geos?: string[];
}
const queryAppAndRankByAudienceMatch = Middy(
  async (event: APIGatewayProxyEvent, context: Context): Promise<Response> => {
    const rawRequest: IRankRequest = JSON.parse(event.body);
    const opAggregation = await Cache.ChallengeService.findAppRankAudienceMatch(
      rawRequest,
    );
    return {
      aggregation: opAggregation,
      responseStructure: ResponseStructure.AGGREGATION,
      statusCodeSuccess: 200,
    };
  },
).use([...CommonPreMiddlewares, ...CommonPostMiddlewares]);

export {
  createCampaign,
  assignCampaign,
  assignCreatives,
  createUser,
  getUserById,
  getCampaignById,
  getUserCampaigns,
  updateUser,
  updateCampaign,
  queryAppAndRankByAudienceMatch,
};
