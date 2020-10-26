/* eslint-env node, mocha */

import chai from "chai"; // eslint-disable-line
import "mocha";
import * as sinon from 'sinon';
import chaiAsPromised from 'chai-as-promised';
import sinonStubPromise from 'sinon-stub-promise';
import { getMongoManager } from "serverless-typeorm";
import Challenge from "../../src/services/challenge";
let sandbox;
let queryStub;
const { expect } = chai;
sinonStubPromise(sinon);
chai.use(chaiAsPromised);
getMongoManager = sinon.stub();

describe("Challenge", () => {
  describe("Challenge Constructor", () => {
    it("constructs", (done) => {
        const result = new Challenge({});
        expect(result).to.have.own.property("db");
        expect(result).to.have.own.property("manager");
        done();
    });

    it("DB throws error if not provided", (done) => {
        try {
          new Challenge();
        } catch (error) {
          expect(error.message).to.equal("DB not connected");
        }
        
        done();
    });
  });

  describe("Challenge fn", () => {
    it("returns successObj", (done) => {
        const result = new Challenge({});
    
        const example = result.example();
        expect(example[0].success).to.equal(200);

        done();
    });
  });
});
