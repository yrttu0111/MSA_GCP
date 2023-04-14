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
exports.createProductInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
const productSaleslocation_input_1 = require("../../productSaleslocation/dto/productSaleslocation.input");
let createProductInput = class createProductInput {
};
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], createProductInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], createProductInput.prototype, "description", void 0);
__decorate([
    (0, class_validator_1.Min)(0),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], createProductInput.prototype, "price", void 0);
__decorate([
    (0, graphql_1.Field)(() => productSaleslocation_input_1.ProductSaleslocationInput),
    __metadata("design:type", productSaleslocation_input_1.ProductSaleslocationInput)
], createProductInput.prototype, "productSaleslocationInput", void 0);
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], createProductInput.prototype, "productCategoryId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String]),
    __metadata("design:type", Array)
], createProductInput.prototype, "productTags", void 0);
createProductInput = __decorate([
    (0, graphql_1.InputType)()
], createProductInput);
exports.createProductInput = createProductInput;
//# sourceMappingURL=createProduct.input.js.map