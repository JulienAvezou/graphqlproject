import { Field, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from 'typeorm';

// represents table in db
@ObjectType()
@Entity()
export class User {

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
  @Column({unique: true})
  username!: string;

  // represents one column in table
  @Field()
  @Column({unique: true})
  email!: string;

   // represents one column in table
   // no field property, so password  not accessible from graphql, only present in db
   @Column()
   password!: string;
}