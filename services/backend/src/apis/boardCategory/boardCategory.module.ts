import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { BoardCategoryResolver } from './boardCategory.resolver';
import { BoardCategoryService } from './boardCategory.service';
import { BoardCategory } from './entities/boardCategory.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([BoardCategory])],
  providers: [
    BoardCategoryResolver, 
    BoardCategoryService,
  ],
})
export class BoardCategoryModule {}
