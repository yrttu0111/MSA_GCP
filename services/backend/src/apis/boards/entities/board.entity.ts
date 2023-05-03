import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BoardCategory } from 'src/apis/boardCategory/entities/boardCategory.entity';
import { BoardTag } from 'src/apis/boardTag/entities/boardTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  DeleteDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

//공개글 혹은 비공개글 설정
export enum BOARD_PRIVATE {
  PUBLIC = 'PUBLIC',
  PRIVATE = 'PRIVATE',
}
registerEnumType(BOARD_PRIVATE, {
  name: 'BOARD_PRIVATE',
});

@Entity()
@ObjectType()
export class Board {
  @PrimaryGeneratedColumn('increment')
  @Field(() => Int)
  number: Number;

  @Column()
  @Field(() => String)
  writer: String;

  @Column()
  @Field(() => String)
  title: String;

  @Column()
  @Field(() => String)
  contents: String;

  @Column({ type: 'enum', enum: BOARD_PRIVATE , default: BOARD_PRIVATE.PUBLIC})
  @Field(() => BOARD_PRIVATE)
  status: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @DeleteDateColumn()
  deletedAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;

  //카테고리 한개에 게시물 여러개 등록가능
  @ManyToOne(() => BoardCategory)
  @Field(() => BoardCategory)
  boardCategory: BoardCategory;

  // 한명의 유저가 여러개의 게시물 등록가능
  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  // 한개의 게시물에 여러개의 태그 등록가능, 여러개의 게시물에 여러개의 태그 등록가능
  @JoinTable()
  @Field(() => [BoardTag])
  @ManyToMany(() => BoardTag, (boardTags) => boardTags.boardTags)
  boardTags: BoardTag[];
}
