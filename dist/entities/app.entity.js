"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.Apps = void 0;
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
const serverless_typeorm_1 = require("serverless-typeorm");
const abstract_entity_1 = require("./abstract.entity");
let Apps = class Apps extends abstract_entity_1.AbstractEntity {
};
__decorate([
    class_transformer_1.Expose(),
    serverless_typeorm_1.Column(),
    __metadata("design:type", Array)
], Apps.prototype, "appStores", void 0);
__decorate([
    serverless_typeorm_1.Column(),
    __metadata("design:type", Object)
], Apps.prototype, "demographics", void 0);
__decorate([
    serverless_typeorm_1.Column(),
    __metadata("design:type", Array)
], Apps.prototype, "geos", void 0);
__decorate([
    serverless_typeorm_1.Column(),
    __metadata("design:type", Object)
], Apps.prototype, "appStoreInfo", void 0);
__decorate([
    serverless_typeorm_1.Column(),
    __metadata("design:type", Object)
], Apps.prototype, "googlePlayStoreInfo", void 0);
Apps = __decorate([
    serverless_typeorm_1.Entity("apps")
], Apps);
exports.Apps = Apps;
//# sourceMappingURL=app.entity.js.map