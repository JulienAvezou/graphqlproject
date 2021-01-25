import { Entity, PrimaryKey, Property } from "@mikro-orm/core";

// represents table in db
@Entity()
export class Post {

  // represents one column in table
  @PrimaryKey()
  id!: number;

  // represents one column in table
  @Property({ type: 'date'})
  createdAt = new Date();

  // represents one column in table
  @Property({ type: 'date', onUpdate: () => new Date() })
  updatedAt = new Date();

  // represents one column in table
  @Property({type: 'text'})
  title!: string;
}