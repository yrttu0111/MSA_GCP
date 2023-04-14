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
exports.PointTransactionService = void 0;
const user_entity_1 = require("../users/entities/user.entity");
const typeorm_1 = require("typeorm");
const common_1 = require("@nestjs/common");
const pointTransaction_entity_1 = require("./entities/pointTransaction.entity");
const typeorm_2 = require("@nestjs/typeorm");
let PointTransactionService = class PointTransactionService {
    constructor(pointTransactionRepository, userRepository, connection) {
        this.pointTransactionRepository = pointTransactionRepository;
        this.userRepository = userRepository;
        this.connection = connection;
    }
    async create({ impUid, amount, currentUser }) {
        const queryRunner = await this.connection.createQueryRunner();
        await queryRunner.connect();
        await queryRunner.startTransaction('SERIALIZABLE');
        try {
            const pointTransaction = this.pointTransactionRepository.create({
                impUid,
                amount,
                user: currentUser,
                status: pointTransaction_entity_1.POINT_TRANSACTION_STATUS_ENUM.PAYMENT,
            });
            await this.pointTransactionRepository.save(pointTransaction);
            await queryRunner.manager.save(pointTransaction);
            const user = await queryRunner.manager.findOne(user_entity_1.User, { id: currentUser.id }, { lock: { mode: 'pessimistic_write' } });
            const updatedUser = this.userRepository.create(Object.assign(Object.assign({}, user), { point: user.point + amount }));
            await queryRunner.manager.save(updatedUser);
            await queryRunner.commitTransaction();
            return pointTransaction;
        }
        catch (error) {
            await queryRunner.rollbackTransaction();
        }
        finally {
            await queryRunner.release();
        }
    }
};
PointTransactionService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_2.InjectRepository)(pointTransaction_entity_1.PointTransaction)),
    __param(1, (0, typeorm_2.InjectRepository)(user_entity_1.User)),
    __metadata("design:paramtypes", [typeorm_1.Repository,
        typeorm_1.Repository,
        typeorm_1.Connection])
], PointTransactionService);
exports.PointTransactionService = PointTransactionService;
//# sourceMappingURL=pointTransaction.service.js.map