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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PointTransactionResolver = void 0;
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const gql_auth_guard_1 = require("../../commons/auth/gql-auth.guard");
const gql_user_param_1 = require("../../commons/auth/gql-user.param");
const pointTransaction_entity_1 = require("./entities/pointTransaction.entity");
const pointTransaction_service_1 = require("./pointTransaction.service");
let PointTransactionResolver = class PointTransactionResolver {
    constructor(pointTransactionService) {
        this.pointTransactionService = pointTransactionService;
    }
    createPointTransaction(impUid, amount, currentUser) {
        return this.pointTransactionService.create({ impUid, amount, currentUser });
    }
};
__decorate([
    (0, common_1.UseGuards)(gql_auth_guard_1.GqlAuthAccessGuard),
    (0, graphql_1.Mutation)(() => pointTransaction_entity_1.PointTransaction),
    __param(0, (0, graphql_1.Args)('impUid')),
    __param(1, (0, graphql_1.Args)('amount')),
    __param(2, (0, gql_user_param_1.CurrentUser)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number, Object]),
    __metadata("design:returntype", void 0)
], PointTransactionResolver.prototype, "createPointTransaction", null);
PointTransactionResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [pointTransaction_service_1.PointTransactionService])
], PointTransactionResolver);
exports.PointTransactionResolver = PointTransactionResolver;
//# sourceMappingURL=pointTransaction.resolver.js.map