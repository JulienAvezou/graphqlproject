import { User } from "../entities/User";
import { MyContext } from "src/types";
import { Resolver, Query, Mutation, InputType, Field, Arg, Ctx, ObjectType } from "type-graphql";
import argon2 from 'argon2';

// *** @... are known as decorators ***
// InputType used as arguments
@InputType()
class UserNamePasswordInput {
  @Field()
  username: string;
  @Field()
  password: string;
}

@ObjectType()
class FieldError {
  @Field()
  field: string;
  @Field()
  message: string;
}

// ObjectType used as return
@ObjectType()
class UserResponse {
  @Field(() => [FieldError], {nullable: true})
  errors?: FieldError[]
  @Field(() => User, {nullable: true})
  user?: User
}

@Resolver()
export class UserResolver {

  @Query(() => User, { nullable: true })
  async me(@Ctx() { req, em }: MyContext) {
    // you are not logged in
    if (!req.session.userId) {
      return null;
    }

    const user = await em.findOne(User, { id: req.session.userId });
    return user;
  }

  @Mutation(() => UserResponse)
  async register(
    @Arg('options') options: UserNamePasswordInput,
    @Ctx() { req, em }: MyContext
  ): Promise<UserResponse> {

    if (options.username.length <= 2) {
      return {
        errors: [
          {
            field: "username",
            message: "length must be greater than 2",
          }
        ]
      }
    }

    if (options.password.length <= 2) {
      return {
        errors: [
          {
            field: "password",
            message: "password must be greater than 2",
          }
        ]
      }
    }
    const hashedPassword = await argon2.hash(options.password);
    const user = em.create(User, {username: options.username, password: hashedPassword});
    try {
      await em.persistAndFlush(user);
    } catch(err) {
      // duplicat username error
      if (err.code === "2505" || err.detail.includes("already exists")) {
        return {
          errors: [
            {
              field: "username",
              message: "username already taken",
            },
          ],
        }
      }
    }
    // keep user logged in on register
    req.session.userId = user.id;

    return { user };
  }

  @Mutation(() => UserResponse)
  async login(
    @Arg('options') options: UserNamePasswordInput,
    @Ctx() { em, req }: MyContext
  ): Promise<UserResponse> {
    const user = await em.findOne(User, { username: options.username });
    if (!user) {
      return {
        errors: [{
          field: "username",
          message: "that username doesn't exist",
        }]
      }
    }
    const valid = await argon2.verify(user.password, options.password);
    if (!valid) {
      return {
        errors: [{
          field: "password",
          message: "password incorrect",
        }]
      }
    }

    req.session.userId = user.id;

    return {
      user,
    }
  }
}