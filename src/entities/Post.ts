import { Field, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// represents table in db
@ObjectType()
@Entity()
export class Post {

  // represents one column in table
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  // represents one column in table
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  // represents one column in table
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;

  // represents one column in table
  @Field()
  @Column()
  title!: string;
}