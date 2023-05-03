import { Int, ObjectType, Field } from '@nestjs/graphql';
import { Min } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
@ObjectType()
export class Payment {
  @PrimaryGeneratedColumn('uuid')
  @Field(() => String)
  id: string;

  @Min(10)
  @Column()
  @Field(() => Int)
  amount: number;
}
