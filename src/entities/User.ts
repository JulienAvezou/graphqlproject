import { Entity, PrimaryKey, Property } from "@mikro-orm/core";
import { Field, ObjectType } from "type-graphql";

// represents table in db
@ObjectType()
@Entity()
export class User {

  // represents one column in table
  @Field()
  @PrimaryKey()
  id!: number;

  // represents one column in table
  @Field(() => String)
  @Property({ type: 'date'})
  createdAt = new Date();

  // represents one column in table
  @Field(() => String)
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  // represents one column in table
  @Field()
  @Property({type: 'text', unique: true})
  username!: string;

  // represents one column in table
  @Field()
  @Property({type: 'text', unique: true})
  email!: string;

   // represents one column in table
   // no field property, so password  not accessible from graphql, only present in db
   @Property({type: 'text'})
   password!: string;
}