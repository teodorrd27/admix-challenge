import { Connection, createConnection } from "serverless-typeorm";
import Challenge from "../services/challenge";

const getUserById = async (event: any, context: any) => {};

const createUser = async (event: any, context: any) => {};

const updateUser = async (event: any, context: any) => {};

const createCampaign = async (event: any, context: any) => {};

const updateCampaign = async (event: any, context: any) => {};

const getCampaignById = async (event: any, context: any) => {};

const getUserCampaigns = async (event: any, context: any) => {};

  /**
   * Query App and Rank By Audience Match
   *
   * event.body Params
   * @param {string} category string[] || undefined
   * event.body.category
   *
   * @required
   * @param {string} store [GooglePlay | AppStore]  || undefined
   * event.body.store
   *
   * @required
   * @param {string} gender [male | female]  || undefined
   * event.body.gender
   *
   * @required
   * @param {string} demographics ["young", "youngMid", "mid", "old", "senior"]
   * event.body.ageRange
   *
   * @param {string} geos string[]  || undefined
   * event.body.geos
   */
const queryAppAndRankByAudienceMatch = async (event: any, context: any) => {};

export {
  createCampaign,
  createUser,
  getUserById,
  getCampaignById,
  getUserCampaigns,
  updateUser,
  updateCampaign,
  queryAppAndRankByAudienceMatch,
};
