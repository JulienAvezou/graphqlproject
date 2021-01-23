import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

// represents table in db
@Entity()
export class Post {

  // represents one column in table
  @PrimaryKey()
  id!: number;

  // represents one column in table
  @Property()
  createdAt = new Date();

  // represents one column in table
  @Property({ onUpdate: () => new Date() })
  updatedAt = new Date();

  // represents one column in table
  @Property()
  title!: string;
}