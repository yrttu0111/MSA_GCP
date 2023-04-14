"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransactionModule = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("@nestjs/typeorm");
const common_1 = require("@nestjs/common");
const pointTransaction_resolver_1 = require("./pointTransaction.resolver");
const pointTransaction_service_1 = require("./pointTransaction.service");
const pointTransaction_entity_1 = require("./entities/pointTransaction.entity");
let PointTransactionModule = class PointTransactionModule {
};
PointTransactionModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([
                pointTransaction_entity_1.PointTransaction,
                user_entity_1.User,
            ]),
        ],
        providers: [pointTransaction_resolver_1.PointTransactionResolver, pointTransaction_service_1.PointTransactionService],
    })
], PointTransactionModule);
exports.PointTransactionModule = PointTransactionModule;
//# sourceMappingURL=pointTransaction.module.js.map