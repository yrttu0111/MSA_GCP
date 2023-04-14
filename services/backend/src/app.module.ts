import { ConfigModule } from '@nestjs/config';
import { PointTransactionModule } from './apis/pointTransaction/pointTransaction.module';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { CacheModule, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { BoardModule } from './apis/boards/boards.module';
import { ProductCategoryModule } from './apis/productCategory/productCategory.module';
import { ProductModule } from './apis/products/product.module';
import { UserModule } from './apis/users/user.module';
import { FileMoudule } from './apis/file/file.moudule';
import * as redisStore from 'cache-manager-redis-store';
import { RedisClientOptions } from 'redis';
import { AppController } from './app.controller';
import { BoardCategoryModule } from './apis/boardCategory/boardCategory.module';
import { EventsGateway } from './events/events.gateway';
import { EventsModule } from './events/events.module';
import { ChatGPTModule } from './apis/chatgpt/chat-gpt.module';


@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true, // 전체적으로 사용하기 위해
    }),
    BoardCategoryModule,
    AuthModule,
    BoardModule,
    FileMoudule,
    ProductModule,
    ProductCategoryModule,
    UserModule,
    PointTransactionModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: process.env.DB_PORT,
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [__dirname + '/apis/**/*.entity.*'],
      synchronize: true,
      logging: true,
    }),
    
    CacheModule.register<RedisClientOptions>({
    store: redisStore,
    url: 'redis://redis:6379',
    isGlobal: true,
    }),
    
    EventsModule,
    ChatGPTModule,
  ],
  controllers: [AppController],
  providers: [EventsGateway],
  // providers: [AppService],
})
export class AppModule {}
