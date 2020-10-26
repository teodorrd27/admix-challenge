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
exports.Campaigns = void 0;
const class_transformer_1 = require("class-transformer");
require("reflect-metadata");
const serverless_typeorm_1 = require("serverless-typeorm");
const abstract_entity_1 = require("./abstract.entity");
let Campaigns = class Campaigns extends abstract_entity_1.AbstractEntity {
    constructor(props) {
        super();
        this.creatives = props && props.creatives ? props.creatives : [];
    }
};
__decorate([
    class_transformer_1.Expose(),
    serverless_typeorm_1.Column(),
    __metadata("design:type", String)
], Campaigns.prototype, "name", void 0);
__decorate([
    serverless_typeorm_1.Column(),
    __metadata("design:type", String)
], Campaigns.prototype, "type", void 0);
__decorate([
    serverless_typeorm_1.Column(),
    __metadata("design:type", Array)
], Campaigns.prototype, "creatives", void 0);
Campaigns = __decorate([
    serverless_typeorm_1.Entity("campaigns"),
    __metadata("design:paramtypes", [Object])
], Campaigns);
exports.Campaigns = Campaigns;
//# sourceMappingURL=campaign.entity.js.map