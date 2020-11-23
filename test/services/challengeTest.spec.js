/* eslint-env node, mocha */

import chai from "chai"; // eslint-disable-line
import chaiAsPromised from "chai-as-promised";
import "mocha";
import * as sinon from "sinon";
// tslint:disable-next-line
import sinonStubPromise from "sinon-stub-promise";
import Challenge from "../../src/services/challenge";

import { Connection, createConnection, Types } from "mongoose";

let sandbox;
let queryStub;
const { expect } = chai;
sinonStubPromise(sinon);
chai.use(chaiAsPromised);

describe("Challenge", () => {
  describe("Challenge fn", () => {
    it("returns successObj", async (done) => {
      const connection = await createConnection(
        "mongodb://0.0.0.0:27019/challenge",
        {
          bufferCommands: false,
          bufferMaxEntries: 0,
          useNewUrlParser: true,
          useUnifiedTopology: true,
          useFindAndModify: false,
        },
      );
      let result = null;
      try {
        result = new Challenge(connection);
      } catch (error) {}
      const example = await result.findUserByID(
        Types.ObjectId("5f7c26c4a7d5771adb959406"),
      );
      // expect(example).to.equal("5f7c26c4a7d5771adb959406")

      done();
    });
  });
});
