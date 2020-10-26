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
exports.errorHandlerMiddle = void 0;
const errorHandlerMiddle = () => {
    return {
        after: (handler, next) => {
            let body;
            body = {
                data: handler.response || null,
                message: "Done Successfully!",
                status: true,
            };
            handler.response = {
                body: JSON.stringify(body),
                statusCode: 200,
            };
            return next();
        },
        onError: (handler) => __awaiter(void 0, void 0, void 0, function* () {
            let body;
            body = {
                error: "",
                errorCode: 0,
                message: "",
                status: false,
            };
            body.message = handler.error.message;
            body.errorCode = handler.error.errorCode;
            body.error = handler.error.innerException
                ? handler.error.innerException.message
                : "";
            body.status = false;
            handler.response = {
                body: JSON.stringify(body),
                statusCode: handler.error.statusCode ? handler.error.statusCode : 400,
            };
        }),
    };
};
exports.errorHandlerMiddle = errorHandlerMiddle;
//# sourceMappingURL=errorHandler.middle.js.map