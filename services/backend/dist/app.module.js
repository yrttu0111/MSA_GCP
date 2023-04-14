"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const pointTransaction_module_1 = require("./apis/pointTransaction/pointTransaction.module");
const apollo_1 = require("@nestjs/apollo");
const common_1 = require("@nestjs/common");
const graphql_1 = require("@nestjs/graphql");
const typeorm_1 = require("@nestjs/typeorm");
const auth_module_1 = require("./apis/auth/auth.module");
const boards_module_1 = require("./apis/boards/boards.module");
const productCategory_module_1 = require("./apis/productCategory/productCategory.module");
const product_module_1 = require("./apis/products/product.module");
const user_module_1 = require("./apis/users/user.module");
const file_moudule_1 = require("./apis/file/file.moudule");
let AppModule = class AppModule {
};
AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            boards_module_1.BoardModule,
            file_moudule_1.FileMoudule,
            product_module_1.ProductModule,
            productCategory_module_1.ProductCategoryModule,
            user_module_1.UserModule,
            pointTransaction_module_1.PointTransactionModule,
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: 'src/commons/graphql/schema.gql',
                context: ({ req, res }) => ({ req, res }),
            }),
            typeorm_1.TypeOrmModule.forRoot({
                type: 'mysql',
                host: 'localhost',
                port: 3306,
                username: 'jaemin',
                password: 'ASDasd123!',
                database: 'myproject03',
                entities: [__dirname + '/apis/**/*.entity.*'],
                synchronize: true,
                logging: true,
            }),
        ],
    })
], AppModule);
exports.AppModule = AppModule;
//# sourceMappingURL=app.module.js.map