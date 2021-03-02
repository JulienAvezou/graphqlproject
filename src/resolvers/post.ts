import { MyContext } from "src/types";
import { Resolver, Query, Mutation, Arg, InputType, Field, Ctx, Int } from "type-graphql";
import { getConnection } from "typeorm";
import { Post } from "../entities/Post";
@InputType()
class PostInput {
  @Field()
  title: string
  @Field()
  text: string
}
@Resolver()
export class PostResolver {
  @Query(() => [Post])
  async posts(
    @Arg('limit', () => Int) limit: number,
    @Arg('cursor', () => String, { nullable: true }) cursor: string | null
  ): Promise<Post[]> {
    const realLimit = Math.min(50, limit); 
    const qb = getConnection()
      .getRepository(Post)
      .createQueryBuilder("p")
      .orderBy('"createdAt"', "DESC")
      .take(realLimit);

    if (cursor) {
      qb.where('"createdAt" > :cursor', {
        cursor: new Date(parseInt(cursor)),
      });
    }
    return qb.getMany();
  }

  @Query(() => Post, { nullable: true })
  post(
    @Arg("id") id: number): Promise<Post | undefined > { // typescript type for the mutation
    return Post.findOne(id);
  }

  @Mutation(() => Post)
  async createPost(
    @Arg("input") input: PostInput,
    @Ctx() { req }: MyContext
  ): Promise<Post> { 
     if (!req.session.userId) {
      throw new Error("not authenticated");
    }
    return Post.create({
      ...input,
      creatorId: req.session.userId,
     }).save();
  }

  @Mutation(() => Post, {nullable: true})
  async updatePost(
    // graphql can infer type based on typescript types
    @Arg("id") id: number,
    @Arg("title", () => String, {nullable: true}) title: string,
    // typescript type for the mutation
  ): Promise<Post | null> {
    const post = await Post.findOne(id);
    if (!post) {
      return null
    }
    if (typeof title != "undefined") {
      await Post.update({ id }, { title });
    }
    return post;
  }

  @Mutation(() => Boolean)
  async deletePost(
    // graphql can infer type based on typescript types
    @Arg("id") id: number,
    // typescript type for the mutation
  ): Promise<Boolean> {
    await Post.delete(id);
    return true;
  }
}