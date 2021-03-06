import { Entity, Column, BaseEntity, ManyToOne, PrimaryColumn } from 'typeorm';
import { Post } from "./Post";
import { User } from "./User";

// represents table in db
@Entity()
export class Updoot extends BaseEntity {
  @Column({ type: "int" })
  value: number;
  
  @PrimaryColumn()
  userId: number;

  @ManyToOne(() => User, (user) => user.updoots)
  user: User;

  @PrimaryColumn()
  postId: number;

  @ManyToOne(() => Post, (post) => post.updoots)
  post: Post;

}