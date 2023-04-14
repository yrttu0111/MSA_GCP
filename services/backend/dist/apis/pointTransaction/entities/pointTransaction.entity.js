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
exports.PointTransaction = exports.POINT_TRANSACTION_STATUS_ENUM = void 0;
const graphql_1 = require("@nestjs/graphql");
const user_entity_1 = require("../../users/entities/user.entity");
const typeorm_1 = require("typeorm");
var POINT_TRANSACTION_STATUS_ENUM;
(function (POINT_TRANSACTION_STATUS_ENUM) {
    POINT_TRANSACTION_STATUS_ENUM["PAYMENT"] = "PAYMENT";
    POINT_TRANSACTION_STATUS_ENUM["CANCEL"] = "CANCEL";
})(POINT_TRANSACTION_STATUS_ENUM = exports.POINT_TRANSACTION_STATUS_ENUM || (exports.POINT_TRANSACTION_STATUS_ENUM = {}));
(0, graphql_1.registerEnumType)(POINT_TRANSACTION_STATUS_ENUM, {
    name: 'POINT_TRANSACTION_STATUS_ENUM',
});
let PointTransaction = class PointTransaction {
};
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)('uuid'),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PointTransaction.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], PointTransaction.prototype, "impUid", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PointTransaction.prototype, "amount", void 0);
__decorate([
    (0, typeorm_1.Column)({ type: 'enum', enum: POINT_TRANSACTION_STATUS_ENUM }),
    (0, graphql_1.Field)(() => POINT_TRANSACTION_STATUS_ENUM),
    __metadata("design:type", String)
], PointTransaction.prototype, "status", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User),
    (0, graphql_1.Field)(() => user_entity_1.User),
    __metadata("design:type", user_entity_1.User)
], PointTransaction.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], PointTransaction.prototype, "createdAt", void 0);
PointTransaction = __decorate([
    (0, typeorm_1.Entity)(),
    (0, graphql_1.ObjectType)()
], PointTransaction);
exports.PointTransaction = PointTransaction;
//# sourceMappingURL=pointTransaction.entity.js.map