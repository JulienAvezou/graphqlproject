import { Field, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, ManyToOne } from 'typeorm';
import { User } from "./User";

// represents table in db
@ObjectType()
@Entity()
export class Post extends BaseEntity {

  // represents one column in table
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

  // represents one column in table
  @Field()
  @Column()
  title!: string;

  // represents one column in table
  @Field()
  @Column()
  text!: string;

  // represents one column in table
  @Field()
  @Column({ type: "int", default: 0 })
  points!: number;

  @Field()
  @Column()
  creatorId: number;

  @ManyToOne(() => User, user => user.posts)
  creator: User;

  // represents one column in table
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  // represents one column in table
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}