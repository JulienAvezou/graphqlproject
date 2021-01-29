import { Resolver, Query, Mutation, Ctx, Arg } from "type-graphql";
import { Post } from "../entities/Post";
import { MyContext } from "../types";

@Resolver()
export class PostResolver {
  @Query(() => [Post])
  posts(@Ctx() { em }: MyContext): Promise<Post[]> {
    return em.find(Post, {});
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
     // typescript type for the query
  ): Promise<Post | null> {
    return em.findOne(Post, { id });
  }

  @Mutation(() => Post, {nullable: true})
  async updatePost(
    // graphql can infer type based on typescript types
    @Arg("id") id: number,
    @Arg("title", () => String, {nullable: true}) title: string,
    @Ctx() { em }: MyContext
    // typescript type for the mutation
  ): Promise<Post | null> {
    const post = await em.findOne(Post, {id});
    if (!post) {
      return null
    }
    if (typeof title != "undefined") {
      post.title = title;
      await em.persistAndFlush(post);
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    // graphql can infer type based on typescript types
    @Arg("id") id: number,
    @Ctx() { em }: MyContext
    // typescript type for the mutation
  ): Promise<Boolean> {
    await em.nativeDelete(Post, { id })
  
    return true;
  }
}