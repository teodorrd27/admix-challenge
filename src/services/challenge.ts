import ErrorCustom from "@admixltd/admix-error";
import { Connection, getMongoManager } from "serverless-typeorm";
import {
  Users,
} from "../entities/entities";
/**
 * class Challenge.
 */
class Challenge {
  /**
   * Class property set to an instance
   *
   */
  private db: Connection;
  private manager: any;
  constructor(db: Connection) {
    if (!db) {
      throw new ErrorCustom("DB not connected", 500, 100);
    }
    this.db = db;
    this.manager = getMongoManager();
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
  public async findUserByID(_id: string) {
    try {
      const repo = await this.db.getRepository(Users);
      return await repo.findOne({ _id });
    } catch (error) {
      return Promise.reject(error);
    }
  }
}

export default Challenge;
