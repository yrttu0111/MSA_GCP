import { Field, Int, ObjectType, registerEnumType } from '@nestjs/graphql';
import { BoardCategory } from 'src/apis/boardCategory/entities/boardCategory.entity';
import { BoardTag } from 'src/apis/boardTag/entities/boardTag.entity';
import { User } from 'src/apis/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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

  @UpdateDateColumn()
  updatedAt: Date;

  @ManyToOne(() => BoardCategory)
  @Field(() => BoardCategory)
  boardCategory: BoardCategory;

  @ManyToOne(() => User)
  @Field(() => User)
  user: User;

  @JoinTable()
  @Field(() => [BoardTag])
  @ManyToMany(() => BoardTag, (boardTags) => boardTags.boardTags)
  boardTags: BoardTag[];
}
