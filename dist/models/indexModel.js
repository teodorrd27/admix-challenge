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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const admix_error_1 = __importDefault(require("@admixltd/admix-error"));
const serverless_typeorm_1 = require("serverless-typeorm");
const entities_1 = require("./../entities/entities");
/**
 * class IndexModel. Example Class
 */
class IndexModel {
    constructor(db) {
        if (!db) {
            throw new admix_error_1.default("DB not connected", 500, 100);
        }
        this.db = db;
        this.manager = serverless_typeorm_1.getMongoManager();
    }
    /**
     * Find User by ID
     *
     * @param {string} userId
     * User Id
     *
     * @return {Promise}
     * Resolves with User or false if no user;
     *
     */
    // tslint:disable-next-line
    findUserByID(_id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const repo = yield this.db.getRepository(entities_1.Users);
                return yield repo.findOne({ _id });
            }
            catch (error) {
                return Promise.reject(error);
            }
        });
    }
    /**
     * returns 200 object
     */
    example() {
        return [
            {
                success: 200,
            },
        ];
    }
}
exports.default = IndexModel;
//# sourceMappingURL=indexModel.js.map