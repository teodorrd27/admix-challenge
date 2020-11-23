import ErrorCustom from "@admixltd/admix-error";
import { ObjectId } from "mongodb";
import { Connection } from "mongoose";
import util from "util";
import { IRankRequest } from "../handlers/handler";
import {
  Apps,
  Campaigns,
  ICampaign,
  ICampaignDocument,
  ICreative,
  IUsers,
  IUsersDocument,
  Users,
} from "../schemas";
/**
 * class Challenge.
 */
class Challenge {
  /**
   * Class property set to an instance
   *
   */
  private db: Connection;
  constructor(db: Connection) {
    if (!db) {
      throw new ErrorCustom("DB not connected", 500, 100);
    }
    this.db = db;
  }

  /**
   * Find User by ID
   *
   * @param {string} userId
   * User Id
   *
   * @return {Promise}
   * Resolves with User or false if no user
   *
   */
  // tslint:disable-next-line
  public async findUserByID(id: ObjectId): Promise<Error | IUsersDocument> {
    const users = Users(this.db);
    return await users
      .findOne({ _id: id })
      .lean()
      .catch((reason: Error) => reason);
  }

  public async findCampaignByID(
    id: ObjectId,
  ): Promise<Error | ICampaignDocument> {
    return await Campaigns(this.db)
      .findOne({ _id: id })
      .lean()
      .catch((reason: Error) => reason);
  }

  public async findCampaignsByUserID(
    userId: ObjectId,
  ): Promise<Error | ICampaignDocument> {
    Campaigns(this.db);
    const User = Users(this.db);
    return await User.findOne({ _id: userId })
      .lean()
      .populate("campaigns")
      .select({ _id: 0, campaigns: 1 })
      .catch((reason: Error) => reason);
  }

  public async assignCampaignToUser(
    campaign: ObjectId,
    whichUser: ObjectId,
  ): Promise<Error | IUsersDocument> {
    const User = await Users(this.db);
    return await User.findOneAndUpdate(
      { _id: whichUser },
      { $push: { campaigns: campaign } },
      { new: true },
    )
      .lean()
      .catch((reason: Error) => reason);
  }

  public async assignCreativeToCampaign(
    creative: ICreative,
    whichCampaign: ObjectId,
  ): Promise<Error | ICampaignDocument> {
    const Campaign = Campaigns(this.db);
    return await Campaign.findOneAndUpdate(
      { _id: whichCampaign },
      { $push: { creatives: creative } },
      { new: true },
    )
      .lean()
      .catch((reason: Error) => reason);
  }

  public async createUser(newUser: IUsers) {
    const User = Users(this.db);
    return await User.create(newUser).catch((reason: Error) => reason);
  }

  public async updateUser(
    newUser: Partial<IUsers>,
    which: ObjectId,
  ): Promise<Error | IUsersDocument> {
    const User = Users(this.db);
    return await User.findOneAndUpdate(
      { _id: which },
      { $set: newUser },
      { new: true },
    )
      .lean()
      .catch((reason: Error) => reason);
  }

  public async createCampaign(newCampaign: ICampaign) {
    const Campaign = Campaigns(this.db);
    return await Campaign.create(newCampaign).catch((reason: Error) => reason);
  }

  public async updateCampaign(
    newCampaign: Partial<ICampaign>,
    which: ObjectId,
  ): Promise<Error | ICampaignDocument> {
    const Campaign = Campaigns(this.db);
    return await Campaign.findOneAndUpdate(
      { _id: which },
      { $set: newCampaign },
      { new: true },
    )
      .lean()
      .catch((reason: Error) => reason);
  }

  public async findAppRankAudienceMatch(rawRequest: IRankRequest) {
    const narrower: Pick<
      IRankRequest,
      "store" | "geos" | "categories"
    > = rawRequest;
    interface NarrowingQuery {
      "appStores.type": string;
      geos?: {
        $in: string[];
      };
      "appStoreInfo.genres"?: {
        $in: string[];
      };
      "googlePlayStoreInfo.genre"?: string;
    }
    const query: NarrowingQuery = {
      "appStores.type": narrower.store,
    };
    narrower.geos && (query.geos = { $in: narrower.geos });

    narrower.categories &&
      narrower.categories.length > 0 &&
      (narrower.store === "AppStore"
        ? (query["appStoreInfo.genres"] = { $in: narrower.categories })
        : (query["googlePlayStoreInfo.genre"] = narrower.categories[0]));

    const gender =
      rawRequest.gender === "male"
        ? "$demographics.male"
        : { $subtract: [100, "$demographics.male"] };
    const multiply = {
      $multiply: [gender, "$$results"],
    };
    const addFieldAggregation = {
      $addFields: {
        score: {
          $sum: {
            $map: {
              input: {
                $map: {
                  input: {
                    $filter: {
                      input: {
                        $objectToArray: "$demographics.byAges",
                      },
                      as: "ages",
                      cond: {
                        $in: ["$$ages.k", rawRequest.demographics],
                      },
                    },
                  },
                  as: "relevant",
                  in: "$$relevant.v",
                },
              },
              as: "results",
              in: multiply,
            },
          },
        },
      },
    };

    const App = Apps(this.db);
    return await App.aggregate<IUsersDocument & "score">([
      { $match: query },
      addFieldAggregation,
      { $sort: { score: -1 } },
    ]).then(null, (reason: Error) => reason);
  }
}

export default Challenge;
