/* eslint-env node, mocha */

import chai from "chai"; // eslint-disable-line
import "mocha";
import * as sinon from 'sinon';
import { promisify } from "util";
import chaiAsPromised from 'chai-as-promised';
import sinonStubPromise from 'sinon-stub-promise';
import { createConnection } from "mongoose";
import {
  getUserById,
} from "../../src/handlers/handler";
import Challenge from "../../src/services/challenge";

const { expect } = chai;
const dummyActiveUser =  {   
  "_id": "5f7c26c4a7d5771adb959406", 
  "name": "Joe Smith",
  "email": "jsmith@gmail.com",
  "campaignId": "5f7c26d2f340427c28e91c70"
};

sinonStubPromise(sinon);
chai.use(chaiAsPromised);
let createConnectionStub;
let modelStub;

describe("Handler", () => {
  afterEach(() => {
    if (modelStub && modelStub.restore) {
      modelStub.restore();
    }
    if (createConnectionStub && createConnectionStub.restore) {
      createConnectionStub.restore();
    }
  })
  
  describe("getUserById()", () => {
    it("Successfully returns users", async () => {
        createConnectionStub = createConnection = sinon.stub().resolves({isConnected: true, close: sinon.stub()});
        const dummyEvent = {
          pathParameters: {
            id: "5f7c26c4a7d5771adb959406"
          },
        };
        modelStub = sinon.stub(Challenge.prototype, "findUserByID").resolves(dummyActiveUser);
        const func = promisify(getUserById);
        const results = await func(dummyEvent, {});
        const body = JSON.parse(results.body);
        expect(body.user._id).to.equal("5f7c26c4a7d5771adb959406");
    });
  })
});
