"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.queryAppAndRankByAudienceMatch = exports.updateCampaign = exports.updateUser = exports.getUserCampaigns = exports.getCampaignById = exports.getUserById = exports.createUser = exports.createCampaign = void 0;
const getUserById = (event, context) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getUserById = getUserById;
const createUser = (event, context) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createUser = createUser;
const updateUser = (event, context) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateUser = updateUser;
const createCampaign = (event, context) => __awaiter(void 0, void 0, void 0, function* () { });
exports.createCampaign = createCampaign;
const updateCampaign = (event, context) => __awaiter(void 0, void 0, void 0, function* () { });
exports.updateCampaign = updateCampaign;
const getCampaignById = (event, context) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getCampaignById = getCampaignById;
const getUserCampaigns = (event, context) => __awaiter(void 0, void 0, void 0, function* () { });
exports.getUserCampaigns = getUserCampaigns;
/**
 * Query App and Rank By Audience Match
 *
 * event.body Params
 * @param {string} category string[]
 * event.body.category
 *
 * @param {string} store [GooglePlay | AppStore]
 * event.body.store
 *
 * @param {string} gender [male | female]
 * event.body.gender
 *
 * @param {string} ageRange ["young", "youngMid", "mid", "old", "senior"]
 * event.body.ageRange
 *
 * @param {string} geos string[]
 */
const queryAppAndRankByAudienceMatch = (event, context) => __awaiter(void 0, void 0, void 0, function* () { });
exports.queryAppAndRankByAudienceMatch = queryAppAndRankByAudienceMatch;
//# sourceMappingURL=handler.js.map