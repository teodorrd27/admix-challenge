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
const aws_sdk_1 = __importDefault(require("aws-sdk"));
const eventbridge = new aws_sdk_1.default.EventBridge({ apiVersion: "2015-10-07" });
const middle = (config = {}) => {
    // might set default options in config
    return {
        after: (handler) => __awaiter(void 0, void 0, void 0, function* () {
            if (handler.response.statusCode === 200) {
                const path = handler.event.requestContext.path
                    ? handler.event.requestContext.path
                    : handler.event.requestContext.resourcePath;
                const auditBody = {
                    endpoint: path,
                    response: handler.response,
                    userId: "some-id",
                };
                const params = {
                    Entries: [
                        {
                            Detail: JSON.stringify(auditBody),
                            DetailType: "Triggering Audit",
                            Source: "admix.audit",
                        },
                    ],
                };
                yield eventbridge.putEvents(params).promise();
            }
        }),
        before: (handler, next) => {
            // might read options from `config`
            next();
        },
        onError: (handler, next) => {
            // might read options from `config`
            next();
        },
    };
};
exports.default = middle;
//# sourceMappingURL=middleware.js.map