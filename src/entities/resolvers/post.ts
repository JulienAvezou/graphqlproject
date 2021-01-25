import { MyContext } from "src/types";
import { Resolver, Query, Ctx } from "type-graphql";
import { Post } from "../Post";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }
}