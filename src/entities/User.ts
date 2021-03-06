import { Field, ObjectType } from "type-graphql";
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn, BaseEntity, OneToMany } from 'typeorm';
import { Post } from "./Post";
import { Updoot } from "./Updoot";

// represents table in db
@ObjectType()
@Entity()
export class User extends BaseEntity {

  // represents one column in table
  @Field()
  @PrimaryGeneratedColumn()
  id!: number;

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

  @OneToMany(() => Post, (post) => post.creator)
  posts: Post[];

  @OneToMany(() => Updoot, (updoot) => updoot.user)
  updoots: Updoot[];
  
     // represents one column in table
  @Field(() => String)
  @CreateDateColumn()
  createdAt: Date;

  // represents one column in table
  @Field(() => String)
  @UpdateDateColumn()
  updatedAt: Date;
}